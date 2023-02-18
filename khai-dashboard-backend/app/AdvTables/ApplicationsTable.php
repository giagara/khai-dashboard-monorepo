<?php

namespace App\AdvTables;

use Advicepharma\Tablegenerator\Contracts\AdvTableContract;
use Advicepharma\Tablegenerator\Elements\Action;
use Advicepharma\Tablegenerator\Elements\ActionColumn;
use Advicepharma\Tablegenerator\Elements\BadgeColumn;
use Advicepharma\Tablegenerator\Elements\Column;
use Advicepharma\Tablegenerator\Tablegenerator;
use App\Models\Application;
use Spatie\QueryBuilder\QueryBuilder;

class ApplicationsTable implements AdvTableContract
{
    /**
    * @return \Advicepharma\Tablegenerator\Tablegenerator
    */
    public static function table($params = null)
    {
        $application = QueryBuilder::for(Application::class);  // add scopes or with statement


        $table = new Tablegenerator;
        $table->query($application)
            //->withResource(ApplicationResource::class)  // if you use it, don't forget to add use statement
            ->paginate()
            ->addFilter()
            ->addSorts()
            ->table()->addColumn(
                [
                    (new Column)
                        ->field('name')
                        ->label('Name')
                        ->filtrable()
                        ->sortable(),

                    (new Column)
                        ->field('apikey')
                        ->label('Api Key')
                        ->filtrable()
                        ->sortable(),

                    (new Column)
                        ->field('active')
                        ->label('Active')
                        ->filtrable()
                        ->sortable(),

                    (new Column)
                        ->field('users_count')
                        ->label('Users count'),

                    // (new ActionColumn)
                    //     ->label('')
                    //     ->addAction(
                    //         (new Action)
                    //         ->type(Action::ACTION_EDIT)
                    //         ->properties(
                    //             [
                    //                 'link_to' => '/account/entity/#id#'
                    //             ]
                    //         )
                    //     )
                    //     ->addAction(
                    //         (new Action)
                    //         ->type(Action::ACTION_DELETE)
                    //         ->properties(
                    //             [
                    //                 'confirm' => true,
                    //                 'confirm_message' => __('messages.confirm', ['name' => __('messages.entity')]),
                    //                 'link_to' => api_route(route('entity.destroy', '#id#', false))
                    //             ]
                    //         )
                    //     )
                ]
            );

        return $table;

    }
}
