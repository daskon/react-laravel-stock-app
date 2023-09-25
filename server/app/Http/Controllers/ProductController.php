<?php

namespace App\Http\Controllers;

use App\Events\StockLeftNotification;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequest $request)
    {
        try{
            Product::create([
                'product_name' => $request->productName,
                'quantity' => $request->quantity
            ]);
            return response(['message' => 'Product added successfuly']);
        }catch (\Exception $e) {
            return response([
                'message' => 'Invalid Credentials'
            ], 422);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        try{
            $data = Product::all();
            return response(compact('data'));
        }catch (\Exception $e) {
            return response([
                'message' => 'Invalid Credentials'
            ], 422);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductRequest $request, Product $product)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product, Request $request)
    {
        try{
            $product->where('id', $request->id)->delete();

            $data = Product::all();
            event(new StockLeftNotification((count($data))));

            return response(['message' => 'Deleted successfuly']);
        }catch (\Exception $e) {
            return response([
                'message' => 'Invalid Credentials'
            ], 422);
        }
    }
}
