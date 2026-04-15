<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('certificats', function (Blueprint $table) {
            if (!Schema::hasColumn('certificats', 'student_id')) {
                $table->foreignId('student_id')->constrained('users')->onDelete('cascade');
            }
            if (!Schema::hasColumn('certificats', 'course_id')) {
                $table->unsignedBigInteger('course_id');
            }
            if (!Schema::hasColumn('certificats', 'issued_at')) {
                $table->timestamp('issued_at')->nullable();
            }
            if (!Schema::hasColumn('certificats', 'certificate_url')) {
                $table->string('certificate_url')->nullable();
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('certificats', function (Blueprint $table) {
            $table->dropForeignIdFor(\App\Models\User::class, 'student_id');
            $table->dropColumn(['student_id', 'course_id', 'issued_at', 'certificate_url']);
        });
    }
};
