<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ActivityLog;

class ActivityLogSeeder extends Seeder
{
    public function run(): void
    {
        ActivityLog::insert([
            [
                'action' => 'approve_request',
                'description' => 'Center request approved: Success Academy',
                'performed_by' => 'Super Admin',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'action' => 'reject_request',
                'description' => 'Center request rejected: Atlas Learning Hub',
                'performed_by' => 'Super Admin',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'action' => 'create_center',
                'description' => 'New center created: Vision Training Center',
                'performed_by' => 'Super Admin',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'action' => 'add_payment',
                'description' => 'Payment added for center ID 1',
                'performed_by' => 'Super Admin',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}