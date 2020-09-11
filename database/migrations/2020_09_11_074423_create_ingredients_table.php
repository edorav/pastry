<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateIngredientsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ingredients', function (Blueprint $table) {
            $table->id();
            $table->string('name', 50);	
            $table->string('unitmeasure', 20);	
            $table->decimal('quantity', 5, 2);    
            $table->unsignedBigInteger('cake_id');
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('cake_id')
                ->references('id')->on('cakes')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('ingredients');
    }
}
