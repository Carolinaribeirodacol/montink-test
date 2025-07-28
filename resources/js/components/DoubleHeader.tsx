import { usePage } from '@inertiajs/react';
import { Anchor, Box, Burger, Container, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import classes from './DoubleHeader.module.css';

export function DoubleHeader() {
    const [opened, { toggle }] = useDisclosure(false);
    const [active, setActive] = useState(0);

    const { auth, cartCount } = usePage().props as unknown as {
        auth: { user: { is_admin: boolean } };
        cartCount: number;
    };

    const mainLinks = [
        { link: '/products', label: 'Produtos' },
        { link: '/cart', label: `Carrinho (${cartCount || 0})` },
    ];

    if (auth?.user?.is_admin) {
        mainLinks.push({ link: '/admin/products', label: 'Gerenciar Produtos' }, { link: '/admin/coupons', label: 'Cupons' });
    }

    const mainItems = mainLinks.map((item, index) => (
        <Anchor<'a'>
            href={item.link}
            key={item.label}
            className={classes.mainLink}
            data-active={index === active || undefined}
            onClick={(event) => {
                event.preventDefault();
                setActive(index);
                window.location.href = item.link;
            }}
        >
            {item.label}
        </Anchor>
    ));

    return (
        <header className={classes.header}>
            <Container className={classes.inner}>
                <Box className={classes.links} visibleFrom="sm">
                    <Group gap={0} justify="flex-end" className={classes.mainLinks}>
                        {mainItems}
                    </Group>
                </Box>

                <Burger opened={opened} onClick={toggle} className={classes.burger} size="sm" hiddenFrom="sm" />
            </Container>
        </header>
    );
}
