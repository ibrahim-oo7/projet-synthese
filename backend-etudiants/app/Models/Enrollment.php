<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Enrollment extends Model
{
    use HasFactory;
    protected $fillable = [
    "student_id",
    "course_id",
    "status",
    "phone",
    "payment_method",
    "experience_level",
    "objectif",
    "motivation",
    "accept_terms"
    ];
}
