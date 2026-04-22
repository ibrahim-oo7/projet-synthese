<?php

use App\Http\Controllers\Auth\ForgotPasswordController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\certificatController;
use App\Http\Controllers\enrollmentController; 
use App\Http\Controllers\progressController; 
use App\Http\Controllers\studentController; 
use App\Http\Controllers\QuizResultController;
use App\Models\Certificat;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


Route::post('/forgot-password', [ForgotPasswordController::class, 'sendCode']);
Route::post('/verify-code', [ForgotPasswordController::class, 'verifyCode']);
Route::post('/reset-password', [ForgotPasswordController::class, 'resetPassword']);Route::middleware('auth:api')->put('/update-profile', [AuthController::class, 'updateProfile']);

Route::post('/enroll/{course}',[enrollmentController::class,'enroll'])
->middleware('auth:api');

Route::get('/my-enrollments',[enrollmentController::class,'myEnrollments'])
->middleware('auth:api');

Route::post('/progress', [progressController::class, 'progress']);
Route::get('/progress/{studentId}', [progressController::class, 'getStudentProgress']);
Route::get('/progress/{studentId}/{courseId}', [progressController::class, 'getCourseProgress']);

Route::get('/certificates/{courseId}', [certificatController::class, 'show'])->middleware('auth:api');
Route::get('/my-certificates', [CertificatController::class, 'myCertificates'])->middleware('auth:api');
Route::get('/certificates/{courseId}/download', [CertificatController::class, 'downloadPdf'])
    ->middleware('auth:api');


Route::middleware('auth:api')->group(function () {
    Route::post('/quiz-results', [QuizResultController::class, 'store']);
    Route::get('/quiz-results', [QuizResultController::class, 'myResults']);
    Route::get('/quiz-results/{course_id}', [QuizResultController::class, 'showByCourse']);
});

Route::middleware('auth:api')->group(function () {
    Route::get('/student/profile',[StudentController::class,'profile']);
   
});