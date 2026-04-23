<?php

namespace App\Services;

use App\Models\Center;
use App\Models\ActivityLog;

class CenterService
{
    public function getAllCenters()
    {
        return Center::latest()->get();
    }

    public function getCenterById(int $id)
    {
        return Center::findOrFail($id);
    }

    public function disableCenter(int $id)
    {
        $center = Center::findOrFail($id);

        if ($center->status === 'disabled') {
            throw new \Exception('Center is already disabled.');
        }

        $center->update([
            'status' => 'disabled',
        ]);

        ActivityLog::create([
            'action' => 'disable_center',
            'description' => 'Center disabled: ' . $center->name,
            'performed_by' => 'Super Admin',
        ]);

        return $center;
    }

    public function activateCenter(int $id)
    {
        $center = Center::findOrFail($id);

        if ($center->status === 'active') {
            throw new \Exception('Center is already active.');
        }

        $center->update([
            'status' => 'active',
        ]);

        ActivityLog::create([
            'action' => 'activate_center',
            'description' => 'Center activated: ' . $center->name,
            'performed_by' => 'Super Admin',
        ]);

        return $center;
    }

    public function deleteCenter(int $id)
    {
        $center = Center::findOrFail($id);

        ActivityLog::create([
            'action' => 'delete_center',
            'description' => 'Center deleted: ' . $center->name,
            'performed_by' => 'Super Admin',
        ]);

        $center->delete();

        return true;
    }
}