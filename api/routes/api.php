<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\RegistrationController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\TeamController;
use App\Http\Controllers\PlayerController;

Route::prefix('v1')->group(function () {

    Route::post('/account/register', [RegistrationController::class, 'register'])
        ->name('register');

    Route::post('/account/login', [AuthController::class, 'authenticate'])
        ->name('authenticate');

    Route::middleware(['auth:sanctum'])->group(function () {
        Route::resource('users', UserController::class);
        Route::resource('teams', TeamController::class);
        Route::resource('players', PlayerController::class);
    });
});
