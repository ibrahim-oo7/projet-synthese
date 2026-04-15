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
        Schema::create('quiz_results', function (Blueprint $table) {
            $table->id();
           
            $table->foreignId('student_id')
                ->constrained('users')
                ->onDelete('cascade');

            $table->string('course_id');

            
            $table->integer('score');
            $table->integer('total_questions');
            $table->float('percentage');

        
            $table->boolean('is_passed')->default(false);

            
            $table->integer('attempt')->default(1);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('quiz_results');
    }
};
