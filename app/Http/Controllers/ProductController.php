<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('products/index', [
            'products' => Product::all(),
        ]);
    }

    public function show(Product $product)
    {
        return Inertia::render('products/show', [
            'product' => $product,
        ]);
    }
}
