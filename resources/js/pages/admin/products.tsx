import { usePage } from '@inertiajs/react';
import { Button, Container, Group, Table, Text, Title } from '@mantine/core';

type Product = {
    id: number;
    name: string;
    description: string;
    price: number;
};

export default function Products() {
    const { products } = usePage().props as unknown as { products: Product[] };

    return (
        <Container size="md" py="xl">
            <Title order={2} mb="lg">
                Produtos
            </Title>

            <Table highlightOnHover>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>Nome</Table.Th>
                        <Table.Th>Descrição</Table.Th>
                        <Table.Th>Preço</Table.Th>
                        <Table.Th>Ações</Table.Th>
                    </Table.Tr>
                </Table.Thead>

                <tbody>
                    {products.map((product) => (
                        <Table.Tr key={product.id}>
                            <Table.Td>
                                <Text>{product.name}</Text>
                            </Table.Td>
                            <Table.Td>
                                <Text size="sm" c="dimmed">
                                    {product.description}
                                </Text>
                            </Table.Td>
                            <Table.Td>R$ {product.price}</Table.Td>
                            <Table.Td>
                                <Group gap="xs">
                                    <Button size="xs" variant="outline" color="blue">
                                        Visualizar
                                    </Button>
                                    <Button size="xs" variant="outline" color="yellow">
                                        Editar
                                    </Button>
                                    <Button size="xs" variant="outline" color="red">
                                        Excluir
                                    </Button>
                                </Group>
                            </Table.Td>
                        </Table.Tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
}
