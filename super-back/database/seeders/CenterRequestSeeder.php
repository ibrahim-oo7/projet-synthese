<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\CenterRequest;

class CenterRequestSeeder extends Seeder
{
    public function run(): void
    {
        CenterRequest::updateOrCreate(
            ['email' => 'atlas.center@example.com'],
            [
                'name' => 'Atlas Learning Center',
                'phone' => '0612345678',
                'city' => 'Tangier',
                'address' => 'Avenue Mohammed V, Tangier',
                'message' => 'We would like to join the platform and create our center account.',
                'status' => 'pending',
                'reviewed_at' => null,
                'reject_reason' => null,
            ]
        );

        CenterRequest::updateOrCreate(
            ['email' => 'future.skills@example.com'],
            [
                'name' => 'Future Skills Academy',
                'phone' => '0623456789',
                'city' => 'Tetouan',
                'address' => 'Hay Nahda, Tetouan',
                'message' => 'Please review our registration request. We are ready to start.',
                'status' => 'pending',
                'reviewed_at' => null,
                'reject_reason' => null,
            ]
        );

        CenterRequest::updateOrCreate(
            ['email' => 'bright.kids@example.com'],
            [
                'name' => 'Bright Kids Center',
                'phone' => '0634567890',
                'city' => 'Chefchaouen',
                'address' => 'Centre Ville, Chefchaouen',
                'message' => 'Our center wants to be part of the system. Please review our application.',
                'status' => 'pending',
                'reviewed_at' => null,
                'reject_reason' => null,
            ]
        );
    }
}