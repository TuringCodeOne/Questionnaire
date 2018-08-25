<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ShortAnswer extends Model
{
    protected $table='short_answers';


    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        's_id','answer',
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
