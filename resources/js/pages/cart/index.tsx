import DefaultLayout from '@/layouts/DefaultLayout';
import { formatCurrency } from '@/lib/formatCurrency';
import { Head, Link } from '@inertiajs/react';
import { Box, Button, Card, Group, Image, Stack, Text, Title } from '@mantine/core';

interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image?: string;
}

interface CartPageProps {
    cart: Record<number, CartItem>;
}

export default function CartPage({ cart }: CartPageProps) {
    const items = Object.values(cart);
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <DefaultLayout>
            <Head title="Carrinho de Compras" />
            <Box maw={800} mx="auto" p="md">
                <Title order={2} mb="md">
                    Carrinho de Compras
                </Title>

                {items.length === 0 ? (
                    <Text>
                        Seu carrinho está vazio. <Link href="/products">Ver produtos</Link>
                    </Text>
                ) : (
                    <Stack>
                        {items.map((item) => (
                            <Card key={item.id} shadow="sm" padding="md" radius="md" withBorder>
                                <Group align="center">
                                    {item.image && <Image src={item.image} alt={item.name} width={80} height={80} fit="cover" radius="md" />}

                                    <Box style={{ flex: 1 }}>
                                        <Text fw={500} size="lg">
                                            {item.name}
                                        </Text>
                                        <Text size="sm" c="dimmed">
                                            Preço unitário: {formatCurrency(item.price)}
                                        </Text>
                                        <Text size="sm" c="dimmed">
                                            Quantidade: {item.quantity}
                                        </Text>
                                    </Box>

                                    <Text fw={600} c="blue">{formatCurrency(item.price * item.quantity)}</Text>
                                </Group>
                            </Card>
                        ))}

                        <Group justify="space-between" mt="lg">
                            <Text size="lg" fw={700}>
                                Total: {formatCurrency(total)}
                            </Text>
                            <Button color="green" size="md">
                                Finalizar Compra
                            </Button>
                        </Group>
                    </Stack>
                )}
            </Box>
        </DefaultLayout>
    );
}
