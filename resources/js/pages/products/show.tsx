import DefaultLayout from '@/layouts/DefaultLayout';
import { formatCurrency } from '@/lib/formatCurrency';
import { router, usePage } from '@inertiajs/react';
import { Carousel } from '@mantine/carousel';
import { Box, Button, Grid, Group, Image, Select, Space, Stack, Text, Title } from '@mantine/core';
import { IconShoppingCart } from '@tabler/icons-react';
import { useState } from 'react';

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  variations: Variation[];
  images?: string[];
};

type Variation = {
  id: number;
  size: string;
  color: string;
  price: number;
  stock: number;
};

export default function ProductShow() {
  const { product } = usePage().props as unknown as { product: Product };

  const colors = [...new Set(product.variations.map((variation) => variation.color))];
  const sizes = [...new Set(product.variations.map((variation) => variation.size))];

  const [selectedColor, setSelectedColor] = useState(colors[0] ?? '');
  const [selectedSize, setSelectedSize] = useState(sizes[0] ?? '');

  const selectedVariation = product.variations.find(
    (variation) => variation.color === selectedColor && variation.size === selectedSize
  );

  const handleAddToCart = () => {
    if (selectedVariation?.id) {
      router.post(route('cart.add', selectedVariation.id));
    }
  };

  const handleBuyNow = () => {
    if (selectedVariation?.id) {
      router.post(route('cart.add', selectedVariation.id));
      router.visit(route('cart.index'));
    }
  };

  return (
    <DefaultLayout>
      {product && (
        <Box maw={900} mx="auto" p="md">
          <Title order={2}>{product.name}</Title>
          <Space h="lg" />

          <Grid>
            <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
              {product.images && product.images.length > 0 && (
                <Carousel
                  withIndicators
                  height={300}
                  slideSize="100%"
                  slideGap="md"
                  maw={400}
                  mx="auto"
                >
                  {product.images.map((img, index) => (
                    <Carousel.Slide key={index}>
                      <Image src={img} alt={`${product.name} imagem ${index + 1}`} height="full" width="full" radius="sm" />
                    </Carousel.Slide>
                  ))}
                </Carousel>
              )}
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
              <Stack gap="sm">
                <Select
                  label="Selecione uma cor:"
                  data={colors}
                  value={selectedColor}
                  onChange={(value) => setSelectedColor(value || '')}
                />

                <Group gap="xs">
                  {sizes.map((size) => (
                    <Button
                      key={size}
                      variant={selectedSize === size ? 'filled' : 'outline'}
                      radius="xl"
                      size="compact-md"
                      onClick={() => setSelectedSize(size)}
                      color="black"
                    >
                      {size}
                    </Button>
                  ))}
                </Group>

                {selectedVariation && (
                  <Text size="lg" fw={700}>
                    Preço: {formatCurrency(selectedVariation.price ? selectedVariation.price : 0)}
                    {selectedVariation.stock === 0 && '(Sem estoque)'}
                  </Text>
                )}

                <Group>
                  <Button
                    rightSection={<IconShoppingCart />}
                    onClick={handleAddToCart}
                    disabled={!selectedVariation || selectedVariation.stock === 0}
                    variant="outline"
                    color="green"
                  >
                    Adicionar ao carrinho
                  </Button>

                  <Button
                    onClick={handleBuyNow}
                    disabled={!selectedVariation || selectedVariation.stock === 0}
                    color="green"
                  >
                    Comprar agora
                  </Button>
                </Group>
              </Stack>
            </Grid.Col>
          </Grid>

          <Box mt="xl">
            <Text size="lg" fw={600}>
              Descrição:
            </Text>
            <Text size="md">{product.description}</Text>
          </Box>
        </Box>
      )}
    </DefaultLayout>
  );
}
