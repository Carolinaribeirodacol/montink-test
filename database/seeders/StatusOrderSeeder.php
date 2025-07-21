<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class StatusOrderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $statuses = [
            ['name' => 'cart',      'description' => 'Carrinho'],
            ['name' => 'pending',   'description' => 'Pendente'],
            ['name' => 'paid',      'description' => 'Pago'],
            ['name' => 'shipped',   'description' => 'Enviado'],
            ['name' => 'cancelled', 'description' => 'Cancelado'],
        ];

        DB::table('status_order')->insert($statuses);
    }
}
