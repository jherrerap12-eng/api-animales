<?php

use App\Http\Controllers\AnimalController;
use Illuminate\Support\Facades\Route;

Route::apiResource('animales', AnimalController::class);