<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
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
            return response()->json(['message'=>"email or password incorect"],401);
        }

        $user = auth('api')->user();

        if($user->role === 'center'){
            if($user->status === 'pending'){
                return response()->json(['message'=>'Request pending, wait for admin'],403);
            }

            if($user->status === 'rejected'){
                return response()->json(['message'=>'Request rejected'],403);
            }
        }
        return response()->json([
            'user' => $user->only(['id','name','email','role','status']),
            'token'=>$token]);
    }
    
}