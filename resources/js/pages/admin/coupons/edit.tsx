import DefaultLayout from '@/layouts/DefaultLayout';
import { useForm, usePage } from '@inertiajs/react';
import { Button, Group, NumberInput, Space, Title } from '@mantine/core';

type Coupon = {
    id: number;
    discount: number;
    min_total: number;
    expires_at: string;
};

export default function CouponEdit() {
    const { coupon } = usePage().props as unknown as { coupon: Coupon };

    const { data, setData, put, processing, errors } = useForm({
        discount: coupon.discount,
        min_total: coupon.min_total,
        expires_at: coupon.expires_at,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('admin.coupos.update', coupon.id));
    };

    return (
        <DefaultLayout>
            <Title order={2}>Editar Produto</Title>

            <Space h="lg" />

            <form onSubmit={handleSubmit}>
                <NumberInput
                    label="Desconto"
                    prefix="R$"
                    value={data.discount}
                    onChange={(value) => setData('discount', Number(value))}
                    mb="md"
                    error={errors.discount}
                    required
                    min={0}
                    defaultValue={0.0}
                    decimalSeparator=","
                />

                <NumberInput
                    label="Valor mínimo da compra"
                    prefix="R$"
                    value={data.min_total}
                    onChange={(value) => setData('min_total', Number(value))}
                    mb="md"
                    error={errors.min_total}
                    required
                    min={0}
                    defaultValue={0.0}
                    decimalSeparator=","
                />

                <Group justify="flex-end" mt="xl">
                    <Button type="submit" loading={processing}>
                        Salvar
                    </Button>
                </Group>
            </form>
        </DefaultLayout>
    );
}
