<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class studentController extends Controller
{
    public function profile()
    {
        $student = auth('api')->user();
        return response()->json($student);
    }

   
}
