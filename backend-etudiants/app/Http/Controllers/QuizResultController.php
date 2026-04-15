<?php

namespace App\Http\Controllers;

use App\Models\QuizResult;
use App\Http\Controllers\Controller;
use App\Models\Certificat;
use App\Models\Progress;
use Illuminate\Http\Request;

class QuizResultController extends Controller
{
   public function store(Request $request)
    {
        $student = auth()->user();

        $request->validate([
            'course_id' => 'required',
            'score' => 'required|integer',
            'total_questions' => 'required|integer|min:1',
            'percentage' => 'required|numeric|min:0|max:100',
            'is_passed' => 'required|boolean'
        ]);

        $result = QuizResult::updateOrCreate(
            [
                'student_id' => $student->id,
                'course_id' => $request->course_id
            ],
            [
                'score' => $request->score,
                'total_questions' => $request->total_questions,
                'percentage' => $request->percentage,
                'is_passed' => $request->is_passed
            ]
        );

        if ($request->is_passed) {
            $progress = Progress::updateOrCreate(
                [
                    'student_id' => $student->id,
                    'course_id' => $request->course_id
                ],
                [
                    'percentage' => 100
                ]
            );

            Certificat::firstOrCreate(
                [
                    'student_id' => $student->id,
                    'course_id' => $request->course_id
                ],
                [
                    'issued_at' => now(),
                    'certificate_url' => null
                ]
            );
        }

        return response()->json([
            'message' => 'Quiz result saved successfully',
            'result' => $result
        ]);
    }

    public function myResults()
    {
        $student = auth()->user();

        $results = QuizResult::where('student_id', $student->id)->get();

        return response()->json($results);
    }

    public function showByCourse($course_id)
    {
        $student = auth()->user();

        $result = QuizResult::where('student_id', $student->id)
            ->where('course_id', $course_id)
            ->first();

        return response()->json($result);
    }
}
