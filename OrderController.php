<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\Product;

class OrderController extends Controller
{
    public function index()
    {
        return response()->json(Order::with('product')->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);

        $product = Product::findOrFail($validated['product_id']);
        $total = $product->price * $validated['quantity'];

        $order = Order::create([
            'product_id' => $product->id,
            'quantity' => $validated['quantity'],
            'total_price' => $total,
        ]);

        return response()->json($order->load('product'), 201);
    }
}
