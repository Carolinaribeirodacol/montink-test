import DefaultLayout from '@/layouts/DefaultLayout';
import { formatCurrency } from '@/lib/formatCurrency';
import { usePage } from '@inertiajs/react';
import { Text, Title } from '@mantine/core';

type Coupon = {
    id: number;
    code: string;
    discount: number;
    min_total: number;
    expires_at: string;
};


export default function CouponShow() {
    const { coupon } = usePage().props as unknown as { coupon: Coupon };

    return (
        <DefaultLayout>
            <Title order={2} mb="xs">
                {coupon.code}
            </Title>

            <Text fw={700} size="lg" mb="lg">
                {formatCurrency(coupon.discount)}
            </Text>

            <Text fw={700} size="lg" mb="lg">
                Valor mínimo da compra: {formatCurrency(coupon.min_total)}
            </Text>

            <Text size="lg" mb="lg">
                Expira em {coupon.expires_at}
            </Text>
        </DefaultLayout>
    );
}
