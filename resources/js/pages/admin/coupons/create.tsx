import DefaultLayout from '@/layouts/DefaultLayout';
import { useForm } from '@inertiajs/react';
import { Button, Group, NumberInput, Title } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import 'dayjs/locale/pt-br';

export default function CouponCreate() {
    const { data, setData, post, processing, errors } = useForm({
        discount: 0,
        min_total: 0,
        expires_at: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.coupons.store'));
    };

    return (
        <DefaultLayout>
            <Title order={2}>Criar Cupom</Title>

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

                <DatePickerInput
                    label="Data de expiração"
                    placeholder="Data de expiração"
                    value={data.expires_at}
                    locale="pt-br"
                    valueFormat="DD [de] MMMM [de] YYYY"
                    onChange={(value) => setData('expires_at', String(value))}
                />

                <Group justify="flex-end" mt="xl">
                    <Button type="submit" loading={processing}>
                        Criar Cupom
                    </Button>
                </Group>
            </form>
        </DefaultLayout>
    );
}
