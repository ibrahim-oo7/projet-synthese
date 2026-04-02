<?php

namespace App\Http\Controllers;

use App\Services\SettingsService;
use Illuminate\Http\Request;

class SettingsController extends Controller
{
    protected $settingsService;

    public function __construct(SettingsService $settingsService)
    {
        $this->middleware(function ($request, $next) {
            if (!auth('super_admin')->check()) {
                return response()->json([
                    'message' => 'Unauthorized. Super Admin access only.',
                ], 403);
            }

            return $next($request);
        });

        $this->settingsService = $settingsService;
    }

    public function index()
    {
        $settings = $this->settingsService->getSettings();

        if (!$settings) {
            return response()->json([
                'site_name' => 'FormInnova',
                'admin_email' => '',
            ]);
        }

        return response()->json($settings);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'site_name' => 'required|string|max:255',
            'admin_email' => 'required|email|max:255',
        ]);

        $settings = $this->settingsService->updateSettings($validated);

        return response()->json([
            'message' => 'Settings updated successfully',
            'data' => $settings,
        ]);
    }
}