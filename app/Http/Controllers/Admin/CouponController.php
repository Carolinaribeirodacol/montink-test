<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Coupon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CouponController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/coupons/index', [
            'coupons' => Coupon::all(),
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/coupons/create');
    }

    public function store(Request $request)
    {
       //

        return redirect()->route('admin.coupons.index')->with('success', 'Cupom criado com sucesso!');
    }

    public function show(Coupon $coupon)
    {
        //

        return Inertia::render('admin/coupons/show', [
            'coupon' => $coupon,
        ]);
    }

    public function edit(Coupon $coupon)
    {
        if ($coupon->orders()->count() === 0) {
            return Inertia::render('admin/coupons/edit', [
                'coupon' => $coupon,
            ]);
        } else {
            return redirect()->route('admin.coupons.index')->with('error', 'Cupom em uso, impossivel editar!');
        }
    }

    public function update(Request $request, Coupon $coupon)
    {
        //

        return redirect()->route('admin.coupons.index')->with('success', 'Cupom atualizado com sucesso!');
    }

    public function destroy(Coupon $coupon)
    {
        $coupon->delete();

        return redirect()->route('admin.coupons.index')->with('success', 'Cupom excluído com sucesso!');
    }
}
