<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureSuperAdmin
{
    public function handle(Request $request, Closure $next): Response
    {
        $user = auth('super_admin')->user();

        if (!$user) {
            return response()->json([
                'message' => 'Unauthorized. Super Admin access only.',
            ], 403);
        }

        return $next($request);
    }
}