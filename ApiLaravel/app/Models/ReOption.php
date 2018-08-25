<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ReOption extends Model
{
    protected $table='re_options';


    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'faId','number','option','optContent','title',
    ];

    protected $guarded = [];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
    ];
}
