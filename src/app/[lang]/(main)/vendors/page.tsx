import { VendorGrid } from '@components/themes/default';

export default function VendorsPage() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Our Vendors
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Discover trusted vendors and their amazing products
        </p>
      </div>

      <VendorGrid />
    </div>
  );
}