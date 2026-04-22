<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Course;

class CourseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $courses = Course::with(['lessons', 'teacher'])->get();
        return response()->json($courses);
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
            "title"=>'required',
            "category"=>"required",
            "level"=>"required",
            "description"=>"required",   
        ]);

        $course = new Course();
        $course->title = $request->title;
        $course->category = $request->category;
        $course->level = $request->level;
        if ($request->hasFile('course_image')) {
            $path = $request->file('course_image')->store('course_images', 'public');
            $course->course_image = $path;
        }
        $course->description = $request->description;
        $course->teacher_id = auth('api')->id();
        $course->status = 'pending';
        $course->save();

        return response()->json([
            'message' => 'Course created  successfully',
            'course' => $course->only(['id','title','category','level','course_image','description','teacher_id','status'])
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $course = Course::with(['lessons', 'teacher'])->where('id', $id)->first();
        if (!$course) {
            return response()->json(['message' => 'Course not found'], 404);
        }
        return response()->json($course);
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
            "title"=>'required',
            "category"=>"required",
            "level"=>"required",
            "description"=>"required"
        ]);

        $course = Course::where('id',$id)->where('teacher_id',auth('api')->id())->firstOrFail();
        $course->title = $request->title;
        $course->level = $request->level;
        $course->category = $request->category;
        if ($request->hasFile('course_image')) {
            $path = $request->file('course_image')->store('course_images', 'public');
            $course->course_image = $path;
        }
        $course->description = $request->description;
        $course->status = 'pending';
        $course->save();
        
        return response()->json([
            'message' => 'Course update  successfully',
            'course' => $course->only(['id','title','category','level','course_image','description','teacher_id','status'])
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $course = Course::where('id', $id)->where('teacher_id',auth('api')->id())->firstOrFail()->delete();
        return response()->json(['message' => 'Course deleted  successfully',]);
    }
    


// Dans CourseController.php
    public function teachersStats()
    {
        $centerId = auth('api')->id();

        $stats = Course::with('teacher')->whereHas('teacher', function ($query) use ($centerId) {
            $query->where('center_id', $centerId);})->get()->groupBy('teacher_id')->map(function ($courses) {
            $teacher = $courses->first()->teacher;
            return [
                'teacher_id'   => $teacher->id,
                'teacher_name' => $teacher->name,
                'total'        => $courses->count(),
                'approved'     => $courses->where('status', 'approved')->count(),
                'pending'      => $courses->where('status', 'pending')->count(),
                'rejected'     => $courses->where('status', 'rejected')->count(),
            ];
        })->values();
    return response()->json($stats);
    } 

    public function centerCourses()
    {
        $centerId = auth('api')->id();
        $teachers = \App\Models\User::where('center_id', $centerId)->pluck('id');
        $courses = Course::with('teacher')->whereIn('teacher_id', $teachers)->get();
        return response()->json($courses);
    }

    public function centerCourseShow($id)
{
    $centerId = auth('api')->id();

    $teachers = \App\Models\User::where('center_id', $centerId)->pluck('id');

    $course = Course::with(['lessons', 'teacher'])
        ->whereIn('teacher_id', $teachers)
        ->where('id', $id)
        ->firstOrFail();

    return response()->json($course);
}

    public function updateStatus(Request $request, $id)
{
    $request->validate([
        "status" => "required|in:approved,rejected,pending"
    ]);

    $course = Course::findOrFail($id);

    $course->status = $request->status;
    $course->save();

    return response()->json([
        "message" => "Status updated successfully",
        "course" => $course
    ]);
}
}