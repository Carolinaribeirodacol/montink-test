import DefaultLayout from '@/layouts/DefaultLayout';
import { usePage } from '@inertiajs/react';
import { Badge, Divider, Table, Text, Title } from '@mantine/core';

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

export default function ProductShow() {
    const { product } = usePage().props as unknown as { product: Product };

    return (
        <DefaultLayout>
            <Title order={2} mb="xs">
                {product.name}
            </Title>

            <Text size="sm" c="dimmed" mb="sm">
                {product.description || 'Sem descrição'}
            </Text>

            <Text fw={700} size="lg" mb="lg">
                Preço base: R$ {product.price}
            </Text>

            <Divider my="md" label="Variações" />

            {product.variations && product.variations.length > 0 ? (
                <Table striped highlightOnHover withTableBorder>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Tamanho</Table.Th>
                            <Table.Th>Cor</Table.Th>
                            <Table.Th>Preço</Table.Th>
                            <Table.Th>Estoque</Table.Th>
                        </Table.Tr>
                    </Table.Thead>

                    <Table.Tbody>
                        {product.variations.map((variation, index) => (
                            <Table.Tr key={index}>
                                <Table.Td>
                                    <Badge>{variation.size}</Badge>
                                </Table.Td>

                                <Table.Td>
                                    <Badge color="blue">{variation.color}</Badge>
                                </Table.Td>

                                <Table.Td>R$ {variation.price}</Table.Td>

                                <Table.Td>{variation.stock?.quantity ?? 0} unidades</Table.Td>
                            </Table.Tr>
                        ))}
                    </Table.Tbody>
                </Table>
            ) : (
                <Text c="dimmed">Nenhuma variação cadastrada.</Text>
            )}
        </DefaultLayout>
    );
}
