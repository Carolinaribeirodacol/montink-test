<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderProduct;
use App\Models\StatusOrder;
use App\Models\User;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function addToCart($productVariationId)
    {
        $userId = auth()->id;

        $statusCart = StatusOrder::where('name', 'cart')->firstOrFail();

        $order = Order::firstOrCreate([
            'user_id' => $userId,
            'status_order_id' => $statusCart->id,
        ]);

        $orderProduct = OrderProduct::firstOrNew([
            'order_id' => $order->id,
            'product_variation_id' => $productVariationId,
        ]);

        $orderProduct->quantity += 1;
        $orderProduct->save();
    }
}
