<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Setting;

class SettingSeeder extends Seeder
{
    public function run(): void
    {
        Setting::updateOrCreate(
            ['id' => 1],
            [
                'site_name' => 'FormInnova',
                'admin_email' => 'admin@forminnova.com',
                'created_at' => now(),
                'updated_at' => now(),
            ]
        );
    }
}