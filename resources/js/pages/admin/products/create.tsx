import DefaultLayout from '@/layouts/DefaultLayout';
import { colorOptions, sizeOptions } from '@/lib/variants';
import { useForm } from '@inertiajs/react';
import { Button, Divider, Group, NumberInput, Select, Stack, Textarea, TextInput, Title } from '@mantine/core';

export default function ProductCreate() {
    const allowedKeys = ['size', 'color', 'price', 'quantity'];

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
        price: 0,
        variations: [{ id: null, size: '', color: '', price: 0, quantity: 0 }],
    });

    const addVariation = () => {
        setData('variations', [...data.variations, { size: '', color: '', price: 0, quantity: 0 }]);
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
        post(route('admin.products.store'));
    };

    return (
        <DefaultLayout>
            <Title order={2}>Criar Produto</Title>

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
                    mb="md"
                    required
                    value={data.price}
                    onChange={(value) => setData('price', Number(value))}
                    error={errors.price}
                    min={0}
                    prefix="R$"
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
                        Criar Produto
                    </Button>
                </Group>
            </form>
        </DefaultLayout>
    );
}
