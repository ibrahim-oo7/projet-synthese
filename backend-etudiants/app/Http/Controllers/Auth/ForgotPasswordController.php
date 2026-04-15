<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\DB;

class ForgotPasswordController extends Controller
{
    public function sendCode(Request $request)
{
    $request->validate([
        'email' => 'required|email|exists:users,email'
    ]);

    $code = rand(100000, 999999);

    DB::table('password_resets')->updateOrInsert(
        ['email' => $request->email],
        [
            'code' => $code,
            'expires_at' => now()->addMinutes(10),
            'created_at' => now()
        ]
    );

    Mail::raw("Your verification code is: $code", function ($message) use ($request) {
        $message->to($request->email)
                ->subject('Password Reset Code');
    });

    return response()->json(['message' => 'Code sent']);
}
public function verifyCode(Request $request)
{
    $request->validate([
        'email' => 'required|email',
        'code' => 'required'
    ]);

    $reset = DB::table('password_resets')
        ->where('email', $request->email)
        ->where('code', $request->code)
        ->first();

    if (!$reset) {
        return response()->json(['message' => 'Code incorrect'], 400);
    }

    if (now()->gt($reset->expires_at)) {
        return response()->json(['message' => 'Code expiré'], 400);
    }

    return response()->json(['message' => 'Code valide']);
}

public function resetPassword(Request $request)
{
    $request->validate([
        'email' => 'required|email',
        'code' => 'required',
        'password' => 'required|min:6'
    ]);

    $reset = DB::table('password_resets')
        ->where('email', $request->email)
        ->where('code', $request->code)
        ->first();

    if (!$reset || now()->gt($reset->expires_at)) {
        return response()->json(['message' => 'Invalid or expired code'], 400);
    }

    $user = User::where('email', $request->email)->first();
    $user->password = bcrypt($request->password);
    $user->save();

    DB::table('password_resets')->where('email', $request->email)->delete();

    return response()->json(['message' => 'Password updated']);
}
}
