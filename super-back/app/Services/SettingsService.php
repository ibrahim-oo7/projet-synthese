<?php

namespace App\Services;

use App\Models\Setting;


class SettingsService
{
    public function getSettings()
    {
        return Setting::first();
    }

    public function updateSettings(array $data)
    {
        // 🧠 force single row system (best SaaS pattern)
        $settings = Setting::first();

        if (!$settings) {
            $settings = new Setting();
        }

        $settings->site_name = $data['site_name'];
        $settings->admin_email = $data['admin_email'];

        $settings->save();

        return $settings->fresh();
    }
}