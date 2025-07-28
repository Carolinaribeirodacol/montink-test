<?php

namespace Database\Seeders;

use App\Models\Coupon;
use App\Models\Product;
use App\Models\ProductVariation;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Criação de um usuário
        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        // Define as opções conforme variants.ts
        $colors = ['preto', 'branco', 'azul', 'vermelho', 'verde'];
        $sizes = ['P', 'M', 'G', 'GG', 'XG'];

        Product::factory(10)->create()->each(function ($product) use ($colors, $sizes) {
            $selectedColors = collect($colors)->shuffle()->take(rand(2, 4));
            $selectedSizes = collect($sizes)->shuffle()->take(rand(2, 3));

            foreach ($selectedColors as $color) {
                foreach ($selectedSizes as $size) {
                    $variation = ProductVariation::create([
                        'product_id' => $product->id,
                        'color' => $color,
                        'size' => $size,
                        'price' => rand(5000, 10000) / 100,
                    ]);

                    $variation->stock()->create([
                        'quantity' => rand(5, 50),
                    ]);
                }
            }
        });

        Coupon::factory(3)->create();
        $this->call([
            ProductImageSeeder::class,
            StatusOrderSeeder::class,
        ]);
    }
}
