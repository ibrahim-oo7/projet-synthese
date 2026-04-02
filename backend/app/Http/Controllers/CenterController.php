<?php

namespace App\Http\Controllers;

use App\Services\CenterService;

class CenterController extends Controller
{
    protected $centerService;

    public function __construct(CenterService $centerService)
    {
        $this->middleware(function ($request, $next) {
            if (!auth('super_admin')->check()) {
                return response()->json([
                    'message' => 'Unauthorized. Super Admin access only.',
                ], 403);
            }

            return $next($request);
        });

        $this->centerService = $centerService;
    }

    public function index()
    {
        $centers = $this->centerService->getAllCenters();

        return response()->json($centers);
    }

    public function show($id)
    {
        $center = $this->centerService->getCenterById((int) $id);

        return response()->json($center);
    }

    public function disable($id)
    {
        try {
            $center = $this->centerService->disableCenter((int) $id);

            return response()->json([
                'message' => 'Center disabled successfully',
                'data' => $center,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ], 400);
        }
    }

    public function activate($id)
    {
        try {
            $center = $this->centerService->activateCenter((int) $id);

            return response()->json([
                'message' => 'Center activated successfully',
                'data' => $center,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ], 400);
        }
    }

    public function destroy($id)
    {
        $this->centerService->deleteCenter((int) $id);

        return response()->json([
            'message' => 'Center deleted successfully',
        ]);
    }
}