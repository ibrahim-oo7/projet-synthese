<?php

namespace App\Http\Controllers;

use App\Services\DashboardService;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    protected $dashboardService;

    public function __construct(DashboardService $dashboardService)
    {
        $this->middleware(function ($request, $next) {
            if (!auth('super_admin')->check()) {
                return response()->json([
                    'message' => 'Unauthorized. Super Admin access only.',
                ], 403);
            }

            return $next($request);
        });

        $this->dashboardService = $dashboardService;
    }

    public function index(Request $request)
    {
        $year = $request->get('year');
        $month = $request->get('month');

        $stats = $this->dashboardService->getStatistics($year, $month);

        return response()->json($stats);
    }
}