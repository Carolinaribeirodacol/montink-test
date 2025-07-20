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
            'description' => 'nullable',
            'price' => 'required|numeric|min:0',
            'variations.*.size' => ['required', 'string'],
            'variations.*.color' => ['required', 'string'],
            'variations.*.price' => ['required', 'numeric'],
            'variations.*.quantity' => ['required', 'integer'],
        ]);

        $product = Product::create([
            'name' => $request->name,
            'description' => $request->description,
            'price' => $request->price,
        ]);

        foreach ($request->variations as $variation) {
            $pv = $product->variations()->create([
                'size' => $variation['size'],
                'color' => $variation['color'],
                'price' => $variation['price'],
            ]);

            $pv->stock()->create([
                'quantity' => $variation['quantity']
            ]);
        }

        return redirect()->route('admin.products.index')->with('success', 'Produto criado com sucesso!');
    }

    public function show(Product $product)
    {
        $product->load(['variations.stock']);

        return Inertia::render('admin/products/show', [
            'product' => $product,
        ]);
    }

    public function edit(Product $product)
    {
        $product->load(['variations.stock']);

        return Inertia::render('admin/products/edit', [
            'product' => $product,
        ]);
    }

    public function update(Request $request, Product $product)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable',
            'price' => 'required|numeric|min:0',
            'variations.*.size' => ['required', 'string'],
            'variations.*.color' => ['required', 'string'],
            'variations.*.price' => ['required', 'numeric'],
            'variations.*.quantity' => ['required', 'integer'],
        ]);

        $product->update([
            'name' => $request->name,
            'description' => $request->description,
            'price' => $request->price,
        ]);

        $existingIds = [];

        foreach ($request->variations as $variation) {
            if (isset($variation['id'])) {
                $pv = $product->variations()->find($variation['id']);

                if ($pv) {
                    $pv->update([
                        'size' => $variation['size'],
                        'color' => $variation['color'],
                        'price' => $variation['price'],
                    ]);

                    $pv->stock()->updateOrCreate(
                        ['product_variation_id' => $pv->id],
                        ['quantity' => $variation['quantity']]
                    );

                    $existingIds[] = $pv->id;
                }
            } else {
                $pv = $product->variations()->create([
                    'size' => $variation['size'],
                    'color' => $variation['color'],
                    'price' => $variation['price'],
                ]);

                $pv->stock()->create([
                    'quantity' => $variation['quantity']
                ]);

                $existingIds[] = $pv->id;
            }
        }

        $product->variations()
            ->whereNotIn('id', $existingIds)
            ->each(function ($variation) {
                $variation->stock()->delete();
                $variation->delete();
            });

        return redirect()->route('admin.products.index')->with('success', 'Produto atualizado com sucesso!');
    }

    public function destroy(Product $product)
    {
        $product->load('variations.stock');

        foreach ($product->variations as $variation) {
            $variation->stock()->delete();
        }

        $product->variations()->delete();
        $product->delete();

        return redirect()->route('admin.products.index')->with('success', 'Produto excluído com sucesso!');
    }
}
