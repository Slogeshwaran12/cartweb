<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;

class ProductSeeder extends Seeder
{
    public function run()
    {
        $products = [
            ['name' => 'Apple 🍎',         'price' => 1.20],
            ['name' => 'Banana 🍌',        'price' => 0.50],
            ['name' => 'Cherry 🍒',        'price' => 2.00],
            ['name' => 'Grapes 🍇',        'price' => 3.00],
            ['name' => 'Lemon 🍋',         'price' => 0.75],
            ['name' => 'Orange 🍊',        'price' => 1.00],
            ['name' => 'Peach 🍑',         'price' => 1.50],
            ['name' => 'Pineapple 🍍',     'price' => 3.25],
            ['name' => 'Strawberry 🍓',    'price' => 2.50],
            ['name' => 'Watermelon 🍉',    'price' => 4.00],
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}
