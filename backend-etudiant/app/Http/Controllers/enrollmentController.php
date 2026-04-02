<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Enrollment;

class enrollmentController extends Controller
{
    public function enroll($course_id){
        $student = Auth::user();
        $exists = Enrollment::where('student_id',$student->id)
        ->where('course_id',$course_id)
        ->first();
        if($exists){
        return response()->json([
            "message" => 'already enrolled !'
        ],400);
    }
    $enrollment = Enrollment::create([
        "student_id" => $student->id,
        "course_id" => $course_id,
        "status" => "active"
    ]);
    return response()->json([
        "message" => 'Enrollement succesfull',
        "data" => $enrollment
    ],201);
    }
    
}
