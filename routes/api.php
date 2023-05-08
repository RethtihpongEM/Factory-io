<?php

  use App\Http\Controllers\Api\V1\InvoiceController;
  use App\Http\Controllers\Api\V1\InvoiceProductController;
  use App\Http\Controllers\Api\V1\ProductController;
  use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
Route::group (['prefix' => 'v1'], function () {
   Route::apiResource ('products',ProductController::class);
   Route::apiResource ('invoices',InvoiceController::class);
   Route::apiResource ('invoice_products', InvoiceProductController::class );
});

Route::middleware('auth:sanctum')->group(function (){
  Route::get('/maker-io/user/{id}', function (Request $request) {
    return $request->user();
  });
Route::post('/logout',[AuthController::class,'logout']);

});
Route::post('/signup',[AuthController::class,'signup']);
Route::post('/login',[AuthController::class,'login']);

