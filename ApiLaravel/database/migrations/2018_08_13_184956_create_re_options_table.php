<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateReOptionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('re_options', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('fuId')->index();
            $table->integer('number');
            $table->text('title');
            $table->string('opt',255);
            $table->string('type',255);
            $table->text('optContent');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('re_options');
    }
}
