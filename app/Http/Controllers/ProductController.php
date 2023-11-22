<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Product::all());
    }

    /**
     * Show the form for creating a new resource.
     */
    public function store(Request $request)
    {
        Product::create($request->validated());
        return response()->json("Producto añadido");
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        return response()->json(Product::find($product->id));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        //
    }
}








































<?php

namespace App\Http\Controllers;

use App\Models\Application;
use Illuminate\Http\Request;
use App\Http\Requests\StoreApplicationRequest;

class ApplicationController extends Controller
{
    public function index()
    {
        return response()->json(Application::all());
    }

    public function show($id)
    {
        return response()->json(Application::find($id));
    }

    public function store(StoreApplicationRequest $request){
        Application::create($request->validated());
        return response()->json("Usuario creado");
    }

    public function update(StoreApplicationRequest $request, Application $Application)
    {
        $Application->update($request->validated());
        return $Application;
    }

    public function destroy(Application $Application){
        $Application->delete();
        return response()->json("Usuario eliminado");
    }
}