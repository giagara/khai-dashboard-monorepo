<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Application extends Model
{
    use HasFactory;

    protected $primaryKey = 'id_application';

    public $timestamps = false;

    protected $fillable = [
        'name',
        'users_count',
        'tipo',
        'apikey',
    ];

    protected $casts = [
        'date_add' => 'datetime',
        'date_upd' => 'datetime',
        'active' => 'boolean'
    ];

    /**
     * Get the route key for the model.
     *
     * @return string
     */
    public function getRouteKeyName()
    {
        return 'uuid';
    }

    /**
     * The "booted" method of the model.
     *
     * @return void
     */
    protected static function booted()
    {
        static::creating(function ($application) {
            $application->uuid = Str::uuid();
            $application->active = 1;
        });
    }
}
