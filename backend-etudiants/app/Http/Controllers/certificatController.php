<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Certificat;
use App\Models\Progress;
use App\Models\QuizResult;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;

class certificatController extends Controller
{
     public function generate(Request $request)
    {
        $student = auth()->user();

        $progress = Progress::where('student_id',$student->id)
            ->where('course_id',$request->course_id)
            ->first();

        if(!$progress || $progress->percentage < 100){
            return response()->json([
                "message"=>"Course not completed"
            ],400);
        }

       
        $exists = Certificat::where('student_id',$student->id)
            ->where('course_id',$request->course_id)
            ->first();

        if($exists){
            return response()->json([
                "message"=>"Certificate already exists",
                "certificate"=>$exists
            ]);
        }

        $certificate = Certificat::create([
            'student_id'=>$student->id,
            'course_id'=>$request->course_id,
            'issued_at'=>now(),
            'certificate_url'=>null 
        ]);

        return response()->json([
            "message"=>"Certificate generated",
            "certificate"=>$certificate
        ]);
    }

    public function myCertificates()
    {
        $student = auth()->user();

        $certificates = Certificat::where('student_id',$student->id)->get();

        return response()->json($certificates);
    }
    public function show($courseId)
{
    $student = auth()->user();

    $certificate = Certificat::where('student_id', $student->id)
        ->where('course_id', $courseId)
        ->first();

    if (!$certificate) {
        return response()->json([
            'message' => 'Certificate not found'
        ], 404);
    }

    $quiz = \App\Models\QuizResult::where('student_id', $student->id)
        ->where('course_id', $courseId)
        ->first();

    return response()->json([
        'certificate_id' => $certificate->id,
        'student_name' => $student->name,

        'course_name' => "Course #".$courseId,

        'issued_at' => $certificate->issued_at,
        'score' => $quiz->percentage ?? 0,
        'grade' => ($quiz && $quiz->percentage >= 80) ? 'A' : 'B',

        'duration' => "40 hours",
        'instructor' => "FormInnova Team",
        'center_name' => "FormInnova",
        'center_location' => "Online"
    ]);
}

 public function downloadPdf($courseId)
    {
        $student = auth()->user();

        $certificate = Certificat::where('student_id', $student->id)
            ->where('course_id', $courseId)
            ->first();

        if (!$certificate) {
            return response()->json([
                'message' => 'Certificate not found'
            ], 404);
        }

        $quiz = QuizResult::where('student_id', $student->id)
            ->where('course_id', $courseId)
            ->first();

        $data = [
            'student_name' => $student->name ?? 'Student',
            'course_name' => 'Course #' . $courseId,
            'issued_at' => $certificate->issued_at,
            'score' => $quiz->percentage ?? 0,
            'grade' => ($quiz && $quiz->percentage >= 90) ? 'A' : 'B',
            'certificate_id' => 'CERT-' . str_pad($certificate->id, 6, '0', STR_PAD_LEFT),
            'duration' => '40 hours',
            'instructor' => 'FormInnova Team',
            'center_name' => 'FormInnova',
            'center_location' => 'Online',
        ];

        $pdf = Pdf::loadView('certificates.pdf', $data)->setPaper('a4', 'landscape');

        return $pdf->download('certificate-' . $courseId . '.pdf');
    }
}
