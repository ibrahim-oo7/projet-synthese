<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\CenterPayment;

class CenterPaymentSeeder extends Seeder
{
    public function run(): void
    {
        CenterPayment::insert([
            [
                'center_id' => 1,
                'amount' => 1200.00,
                'month' => 1,
                'year' => 2026,
                'payment_method' => 'Bank Transfer',
                'note' => 'January subscription payment',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'center_id' => 1,
                'amount' => 1200.00,
                'month' => 2,
                'year' => 2026,
                'payment_method' => 'Bank Transfer',
                'note' => 'February subscription payment',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'center_id' => 2,
                'amount' => 950.00,
                'month' => 3,
                'year' => 2026,
                'payment_method' => 'Bank Transfer',
                'note' => 'March payment',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'center_id' => 3,
                'amount' => 1100.00,
                'month' => 3,
                'year' => 2026,
                'payment_method' => 'Bank Transfer',
                'note' => 'March subscription payment',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}