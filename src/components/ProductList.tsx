import ProductCard from "./ProductCard";

interface ProductListProps {
    products: {
        id: number;
        image: string;
        title: string;
        price: number;
        rating: { rate: number };
    }[];
}

const ProductList = ({ products }: ProductListProps) => {
    return (
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
};

export default ProductList;
