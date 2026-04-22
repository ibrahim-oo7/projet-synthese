<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Tymon\JWTAuth\Facades\JWTAuth;


class AuthController extends Controller
{
    public function register(Request $request){
        $request->validate([
            "name"=>'required',
            "email"=>'required|email|unique:users',
            "password"=>'required|min:8',
            "role"=>"required|in:center,student,formateur",
        ]);
        $status = $request->role === 'student' ? 'approved' : 'pending';

        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);
        $user->role = $request->role;
        $user->status = $status;
        if ($request->role === 'formateur') {
            $user->center_id = auth('api')->id();
        }
        $user->save();

        return response()->json([
            'message' => $request->role === 'center'
                ? 'Request sent to admin'
                : 'Registered successfully',
            'user'=>$user->only(['id','name','email','role','status'])
        ]);
    }

   public function login(Request $request){
    $request->validate([
        'email' => 'required|email',
        'password' => 'required|string|min:8',
    ]);

    $log = $request->only('email','password');

    if(!$token = auth('api')->attempt($log)){
        return response()->json(['message' => "email or password incorrect"], 401);
    }

    $user = auth('api')->user();

    if($user->role === 'center'){
        if($user->status === 'pending'){
            return response()->json(['message' => 'Request pending, wait for admin'], 403);
        }

        if($user->status === 'rejected'){
            return response()->json(['message' => 'Request rejected'], 403);
        }
    }

    return response()->json([
        'user' => [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'role' => $user->role,
            'status' => $user->status,
            'profile_image' => $user->profile_image
                ? url('storage/' . $user->profile_image)
                : null,
        ],
        'token' => $token
    ]);
}
public function updateProfile(Request $request)
{
    $student = auth('api')->user();

    if (!$student) {
        return response()->json([
            "message" => "Unauthorized"
        ], 401);
    }

    $request->validate([
        'name' => ['required', 'string', 'max:255'],
        'email' => ['required', 'email', Rule::unique('users', 'email')->ignore($student->id)],
        'profile_image' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
    ]);

    $student->name = $request->name;
    $student->email = $request->email;

    if ($request->hasFile('profile_image')) {
        if ($student->profile_image && Storage::disk('public')->exists($student->profile_image)) {
            Storage::disk('public')->delete($student->profile_image);
        }

        $path = $request->file('profile_image')->store('profile_images', 'public');
        $student->profile_image = $path;
    }

    $student->save();

  return response()->json([
    "message" => "Profile updated successfully",
    "user" => [
        "id" => $student->id,
        "name" => $student->name,
        "email" => $student->email,
        "role" => $student->role,
        "status" => $student->status,
        "profile_image" => $student->profile_image
            ? url('storage/' . $student->profile_image)
            : null,
    ]
]);
}

public function profile()
{
    $student = auth('api')->user();

    if (!$student) {
        return response()->json([
            "message" => "Unauthorized"
        ], 401);
    }

    return response()->json([
        "id" => $student->id,
        "name" => $student->name,
        "email" => $student->email,
        "role" => $student->role,
        "status" => $student->status,
        "profile_image" => $student->profile_image
            ? url('storage/' . $student->profile_image)
            : null,
    ]);
}
    
}