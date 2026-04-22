<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Lesson;
use App\Models\Course;

class LessonController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($courseId)
    {
        $course = Course::findOrFail($courseId);
        $lessons = $course->lessons()->orderBy('order', 'asc')->get();
        return response()->json($lessons);
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
    public function store(Request $request, $courseId)
    {
        $request->validate([
            "title"=>'required',
            "video"=>"required",
            "content"=>"required",
            "duration" => "nullable|integer",
        ]);

        $course = Course::findOrFail($courseId);

        if ($course->teacher_id !== auth('api')->id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $lesson = new Lesson();
        $lesson->title = $request->title;
        if ($request->hasFile('video')) {
            $path = $request->file('video')->store('videos', 'public');
            $lesson->video = $path;
        }
        $lesson->content = $request->content;
        $lesson->duration = $request->duration;
        $lesson->course_id = $course->id;
        $lesson->save();

        return response()->json([
            'message' => 'Lesson created  successfully',
            'lesson' => $lesson->only(['id','title','video','content','course_id','duration'])
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $lesson = Lesson::findOrFail($id);
        return response()->json([
            'lesson' => $lesson
        ]);
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
            "content"=>"required",
        ]);

        $lesson = Lesson::findOrFail($id);
        $course = Course::findOrFail($lesson->course_id);

        if ($course->teacher_id !== auth('api')->id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $lesson->title = $request->title;
        if ($request->hasFile('video')) {
            $path = $request->file('video')->store('videos', 'public');
            $lesson->video = $path;
        }
        $lesson->content = $request->content;

        $lesson->save();

        return response()->json([
            'message' => 'Lesson update  successfully',
            'lesson' => $lesson->only(['id','title','video','content','course_id'])
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $lesson = Lesson::findOrFail($id);
        $course = Course::findOrFail($lesson->course_id); 
        
        if ($course->teacher_id !== auth('api')->id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }
        $lesson->delete();
        return response()->json(['message' => 'lesson deleted  successfully',]);
    }
}
