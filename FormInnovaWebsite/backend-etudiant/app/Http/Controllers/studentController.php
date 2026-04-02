<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class studentController extends Controller
{
    public function profile()
    {
        $student = auth('api')->user();
        return response()->json($student);
    }

    public function updateProfile(Request $request)
    {
        $student = auth('api')->user();

        $student->name = $request->name;
        $student->email = $request->email;

        if (!$student instanceof User) {
            return response()->json(["error" => "Invalid user object"], 500);
        }

        $student->save();

        return response()->json([
            "message" => "Profile updated",
            "student" => $student
        ]);
    }
}
