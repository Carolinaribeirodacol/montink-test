import DefaultLayout from '@/layouts/DefaultLayout';
import { router, usePage } from '@inertiajs/react';
import { Button, Group, Modal, Table, Text, Title } from '@mantine/core';
import { useState } from 'react';

type Coupon = {
    id: number;
    code: string;
    discount: number;
    min_total: number;
    expires_at: string;
};

export default function Coupons() {
    const { coupons } = usePage().props as unknown as { coupons: Coupon[] };
    const [deleteModalOpened, setDeleteModalOpened] = useState(false);
    const [couponToDelete, setCouponToDelete] = useState<Coupon | null>(null);

    function openDeleteModal(coupon: Coupon) {
        setCouponToDelete(coupon);
        setDeleteModalOpened(true);
    }

    function closeDeleteModal() {
        setDeleteModalOpened(false);
        setCouponToDelete(null);
    }

    function confirmDelete() {
        if (couponToDelete) {
            router.delete(route('admin.coupons.destroy', couponToDelete.id), {
                onSuccess: () => closeDeleteModal(),
            });
        }
    }

    return (
        <DefaultLayout>
            <Group mb="lg" justify="space-between">
                <Title order={2}>Cupons</Title>
                <Button onClick={() => router.visit(route('admin.coupons.create'))} color="green">
                    Criar Cupom
                </Button>
            </Group>

            <Table highlightOnHover>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>Código</Table.Th>
                        <Table.Th>Desconto</Table.Th>
                        <Table.Th>Valor mínimo exigido</Table.Th>
                        <Table.Th>Expira em</Table.Th>
                    </Table.Tr>
                </Table.Thead>

                <tbody>
                    {coupons.map((coupon) => (
                        <Table.Tr key={coupon.id}>
                            <Table.Td>
                                <Text>{coupon.code}</Text>
                            </Table.Td>
                            <Table.Td>R$ {coupon.discount}</Table.Td>
                            <Table.Td>R$ {coupon.min_total}</Table.Td>
                            <Table.Td>{coupon.expires_at}</Table.Td>
                            <Table.Td>
                                <Group gap="xs">
                                    <Button
                                        size="xs"
                                        variant="outline"
                                        color="blue"
                                        onClick={() => router.visit(route('admin.coupons.show', coupon.id))}
                                    >
                                        Visualizar
                                    </Button>
                                    <Button
                                        size="xs"
                                        variant="outline"
                                        color="yellow"
                                        onClick={() => router.visit(route('admin.coupons.edit', coupon.id))}
                                    >
                                        Editar
                                    </Button>
                                    <Button size="xs" variant="outline" color="red" onClick={() => openDeleteModal(coupon)}>
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
                    Tem certeza que deseja excluir o cupom <strong>{couponToDelete?.code}</strong>?
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
        </DefaultLayout>
    );
}
