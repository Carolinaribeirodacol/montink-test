<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/products/index', [
            'products' => Product::all(),
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/products/create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
        ]);

        $product = Product::create([
            'name' => $request->name,
            'price' => $request->price,
        ]);

        return redirect()->route('admin.products.index')->with('success', 'Produto criado com sucesso!');
    }

    public function show(Product $product)
    {
        return Inertia::render('admin/products/show', [
            'product' => $product,
        ]);
    }

    public function edit(Product $product)
    {
        return Inertia::render('admin/products/edit', [
            'product' => $product,
        ]);
    }

    public function update(Request $request, Product $product)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
        ]);

        $product->update([
            'name' => $request->name,
            'price' => $request->price,
        ]);

        return redirect()->route('admin.products.index')->with('success', 'Produto atualizado com sucesso!');
    }

    public function destroy(Product $product)
    {
        $product->delete();

        return redirect()->route('admin.products.index')->with('success', 'Produto excluído com sucesso!');
    }
}
