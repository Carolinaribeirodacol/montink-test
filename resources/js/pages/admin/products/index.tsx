import { router, usePage } from '@inertiajs/react';
import { Button, Container, Group, Modal, Table, Text, Title } from '@mantine/core';
import { useState } from 'react';

type Product = {
    id: number;
    name: string;
    description: string;
    price: number;
};

export default function Products() {
    const { products } = usePage().props as unknown as { products: Product[] };
    const [deleteModalOpened, setDeleteModalOpened] = useState(false);
    const [productToDelete, setProductToDelete] = useState<Product | null>(null);

    function openDeleteModal(product: Product) {
        setProductToDelete(product);
        setDeleteModalOpened(true);
    }

    function closeDeleteModal() {
        setDeleteModalOpened(false);
        setProductToDelete(null);
    }

    function confirmDelete() {
        if (productToDelete) {
            router.delete(route('admin.products.destroy', productToDelete.id), {
                onSuccess: () => closeDeleteModal(),
            });
        }
    }

    return (
        <Container size="md" py="xl">
            <Group mb="lg" justify="space-between">
                <Title order={2}>Produtos</Title>
                <Button onClick={() => router.visit(route('admin.products.create'))} color="green">
                    Criar Produto
                </Button>
            </Group>

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
                                    <Button
                                        size="xs"
                                        variant="outline"
                                        color="blue"
                                        onClick={() => router.visit(route('admin.products.show', product.id))}
                                    >
                                        Visualizar
                                    </Button>
                                    <Button
                                        size="xs"
                                        variant="outline"
                                        color="yellow"
                                        onClick={() => router.visit(route('admin.products.edit', product.id))}
                                    >
                                        Editar
                                    </Button>
                                    <Button size="xs" variant="outline" color="red" onClick={() => openDeleteModal(product)}>
                                        Excluir
                                    </Button>
                                </Group>
                            </Table.Td>
                        </Table.Tr>
                    ))}
                </tbody>
            </Table>

            <Modal opened={deleteModalOpened} onClose={closeDeleteModal} title="Confirmar exclusão" centered>
                <Text>
                    Tem certeza que deseja excluir o produto <strong>{productToDelete?.name}</strong>?
                </Text>

                <Group p="right" mt="md">
                    <Button variant="default" onClick={closeDeleteModal}>
                        Cancelar
                    </Button>

                    <Button color="red" onClick={confirmDelete}>
                        Excluir
                    </Button>
                </Group>
            </Modal>
        </Container>
    );
}
