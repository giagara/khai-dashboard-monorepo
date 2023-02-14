<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\DashboardController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::prefix('v1')->group(function () {

    Route::post('/login', [AuthenticatedSessionController::class, 'store'])
                        ->middleware('guest')
                        ->name('login');

    Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])
                        ->middleware('guest')
                        ->name('logout');

    Route::post('/forgot-password', [PasswordResetLinkController::class, 'store'])
                    ->middleware('guest')
                    ->name('password.email');

    Route::post('/reset-password', [NewPasswordController::class, 'store'])
                    ->middleware('guest')
                    ->name('password.store');

    // Route::get('/verify-email/{id}/{hash}', [VerifyEmailController::class, '__invoke'])
    //                 ->middleware(['auth', 'signed', 'throttle:6,1'])
    //                 ->name('verification.verify');

    // Route::post('/email/verification-notification', [EmailVerificationNotificationController::class, 'store'])
    //                 ->middleware(['auth', 'throttle:6,1'])
    //                 ->name('verification.send');

    Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])
                    ->middleware('auth')
                    ->name('logout');


    /** PRIVATE ROUTES */
    Route::middleware('auth:sanctum')->group(function () {

        Route::get('/user', function (Request $request) {
            return $request->user();
        });

        Route::prefix('dashboard')->group(function () {

            Route::get('applications', [DashboardController::class, 'applications'])->name('applications');
            Route::get('stats', [DashboardController::class, 'stats'])->name('stats');

        });

    });

});
