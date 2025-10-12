import Container from '@components/core/container';
import { ProductGrid, ProductFilters } from '@components/themes/default';

export default function ProductsPage() {
  return (
    <Container>
      <div className="my-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          All Products
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Discover amazing products from our trusted vendors
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <ProductFilters />
        </div>

        {/* Products Grid */}
        <div className="lg:col-span-3">
          <ProductGrid />
        </div>
      </div>
    </Container>
  );
}