<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Progress;

class progressController extends Controller
{

   public function progress(Request $request)
{
    $progress = Progress::updateOrCreate(
        [
            'student_id' => $request->student_id,
            'course_id' => $request->course_id,
            'lesson_key' => $request->lesson_key
        ],
        [
            'percentage' => $request->percentage,
            'completed' => $request->completed,
        ]
    );

    return response()->json([
        "message" => "progress saved",
        "progress" => $progress
    ]);
}
    public function getStudentProgress($studentId)
    {
        $progress = Progress::where('student_id', $studentId)
            ->get()
            ->groupBy('course_id')
            ->map(function ($items, $courseId) {
                return [
                    'course_id' => $courseId,
                    'percentage' => $items->max('percentage')
                ];
            })
            ->values();

        return response()->json($progress);
    }

   public function getCourseProgress($studentId, $courseId)
{
    $progress = Progress::where('student_id', $studentId)
        ->where('course_id', $courseId)
        ->orderBy('id', 'asc')
        ->get();

    return response()->json([
        'progress' => $progress
    ]);
}
}

