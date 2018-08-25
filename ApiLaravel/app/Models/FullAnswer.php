<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FullAnswer extends Model
{
    protected $table='full_answers';


    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'qId',
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
