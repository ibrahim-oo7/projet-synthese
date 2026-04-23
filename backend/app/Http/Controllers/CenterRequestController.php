<?php

namespace App\Http\Controllers;

use App\Models\CenterRequest;
use App\Models\SuperAdmin;
use App\Services\CenterRequestService;
use Illuminate\Http\Request;
use App\Notifications\SystemNotification;

class CenterRequestController extends Controller
{
    protected $centerRequestService;

    public function __construct(CenterRequestService $centerRequestService)
    {
        $this->centerRequestService = $centerRequestService;
    }

    public function index()
    {
        $requests = CenterRequest::latest()->get();
        return response()->json($requests);
    }

    public function show($id)
    {
        $requestItem = CenterRequest::findOrFail($id);

        return response()->json([
            'data' => $requestItem
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:50',
            'city' => 'required|string|max:100',
            'address' => 'nullable|string|max:255',
            'message' => 'nullable|string',
        ]);

        $centerRequest = $this->centerRequestService->storeRequest($validated);

        $admins = SuperAdmin::all();
        foreach ($admins as $admin) {
            $admin->notify(new SystemNotification(
                "New center request from {$centerRequest->name}",
                "request"
            ));
        }

        return response()->json([
            'message' => 'Center request submitted successfully',
            'data' => $centerRequest
        ], 201);
    }

    public function approve($id)
    {
        try {
            $result = $this->centerRequestService->approveRequest((int) $id);

            $admins = SuperAdmin::all();
            foreach ($admins as $admin) {
                $admin->notify(new SystemNotification(
                    "Request approved for {$result->name}",
                    "request"
                ));
            }

            return response()->json([
                'message' => 'Center request approved successfully',
                'data' => $result
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage()
            ], 400);
        }
    }

    public function reject(Request $request, $id)
    {
        $validated = $request->validate([
            'reject_reason' => 'required|string|min:3|max:1000',
        ]);

        try {
            $result = $this->centerRequestService->rejectRequest((int) $id, $validated);

            $admins = SuperAdmin::all();
            foreach ($admins as $admin) {
                $admin->notify(new SystemNotification(
                    "Request rejected for {$result->name}",
                    "request"
                ));
            }

            return response()->json([
                'message' => 'Center request rejected successfully',
                'data' => $result
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage()
            ], 400);
        }
    }
}