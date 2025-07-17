<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ProductVariation>
 */
class ProductVariationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $sizes = ['P', 'M', 'G', 'GG'];
        $colors = ['Vermelho', 'Azul', 'Verde', 'Preto', 'Amarelo', 'Branco', 'Laranja', 'Marrom', 'Cinza', 'Roxo', 'Lilas', 'Bege'];

        return [
            'price' => fake()->randomFloat(2, 29.90, 199.90),
            'size' => fake()->randomElement($sizes),
            'color' => fake()->randomElement($sizes),
        ];
    }
}
