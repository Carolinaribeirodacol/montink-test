<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductVariation extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_id',
        'size',
        'color',
        'price',
    ];

    public function stock()
    {
        return $this->hasOne(Stock::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function orders() {
        return $this->belongsToMany(Order::class, 'order_products')
            ->withPivot('quantity')
            ->withTimestamps();
    }
}
