<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\TeamController;

Route::middleware(['auth:sanctum'])
    ->prefix('v1')
    ->group(function () {
        Route::resource('users', UserController::class);
        Route::resource('teams', TeamController::class);
});
