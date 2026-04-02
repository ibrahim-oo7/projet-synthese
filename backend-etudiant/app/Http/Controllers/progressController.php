<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Progress;

class progressController extends Controller
{
    public function update(Request $request){
    $student = auth()->user();

    $progress = Progress::updateOrCreate(
        [
            'student_id'=>$student->id,
            'lesson_id'=>$request->lesson_id
        ],
        [
            'percentage'=>$request->percentage
        ]
    );

    return response()->json([
        "message"=>"progress updated",
        "progress"=>$progress
    ]);
}
}
