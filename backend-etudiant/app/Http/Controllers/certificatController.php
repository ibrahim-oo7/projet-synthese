<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Certificat;
use App\Models\Progress;
use Illuminate\Http\Request;

class certificatController extends Controller
{
     public function generate(Request $request)
    {
        $student = auth()->user();

        // نجيب progress
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

        // إنشاء certificate
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
}
