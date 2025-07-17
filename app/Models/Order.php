<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'code',
        'user_id',
        'coupon_id',
        'status_order_id',
        'user_address_id',
        'subtotal',
        'freight',
        'total'
    ];

    public function address()
    {
        return $this->belongsTo(UserAddress::class, 'user_address_id');
    }
}
