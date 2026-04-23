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
        Schema::create('center_payments', function (Blueprint $table) {

            $table->id();

            $table->foreignId('center_id')
                ->constrained('centers')
                ->cascadeOnDelete();

            $table->decimal('amount', 10, 2);

            $table->unsignedTinyInteger('month');

            $table->unsignedSmallInteger('year');

            $table->string('payment_method');

            $table->text('note')->nullable();

            $table->timestamps();

            $table->unique([
                'center_id',
                'month',
                'year'
            ]);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('center_payments');
    }
};
