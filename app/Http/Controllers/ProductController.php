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
        $products = Product::with(['variations', 'images'])->get();

        $productsFormatted = $products->map(function ($product) {
            $firstVariation = $product->variations->first();
            $mainImage = $product->images->first();

            return [
                'id' => $product->id,
                'name' => $product->name,
                'description' => $product->description,
                'price' => $firstVariation?->price ?? 0,
                'image' => $mainImage?->path ? asset('storage/' . $mainImage->path) : null
            ];
        });

        return Inertia::render('products/index', [
            'products' => $productsFormatted,
        ]);
    }

    public function show(Product $product)
    {
        $product->load(['variations.stock', 'images']);

        $variations = $product->variations->map(function ($variation) {
            return [
                'id' => $variation->id,
                'size' => $variation->size,
                'color' => $variation->color,
                'stock' => $variation->stock?->quantity ?? 0,
            ];
        });

        return Inertia::render('products/show', [
            'product' => [
                'id' => $product->id,
                'name' => $product->name,
                'description' => $product->description,
                'price' => $product->price,
                'variations' => $variations,
                'images' => $product->images->map(fn ($img) => asset('storage/' . $img->path))
            ],
        ]);
    }
}
