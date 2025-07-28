<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\ProductImage;
use Illuminate\Database\Seeder;

class ProductImageSeeder extends Seeder
{
    public function run(): void
    {
        $products = Product::all();

        $imageFilenames = ['1.jpg', '2.jpg', '3.jpg'];

        foreach ($products as $index => $product) {
            ProductImage::create([
                'product_id' => $product->id,
                'path' => 'product-images/' . $imageFilenames[$index % count($imageFilenames)],
            ]);
        }
    }
}
