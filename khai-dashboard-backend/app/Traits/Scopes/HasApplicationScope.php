<?php

namespace App\Traits\Scopes;

use App\Models\Application;

trait HasApplicationScope{

    public function scopeForApplication($query, $application)
    {
        if($application instanceof Application){
            $application = $application->id_application;
        }

        return $query->where('id_application', $application);
    }
}
