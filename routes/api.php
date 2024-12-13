<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\api\CountryController;


Route::prefix('country')->group(function () {
    Route::get('', [CountryController::class, 'index']);
    Route::get('/{id}', [CountryController::class, 'show'])->where('id', '[0-9]+');
    Route::post('', [CountryController::class, 'new']);
    Route::patch('/{id}', [CountryController::class, 'edit'])->where('id', '[0-9]+');
    Route::delete('/{id}', [CountryController::class, 'destroy'])->where('id', '[0-9]+');
});
