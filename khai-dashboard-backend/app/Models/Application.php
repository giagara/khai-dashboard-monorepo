<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Application extends Model
{
    use HasFactory;

    protected $primaryKey = 'id_application';

    public $timestamps = false;

    protected $casts = [
        'date_add' => 'datetime',
        'date_upd' => 'datetime',
    ];
}
