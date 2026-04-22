<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'status',
        'center_id',
        'profile_image',
        'bio'

    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }

    public function teachers()
    {
        return $this->hasMany(User::class, 'center_id')->where('role','teacher');
    }

    public function center()
    {
        return $this->belongsTo(User::class, 'center_id')->where('role','center');
    }

    public function courses(){
        return $this->hasMany(Course::class,'teacher_id');
    }
}


