<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Lesson;

class Course extends Model
{
    use HasFactory;
    protected $fillable = [
    'title',
    'category',
    'level',
    'rating',
    'description',
    'teacher_id',
    'status',
    ];
    
    public function teacher(){
        return $this->belongsTo(User::class,'teacher_id');
    }
    public function lessons(){
        return $this->hasMany(Lesson::class,'course_id');
    }
}
