<?php

namespace App\Services;

use App\Models\Center;
use App\Models\CenterRequest;
use App\Models\ActivityLog;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class CenterRequestService
{
    /**
     * Store new center request
     */
    public function storeRequest(array $data)
    {
        return CenterRequest::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'phone' => $data['phone'],
            'city' => $data['city'],
            'address' => $data['address'] ?? null,
            'message' => $data['message'] ?? null,
            'status' => 'pending',
        ]);
    }

    /**
     * Approve center request
     */
    public function approveRequest(int $id)
    {
        $centerRequest = CenterRequest::findOrFail($id);

        if ($centerRequest->status !== 'pending') {
            throw new \Exception('This request has already been processed.');
        }

        // Generate random password
        $plainPassword = Str::random(8);

        // Create center account
        $center = Center::create([
            'name' => $centerRequest->name,
            'email' => $centerRequest->email,
            'password' => Hash::make($plainPassword),
            'phone' => $centerRequest->phone,
            'city' => $centerRequest->city,
            'address' => $centerRequest->address,
            'status' => 'active',
        ]);

        // Update request status
        $centerRequest->update([
            'status' => 'accepted',
            'reviewed_at' => now(),
        ]);

        // Log activity
        ActivityLog::create([
            'action' => 'approve_request',
            'description' => 'Center request approved: ' . $centerRequest->name,
            'performed_by' => 'Super Admin',
        ]);

        return [
            'center' => $center,
            'generated_password' => $plainPassword
        ];
    }

    /**
     * Reject center request
     */
    public function rejectRequest(int $id, array $data = [])
    {
        $centerRequest = CenterRequest::findOrFail($id);

        if ($centerRequest->status !== 'pending') {
            throw new \Exception('This request has already been processed.');
        }

        $centerRequest->update([
            'status' => 'rejected',
            'reviewed_at' => now(),
            'reject_reason' => $data['reject_reason'] ?? null,
        ]);

        ActivityLog::create([
            'action' => 'reject_request',
            'description' => 'Center request rejected: ' . $centerRequest->name .
                ($data['reject_reason'] ? ' | Reason: ' . $data['reject_reason'] : ''),
            'performed_by' => 'Super Admin',
        ]);

        return $centerRequest;
    }
    
}