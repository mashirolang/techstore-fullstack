<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\CartController;
use App\Http\Controllers\Api\OrderController;

// Auth Routes
Route::post('/api/register', [AuthController::class, 'register']);
Route::post('/api/login', [AuthController::class, 'login']);
Route::post('/api/logout', [AuthController::class, 'logout']);

Route::middleware('auth:web')->get('/api/user', function (Illuminate\Http\Request $request) {
    return $request->user();
});

// Product Routes
Route::get('/api/products', [ProductController::class, 'index']);
Route::get('/api/products/{product}', [ProductController::class, 'show']);



// Protected Order & Cart Routes
Route::middleware('auth:web')->group(function () {
    // Orders
    Route::get('/api/orders', [OrderController::class, 'index']);
    Route::post('/api/orders', [OrderController::class, 'store']);

    // Cart
    Route::prefix('api/cart')->group(function () {
        Route::get('/', [CartController::class, 'index']);
        Route::post('/', [CartController::class, 'store']);
        Route::put('/{cartItem}', [CartController::class, 'update']);
        Route::delete('/{cartItem}', [CartController::class, 'destroy']);
    });
});

// Admin Product Routes
Route::middleware(['auth:web', 'admin'])->group(function () {
    Route::get('/api/admin/stats', [App\Http\Controllers\Api\DashboardController::class, 'index']);
    Route::get('/api/admin/orders', [OrderController::class, 'indexAdmin']);
    Route::post('/api/products', [ProductController::class, 'store']);
    Route::put('/api/products/{product}', [ProductController::class, 'update']);
    Route::delete('/api/products/{product}', [ProductController::class, 'destroy']);
});

// Catch-all for Inertia
Route::get('/{any?}', function () {
    return Inertia::render('welcome');
})->where('any', '^(?!api).*$'); // Exclude /api routes from catch-all just in case, though order matters more
