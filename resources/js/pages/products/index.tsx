import DefaultLayout from '@/layouts/DefaultLayout';
import { router, usePage } from '@inertiajs/react';
import { Badge, Card, Grid, Group, Space, Stack, Text, Title } from '@mantine/core';

type Product = {
    id: number;
    name: string;
    description: string;
    price: number;
    variations: {
        id?: number;
        size: string;
        color: string;
        price: number;
        stock?: { quantity: number };
    }[];
};

type Variation = {
    id?: number;
    size: string;
    color: string;
    price: number;
    stock?: { quantity: number };
};

export default function Products() {
    const { products } = usePage().props as unknown as { products: Product[] };

    return (
        <DefaultLayout>
            <Title order={2}>Produtos</Title>

            <Space h="lg" />

            <Grid>
                {products.length === 0 && <h1>Sem projetos disponíveis.</h1>}

                {products && products.map((product: Product) => (
                    <Grid.Col span={{ base: 12, sm: 6 }} key={product.id}>
                        <Card
                            shadow="sm"
                            padding="md"
                            radius="md"
                            withBorder
                            component="a"
                            onClick={() => router.visit(route('products.show', product.id))}
                            style={{
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                cursor: 'pointer',
                            }}
                        >
                            {/* <Card.Section>
                                <AspectRatio ratio={16 / 9}>
                                    <Image
                                        src={project.image_url}
                                        fallbackSrc="https://placehold.co/600x400?text=Placeholder"
                                        fit="cover"
                                        alt={project.title}
                                    />
                                </AspectRatio>
                            </Card.Section> */}

                            <Stack justify="space-between" gap="xs" mt="md" style={{ flex: 1 }}>
                                <Group justify="space-between" wrap="nowrap">
                                    <Text fw={600} size="md" truncate="end">
                                        {product.name}
                                    </Text>

                                    {product.variations && product.variations.map((variation: Variation) => (
                                        <Badge color="blue" variant="light">
                                            {variation.size}
                                        </Badge>
                                    ))}
                                </Group>

                                <Text size="sm" c="dimmed" lineClamp={3}>
                                    {product.description}
                                </Text>
                            </Stack>
                        </Card>
                    </Grid.Col>
                ))}
            </Grid>
        </DefaultLayout>
    );
}
