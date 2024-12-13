<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class country extends Model
{
    use HasFactory;
    protected $table = 'countries';
    protected $primaryKey = 'id';

    public $timestamps = true;
    protected $fillable = [
        'name',
        'region',
        'population',
        'president_elect',
        'size',
        'active'
    ];

    protected $hidden = [
        'active'
    ];

}
