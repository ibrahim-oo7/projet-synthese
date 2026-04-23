<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class FormateurController extends Controller
{
    /**
     * Display a listing of the resource.
     */
  public function index()
{
    $centerId = auth('api')->id();

    $formateurs = User::with('courses')
        ->where('role', 'teacher')
        ->where('center_id', $centerId)
        ->get();

    return response()->json($formateurs);
}
        

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // 
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            "name"=>'required',
            "email"=>'required|email|unique:users',
            "password"=>'required|min:8',
            "profile_image"=> "nullable|image|max:2048"
        ]);
        
        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);
        $user->role = 'teacher';
        $user->status = 'approved';
        $user->center_id = auth('api')->id();
        $user->bio = $request->bio;
        if ($request->hasFile('profile_image')) {
            $path = $request->file('profile_image')->store('profile_images', 'public');
            $user->profile_image = $path;
        }
        $user->save();

        return response()->json([
            'message' => 'Teacher created  successfully',
            'user'=>$user->only(['id','name','email','role','status','center_id','bio','profile_image'])
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
{
    $centerId = auth('api')->id();

    $teacher = User::with('courses')
        ->where('role', 'teacher')
        ->where('center_id', $centerId)
        ->where('id', $id)
        ->firstOrFail();

    return response()->json($teacher);
}

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
                'name'=>'required',
                'email'=>'required|email|unique:users,email,'.$id,
                'password'=>'nullable|min:8',
                'bio'=>'nullable|string',
                'profile_image'=>'nullable|image|max:2048'
        ]);
        $user = User::where('role','teacher')->where('id',$id)->where('center_id', auth()->id())->first();
        $user->name = $request->name;
        $user->email = $request->email;
        if($request->password){
            $user->password = Hash::make($request->password);
        }
        $user->role = 'teacher';
        $user->status = 'approved';
        $request->center_id;
        $user->bio = $request->bio;
        if ($request->hasFile('profile_image')) {
            $path = $request->file('profile_image')->store('profile_images', 'public');
            $user->profile_image = $path;
        }
        $user->save();

        return response()->json([
            'message' => 'Teacher modified  successfully',
            'user'=>$user->only(['id','name','email','role','status','center_id','bio','profile_image'])
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user = User::where('role','teacher')->where('id',$id)->where('center_id', auth()->id())->first()->delete();
        return response()->json(['message' => 'Teacher deleted  successfully',]);
    }
}
