import DefaultLayout from '@/layouts/DefaultLayout';
import { router, usePage } from '@inertiajs/react';
import { Button, Card, Grid, Group, Select, Space, Stack, Text, Title } from '@mantine/core';
import { useState } from 'react';

type Product = {
    id: number;
    name: string;
    description: string;
    price: number;
    variations: Variation[];
    available_colors: string[];
    available_sizes: string[];
};

type Variation = {
    id: number;
    size: string;
    color: string;
    price: number;
    stock: number;
};

export default function Products() {
    const { products } = usePage().props as unknown as { products: Product[] };

    return (
        <DefaultLayout>
            <Title order={2}>Produtos</Title>
            <Space h="lg" />

            <Grid>
                {products.length === 0 && <h1>Sem produtos disponíveis.</h1>}

                {products.map((product) => {
                    // Estado local por produto (usando useState inline com fallback para o primeiro valor)
                    const [selectedColor, setSelectedColor] = useState<string>(product.available_colors[0] ?? '');
                    const [selectedSize, setSelectedSize] = useState<string>(product.available_sizes[0] ?? '');

                    const selectedVariation = product.variations.find((v) => v.color === selectedColor && v.size === selectedSize);

                    return (
                        <Grid.Col span={{ base: 12, sm: 6 }} key={product.id}>
                            <Card
                                shadow="sm"
                                padding="md"
                                radius="md"
                                withBorder
                                style={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}
                            >
                                <Stack justify="space-between" gap="xs" mt="md" style={{ flex: 1 }}>
                                    <Text fw={600} size="md">
                                        {product.name}
                                    </Text>

                                    <Text size="sm" c="dimmed" lineClamp={3}>
                                        {product.description}
                                    </Text>

                                    <Select
                                        label="Cor"
                                        data={product.available_colors}
                                        value={selectedColor}
                                        onChange={(value) => {
                                            setSelectedColor(value || '');
                                        }}
                                    />

                                    <Group gap="xs" mt="sm">
                                        {product.available_sizes.map((size) => (
                                            <Button
                                                key={size}
                                                variant={selectedSize === size ? 'filled' : 'outline'}
                                                radius="xl"
                                                size="compact-sm"
                                                onClick={() => setSelectedSize(size)}
                                                color="black"
                                            >
                                                {size}
                                            </Button>
                                        ))}
                                    </Group>

                                    {selectedVariation && (
                                        <Text size="sm">
                                            Preço: R$ {selectedVariation.price} {selectedVariation.stock === 0 && '(Sem estoque)'}
                                        </Text>
                                    )}

                                    <Button
                                        onClick={() => {
                                            if (selectedVariation?.id) {
                                                router.post(route('cart.add', selectedVariation.id));
                                            }
                                        }}
                                        size='sm'
                                        disabled={!selectedVariation || selectedVariation.stock === 0}
                                        color="green"
                                    >
                                        Adicionar ao carrinho
                                    </Button>
                                </Stack>
                            </Card>
                        </Grid.Col>
                    );
                })}
            </Grid>
        </DefaultLayout>
    );
}
