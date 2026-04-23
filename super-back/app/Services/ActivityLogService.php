<?php

namespace App\Services;

use App\Models\ActivityLog;

class ActivityLogService
{
    public function getAllLogs()
    {
        return ActivityLog::latest()->get();
    }
}