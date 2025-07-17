<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserAddress extends Model
{
    protected $fillable = [
        'user_id',
        'zip_code',
        'address',
        'neighborhood',
        'city',
        'state',
        'address_number',
        'is_primary',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
