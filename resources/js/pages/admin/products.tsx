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
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Descrição</th>
                        <th>Preço</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>
                                <Text>{product.name}</Text>
                            </td>
                            <td>
                                <Text size="sm" color="dimmed">
                                    {product.description}
                                </Text>
                            </td>
                            <td>R$ {product.price}</td>
                            <td>
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
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
}
