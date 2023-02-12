<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InterventoAllegato extends Model
{
    use HasFactory;

    protected $primaryKey = 'id_allegato';

    protected $table = 'interventi_allegati';

    public $timestamps = false;

    protected $casts = [
        'date_add' => 'datetime',
        'date_upd' => 'datetime',
    ];

}
