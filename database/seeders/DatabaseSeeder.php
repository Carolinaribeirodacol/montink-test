<?php

namespace Database\Seeders;

use App\Models\Coupon;
use App\Models\Product;
use App\Models\ProductVariation;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        Product::factory(10)->create()->each(function ($product) {
            ProductVariation::factory(rand(2, 4))->create([
                'product_id' => $product->id,
            ])->each(function ($variation) {
                $variation->stock()->create([
                    'quantity' => rand(10, 100),
                ]);
            });
        });

        Coupon::factory(3)->create();

        $this->call(StatusOrderSeeder::class);
    }
}
