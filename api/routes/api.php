<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\TeamController;
use App\Http\Controllers\AuthController;

Route::middleware(['auth:sanctum'])
    ->prefix('v1')
    ->group(function () {
        Route::resource('users', UserController::class);
        Route::resource('teams', TeamController::class);
        Route::post('/account/login', [AuthController, 'authenticate']);
});
