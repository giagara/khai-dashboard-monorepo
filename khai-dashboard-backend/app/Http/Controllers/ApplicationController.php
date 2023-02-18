<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreApplicationRequest;
use App\Models\Application;
use App\Models\User;
use Illuminate\Http\Request;
use Spatie\QueryBuilder\QueryBuilder;

class ApplicationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $query = QueryBuilder::for(Application::class)
        ->allowedFilters(['name'])
        ->defaultSort('name')
        ->allowedSorts('name');

        return [
            "applications" => $query->paginate($request->per_page),
            "total" => $query->count()
        ];
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreApplicationRequest $request)
    {

        $application = new Application;
        $application->fill($request->validated());

        if($request->apikey === ""){
            $application->apikey = Str::lower(Str::random(10));
        }

        $application->save();

        return $application;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Application $application)
    {
        return $application;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Application $application)
    {
        return $application->delete();
    }

    public function users(Application $application){

        return User::where('id_application', $application->id_application)->get();

    }
}
