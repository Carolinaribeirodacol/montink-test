import { ReactNode } from 'react';
import { DoubleHeader } from '@/components/DoubleHeader';
import { Container } from '@mantine/core';

export default function DefaultLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <DoubleHeader />
      <Container py="xl">{children}</Container>
    </>
  );
}
