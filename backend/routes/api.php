<?php

use App\Http\Controllers\Auth\ForgotPasswordController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\FormateurController;
use App\Http\Controllers\LessonController;
use App\Http\Controllers\CourseController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
Route::get('/center/teachers-stats', [CourseController::class, 'teachersStats'])->middleware('auth:api');

Route::get('/center/courses', [CourseController::class, 'centerCourses'])->middleware('auth:api');

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
Route::get('/center/courses/{id}', [CourseController::class, 'centerCourseShow'])
    ->middleware('auth:api');

Route::post('/center/courses/{id}/status', [CourseController::class, 'updateStatus'])
    ->middleware('auth:api');

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:api')->post('/logout', [AuthController::class, 'logout']);

Route::middleware('auth:api')->group(function () {
    Route::get('/student/profile', [AuthController::class, 'profile']);
    Route::put('/student/update-profile', [AuthController::class, 'updateProfile']);
});

Route::post('/forgot-password', [ForgotPasswordController::class, 'sendCode']);
Route::post('/verify-code', [ForgotPasswordController::class, 'verifyCode']);
Route::post('/reset-password', [ForgotPasswordController::class, 'resetPassword']);Route::middleware('auth:api')->put('/update-profile', [AuthController::class, 'updateProfile']);

Route::middleware('auth:api')->resource('/teacher', FormateurController::class);
// Route::middleware('auth:api')->resource('/teacher', FormateurController::class);
// Route::middleware('auth:api')->resource('/teacher', FormateurController::class);
    
Route::resource('/courses', CourseController::class)->only(['index', 'show']);

Route::middleware('auth:api')->group(function () {
    Route::resource('/courses', CourseController::class)->except(['index', 'show']);
    Route::resource('courses.lessons', LessonController::class)->shallow();
});

