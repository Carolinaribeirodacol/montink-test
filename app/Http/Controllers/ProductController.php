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
        $products = Product::with(['variations.stock'])->get();

        $productsFormatted = $products->map(function ($product) {
            $variations = $product->variations->map(function ($v) {
                return [
                    'id' => $v->id,
                    'size' => $v->size,
                    'color' => $v->color,
                    'price' => $v->price,
                    'stock' => $v->stock?->quantity ?? 0,
                ];
            });

            return [
                'id' => $product->id,
                'name' => $product->name,
                'description' => $product->description,
                'price' => $product->price,
                'variations' => $variations,
                'available_colors' => $variations->pluck('color')->unique()->values(),
                'available_sizes' => $variations->pluck('size')->unique()->values(),
            ];
        });

        return Inertia::render('products/index', [
            'products' => $productsFormatted,
        ]);
    }

    public function show(Product $product)
    {
        return Inertia::render('products/show', [
            'product' => $product,
        ]);
    }
}
