<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Enrollment;

class enrollmentController extends Controller
{
    public function enroll (Request $request, $course_id){
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
        "phone" => $request->phone,
        "payment_method" => $request->payment_method,
        "experience_level" => $request->experience_level,
        "objectif" => $request->objectif,
        "motivation" => $request->motivation,
        "accept_terms" => $request->accept_terms,
    ]);
    return response()->json([
        "message" => 'Enrollement succesfull',
        "data" => $enrollment
    ],201);
    }

    public function myEnrollments()
    {
        $student = Auth::user();
        $enrollments = Enrollment::where('student_id', $student->id)->get();
        return response()->json($enrollments);
    }
    
}
