<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/products', [
            'products' => Product::all(),
        ]);
    }

    public function show(Product $product)
    {
        return Inertia::render('admin/productView', [
            'product' => $product,
        ]);
    }

    public function edit(Product $product)
    {
        return Inertia::render('admin/productEdit', [
            'product' => $product,
        ]);
    }

    public function destroy(Product $product)
    {
        $product->delete();
        return redirect()->route('admin.products.index')->with('success', 'Produto excluído');
    }
}
