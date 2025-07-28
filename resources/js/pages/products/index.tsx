import DefaultLayout from '@/layouts/DefaultLayout';
import { formatCurrency } from '@/lib/formatCurrency';
import { router, usePage } from '@inertiajs/react';
import { Box, Card, Grid, Image, Space, Stack, Text, Title } from '@mantine/core';

type Product = {
    id: number;
    name: string;
    description: string;
    price: number;
    image?: string | null;
};

export default function Products() {
    const { products } = usePage().props as unknown as { products: Product[] };

    return (
        <DefaultLayout>
            <Box maw={800} mx="auto" p="md">
                <Title order={2}>Produtos</Title>

                <Space h="lg" />

                <Grid>
                    {products.length === 0 && <h1>Sem produtos disponíveis.</h1>}

                    {products.map((product) => (
                        <Grid.Col span={{ base: 12, sm: 6 }} key={product.id}>
                            <Card
                                shadow="sm"
                                padding="md"
                                radius="md"
                                withBorder
                                onClick={() => router.visit(route('products.show', product.id))}
                                style={{ cursor: 'pointer' }}
                            >
                                <Stack gap="sm">
                                    {product.image && <Image src={product.image} alt={product.name} height={300} radius="sm" />}

                                    <Text fw={600} size="md" lineClamp={1}>
                                        {product.name}
                                    </Text>

                                    <Text size="sm" c="dimmed" lineClamp={1}>
                                        {product.description}
                                    </Text>

                                    <Text size="xl" fw={700}>
                                        {formatCurrency(product.price)}
                                    </Text>
                                </Stack>
                            </Card>
                        </Grid.Col>
                    ))}
                </Grid>
            </Box>
        </DefaultLayout>
    );
}
