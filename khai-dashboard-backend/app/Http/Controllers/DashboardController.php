<?php

namespace App\Http\Controllers;

use App\Models\Application;
use App\Models\attachment;
use App\Models\Intervento;
use App\Models\InterventoAllegato;
use App\Models\User;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function applications(){

        return \response()->json(Application::all());

    }

    public function stats(){

        $interventi_anno = Intervento::query()
        ->where('date_add', '>', now()->addYear(-1))
        ->orderBy('date_add')
        ->get()
        ->groupBy(function($intervento){
            return $intervento->date_add->format("m/Y");
        })->map(function($interventi){
            return $interventi->count();
        })
        ->values();

        $users = User::query()
        ->where('date_add', '>', now()->addYear(-1))
        ->orderBy('date_add')
        ->get()
        ->groupBy(function($user){
            return $user->date_add->format("m/Y");
        })->map(function($users){
            return $users->count();
        })
        ->values();

        $attachments = InterventoAllegato::query()
        ->where('date_add', '>', now()->addYear(-1))
        ->orderBy('date_add')
        ->get()
        ->groupBy(function($attachment){
            return $attachment->date_add->format("m/Y");
        })->map(function($attachments){
            return $attachments->count();
        })
        ->values();


        return \response()->json([
            'interventi' => $interventi_anno,
            'interventi_count' => Intervento::count(),
            'users' => $users,
            'users_count' => User::count(),
            'attachments' => $attachments,
            'attachments_count' => InterventoAllegato::count()
        ]);

    }
}
