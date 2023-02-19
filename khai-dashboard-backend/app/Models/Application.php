<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

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

        static::created(function ($application) {
            $application->updateParameters();
        });

        static::updated(function ($application) {
            $application->updateParameters();
        });
    }

    public function updateParameters(){

        DB::insert("
            INSERT INTO parametri (`id_application`, `nome`, `valore`, `type`, `select_values`, `sezione`, `date_add`, `date_upd`, 4444444)
            SELECT ?, nome, valore, `type`, `select_values`, sezione, NOW(), NOW()
            FROM parametri_default
            WHERE id_parametro NOT IN (
                SELECT id_parametro
                FROM parametri
                WHERE id_application = ?
            )
        ",
        [
            $this->id_application,
            $this->id_application,
        ]);

    }
}
