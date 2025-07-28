import { DoubleHeader } from '@/components/DoubleHeader';
import { Container } from '@mantine/core';
import { ReactNode } from 'react';

export default function DefaultLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <Container>
                <DoubleHeader />
            </Container>
            <Container py="xl">{children}</Container>
        </>
    );
}
