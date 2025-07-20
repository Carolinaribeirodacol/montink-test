import DefaultLayout from '@/layouts/DefaultLayout';
import { colorOptions, sizeOptions } from '@/lib/variants';
import { useForm, usePage } from '@inertiajs/react';
import { Button, Divider, Group, NumberInput, Select, Stack, Textarea, TextInput, Title } from '@mantine/core';

type Product = {
    id: number;
    name: string;
    description: string;
    price: number;
    variations: {
        id?: number | null;
        size: string;
        color: string;
        price: number;
        stock?: { quantity: number };
    }[];
};

export default function ProductEdit() {
    const allowedKeys = ['size', 'color', 'price', 'quantity'];
    const { product } = usePage().props as unknown as { product: Product };

    const { data, setData, put, processing, errors } = useForm({
        name: product.name,
        description: product.description,
        price: product.price,
        variations: (product.variations ?? []).map((variation) => ({
            id: variation.id,
            size: variation.size,
            color: variation.color,
            price: variation.price,
            quantity: variation.stock?.quantity ?? 0,
        })),
    });

    const addVariation = () => {
        setData('variations', [...data.variations, { id: null, size: '', color: '', price: 0, quantity: 0 }]);
    };

    const updateVariation = (index: number, key: string, value: any) => {
        if (!allowedKeys.includes(key)) return;

        const updated = [...data.variations];
        updated[index][key] = value;
        setData('variations', updated);
    };

    const removeVariation = (index: number) => {
        const updated = [...data.variations];
        updated.splice(index, 1);
        setData('variations', updated);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('admin.products.update', product.id));
    };

    return (
        <DefaultLayout>
            <Title order={2}>Editar Produto</Title>

            <form onSubmit={handleSubmit}>
                <TextInput
                    label="Nome"
                    value={data.name}
                    onChange={(e) => setData('name', e.currentTarget.value)}
                    error={errors.name}
                    required
                    mb="sm"
                />

                <Textarea
                    label="Descrição"
                    value={data.description}
                    onChange={(e) => setData('description', e.currentTarget.value)}
                    error={errors.description}
                    mb="sm"
                />

                <NumberInput
                    label="Preço"
                    prefix="R$"
                    value={data.price}
                    onChange={(value) => setData('price', Number(value))}
                    mb="md"
                    error={errors.price}
                    required
                    min={0}
                    defaultValue={0.0}
                    decimalSeparator=","
                />

                <Divider my="xl" label="Variações" />

                {data.variations.map((variation, index) => (
                    <Stack key={index} style={{ border: '1px solid #ddd', padding: 16, borderRadius: 8 }} mb="md">
                        <Group grow>
                            <Select
                                label="Tamanho"
                                data={sizeOptions}
                                value={variation.size}
                                onChange={(value) => updateVariation(index, 'size', value)}
                                required
                                placeholder="Selecione um tamanho"
                            />

                            <Select
                                label="Cor"
                                data={colorOptions}
                                value={variation.color}
                                onChange={(value) => updateVariation(index, 'color', value)}
                                required
                                placeholder="Selecione uma cor"
                            />
                        </Group>

                        <Group grow>
                            <NumberInput
                                label="Preço"
                                prefix="R$"
                                value={variation.price}
                                onChange={(value) => updateVariation(index, 'price', Number(value))}
                                required
                                min={0}
                                defaultValue={0.0}
                                decimalSeparator=","
                            />

                            <NumberInput
                                label="Estoque"
                                value={variation.quantity}
                                onChange={(value) => updateVariation(index, 'quantity', Number(value))}
                                min={0}
                                required
                            />
                        </Group>

                        <Group justify="end">
                            <Button color="red" size="xs" onClick={() => removeVariation(index)}>
                                Remover variação
                            </Button>
                        </Group>
                    </Stack>
                ))}

                <Group justify="center" my="md">
                    <Button variant="light" onClick={addVariation}>
                        + Adicionar Variação
                    </Button>
                </Group>

                <Group justify="flex-end" mt="xl">
                    <Button type="submit" loading={processing}>
                        Salvar
                    </Button>
                </Group>
            </form>
        </DefaultLayout>
    );
}
