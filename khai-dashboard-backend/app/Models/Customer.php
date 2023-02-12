<?php

namespace App\Models;

use App\Traits\Scopes\HasApplicationScope;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    use HasFactory;
    use HasApplicationScope;

    protected $table = 'customers';

    protected $primaryKey = 'id_customer';

    public $timestamps = false;

    protected $casts = [
        'date_add' => 'datetime',
        'date_upd' => 'datetime',
    ];

}
