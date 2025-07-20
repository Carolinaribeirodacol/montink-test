import DefaultLayout from "@/layouts/DefaultLayout";
import { usePage } from "@inertiajs/react";

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
            <h1>{product.name}</h1>
        </DefaultLayout>
    );
}
