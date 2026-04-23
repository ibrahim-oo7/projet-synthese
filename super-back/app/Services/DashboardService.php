<?php

namespace App\Services;

use App\Models\ActivityLog;
use App\Models\Center;
use App\Models\CenterPayment;
use App\Models\CenterRequest;
use Illuminate\Support\Facades\DB;

class DashboardService
{
    public function getStatistics($year = null, $month = null): array
    {
        $currentYear = $year ?: now()->year;
        $selectedMonth = ($month === null || $month === '' || $month === 'all')
            ? null
            : (int) $month;

        $centerStats = Center::selectRaw("
            COUNT(*) as total_centers,
            SUM(CASE WHEN status = 'active' THEN 1 ELSE 0 END) as active_centers,
            SUM(CASE WHEN status = 'disabled' THEN 1 ELSE 0 END) as disabled_centers
        ")->first();

        $requestStats = CenterRequest::selectRaw("
            SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending_requests,
            SUM(CASE WHEN status = 'accepted' THEN 1 ELSE 0 END) as accepted_requests,
            SUM(CASE WHEN status = 'rejected' THEN 1 ELSE 0 END) as rejected_requests
        ")->first();

        $paymentsBaseQuery = CenterPayment::query()->where('year', $currentYear);

        if ($selectedMonth) {
            $paymentsBaseQuery->where('month', $selectedMonth);
        }

        $paymentsCount = (int) (clone $paymentsBaseQuery)->count();
        $monthlyRevenue = (float) (clone $paymentsBaseQuery)->sum('amount');

        $summary = [
            'total_centers' => (int) ($centerStats->total_centers ?? 0),
            'active_centers' => (int) ($centerStats->active_centers ?? 0),
            'disabled_centers' => (int) ($centerStats->disabled_centers ?? 0),

            'pending_requests' => (int) ($requestStats->pending_requests ?? 0),
            'accepted_requests' => (int) ($requestStats->accepted_requests ?? 0),
            'rejected_requests' => (int) ($requestStats->rejected_requests ?? 0),

            'monthly_revenue' => $monthlyRevenue,
            'payments_count' => $paymentsCount,
        ];

        $monthlyTotals = CenterPayment::query()
            ->where('year', $currentYear)
            ->select('month', DB::raw('SUM(amount) as total'))
            ->groupBy('month')
            ->pluck('total', 'month')
            ->toArray();

        $months = [
            1 => 'Jan', 2 => 'Feb', 3 => 'Mar', 4 => 'Apr',
            5 => 'May', 6 => 'Jun', 7 => 'Jul', 8 => 'Aug',
            9 => 'Sep', 10 => 'Oct', 11 => 'Nov', 12 => 'Dec',
        ];

        $monthlyRevenueChart = [];

        foreach ($months as $monthNumber => $monthLabel) {
            $monthlyRevenueChart[] = [
                'month' => $monthLabel,
                'amount' => (float) ($monthlyTotals[$monthNumber] ?? 0),
            ];
        }

        $requestStatusChart = [
            [
                'name' => 'Pending',
                'value' => $summary['pending_requests'],
            ],
            [
                'name' => 'Accepted',
                'value' => $summary['accepted_requests'],
            ],
            [
                'name' => 'Rejected',
                'value' => $summary['rejected_requests'],
            ],
        ];

        $latestRequests = CenterRequest::query()
            ->latest()
            ->take(5)
            ->get(['id', 'name', 'email', 'city', 'status', 'created_at']);

        $latestPayments = CenterPayment::query()
            ->with('center:id,name')
            ->latest()
            ->take(5)
            ->get(['id', 'center_id', 'amount', 'month', 'year', 'created_at']);

        $recentActivities = ActivityLog::query()
            ->latest()
            ->take(8)
            ->get(['id', 'action', 'description', 'performed_by', 'created_at']);

        return [
            'summary' => $summary,
            'monthly_revenue_chart' => $monthlyRevenueChart,
            'request_status_chart' => $requestStatusChart,
            'latest_requests' => $latestRequests,
            'latest_payments' => $latestPayments,
            'recent_activities' => $recentActivities,
        ];
    }
}