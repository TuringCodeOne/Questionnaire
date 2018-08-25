<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ReShortAnswer extends Model
{
    protected $table='re_short_answers';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'fuId','number','content','title',
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
