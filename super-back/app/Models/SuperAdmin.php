<?php

namespace App\Models;

use Laravel\Sanctum\HasApiTokens;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class SuperAdmin extends Authenticatable
{
    use HasApiTokens;
    use Notifiable;

    protected $fillable = [
        'email',
        'password'
    ];

    protected $hidden = [
        'password',
        'remember_token'
    ];
}