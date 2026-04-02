<?php

namespace App\Http\Controllers;

use App\Services\ActivityLogService;

class ActivityLogController extends Controller
{
    protected $activityLogService;

    public function __construct(ActivityLogService $activityLogService)
    {
        $this->middleware(function ($request, $next) {
            if (!auth('super_admin')->check()) {
                return response()->json([
                    'message' => 'Unauthorized. Super Admin access only.',
                ], 403);
            }

            return $next($request);
        });

        $this->activityLogService = $activityLogService;
    }

    public function index()
    {
        $logs = $this->activityLogService->getAllLogs();

        return response()->json($logs);
    }
}