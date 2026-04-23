<?php

namespace App\Models;

use Laravel\Sanctum\HasApiTokens;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Center extends Authenticatable
{
    use HasApiTokens;

    protected $fillable = [
        'name',
        'email',
        'password',
        'phone',
        'city',
        'address',
        'status',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    public function payments()
    {
        return $this->hasMany(CenterPayment::class);
    }
}