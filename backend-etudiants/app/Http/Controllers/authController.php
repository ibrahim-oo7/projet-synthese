<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class AuthController extends Controller
{
    public function register(Request $request)
{
    $user = User::create([
        'name' => $request->name,
        'email' => $request->email,
        'password' => Hash::make($request->password)
    ]);

    $token = $user->createToken('auth_token')->plainTextToken;

    return response()->json([
        "message" => "User created",
        "user" => $user,
        "token" => $token
    ]);
}
  public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !is_string($user->password) || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'Invalid email or password'
            ], 401);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Login success',
            'user' => $user,
            'token' => $token,
        ]);
    }
//     public function updateProfile(Request $request)
// {
//     $student = $request->user();

//     if (!$student) {
//         return response()->json([
//             "message" => "Unauthorized"
//         ], 401);
//     }

//     $request->validate([
//         'name' => 'required|string|max:255',
//         'email' => 'required|email|unique:users,email,' . $student->id,
//         'avatar' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
//     ]);

//     $student->name = $request->name;
//     $student->email = $request->email;

//     if ($request->hasFile('avatar')) {
//         if ($student->avatar && Storage::disk('public')->exists($student->avatar)) {
//             Storage::disk('public')->delete($student->avatar);
//         }

//         $path = $request->file('avatar')->store('avatars', 'public');
//         $student->avatar = $path;
//     }

//     $student->save();

//     return response()->json([
//         "message" => "Profile updated successfully",
//         "user" => [
//             "id" => $student->id,
//             "name" => $student->name,
//             "email" => $student->email,
//             "avatar" => $student->avatar
//                 ? asset('storage/' . $student->avatar)
//                 : null,
//         ]
//     ]);
// }
}
