<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Coupon>
 */
class CouponFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'code' => strtoupper($this->faker->bothify('CUPOM###')),
            'discount' => $this->faker->randomFloat(2, 5, 50),
            'min_total' => fake()->randomElement([0, 50, 100]),
            'expires_at' => now()->addDays(fake()->numberBetween(10, 60)),
        ];
    }
}
