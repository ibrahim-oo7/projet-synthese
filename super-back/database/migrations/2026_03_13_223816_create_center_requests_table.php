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
        Schema::create('center_requests', function (Blueprint $table) {

            $table->id();

            $table->string('name');
            $table->string('email')->unique();
            $table->string('phone');

            $table->string('city');
            $table->string('address')->nullable();

            $table->text('message')->nullable();

            $table->enum('status', [
                'pending',
                'accepted',
                'rejected'
            ])->default('pending');

            $table->timestamp('reviewed_at')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('center_requests');
    }
};
