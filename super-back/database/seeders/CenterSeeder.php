<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Center;
use Illuminate\Support\Facades\Hash;

class CenterSeeder extends Seeder
{
    public function run(): void
    {
        Center::insert([
            [
                'name' => 'Success Academy',
                'email' => 'success.center@example.com',
                'password' => Hash::make('center12345'),
                'phone' => '0644444444',
                'city' => 'Casablanca',
                'address' => 'Maarif',
                'status' => 'active',
                'remember_token' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Elite Skills Center',
                'email' => 'elite.skills@example.com',
                'password' => Hash::make('center12345'),
                'phone' => '0655555555',
                'city' => 'Tangier',
                'address' => 'City Center',
                'status' => 'disabled',
                'remember_token' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Vision Training Center',
                'email' => 'vision.training@example.com',
                'password' => Hash::make('center12345'),
                'phone' => '0666666666',
                'city' => 'Fes',
                'address' => 'Nouvelle Ville',
                'status' => 'active',
                'remember_token' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}