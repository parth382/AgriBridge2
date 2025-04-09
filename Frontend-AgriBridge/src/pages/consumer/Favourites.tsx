import React, { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { 
  HeartIcon, 
  ShoppingCartIcon, 
  TrashIcon 
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  image: string;
  farmer: {
    id: string;
    name: string;
    rating: number;
  };
  category: string;
  isFavorite: boolean;
}

const initialProducts: Product[] = [
  {
    id: '1',
    name: 'Organic Tomatoes',
    description: 'Fresh, ripe tomatoes grown without pesticides. Perfect for salads and cooking.',
    price: 3.99,
    unit: 'lb',
    image: 'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    farmer: {
      id: 'f1',
      name: 'Green Valley Farms',
      rating: 4.8
    },
    category: 'Vegetables',
    isFavorite: true
  },
  {
    id: '4',
    name: 'Organic Potatoes',
    description: 'Versatile potatoes perfect for roasting, mashing, or frying.',
    price: 4.99,
    unit: '5lb bag',
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    farmer: {
      id: 'f3',
      name: 'Root Cellar Farm',
      rating: 4.7
    },
    category: 'Vegetables',
    isFavorite: true
  }
];

export default function ConsumerFavourites() {
  const [favoriteProducts, setFavoriteProducts] = useState(initialProducts);

  const removeFavorite = (productId: string) => {
    setFavoriteProducts(favoriteProducts.filter(product => product.id !== productId));
  };

  const addToCart = (productId: string) => {
    // This would be connected to a cart context or Redux store
    console.log(`Adding product ${productId} to cart`);
  };

  return (
    <DashboardLayout>
      <div className="py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-2xl font-semibold text-gray-900">Favourites</h1>
              <p className="mt-2 text-sm text-gray-700">
                Your saved products from local farmers.
              </p>
            </div>
          </div>

          {/* Favourites Grid */}
          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {favoriteProducts.map((product) => (
              <div key={product.id} className="group relative">
                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                  />
                  <button
                    type="button"
                    className="absolute top-2 right-2 rounded-full bg-white p-1 text-red-500 hover:text-red-600 focus:outline-none"
                    onClick={() => removeFavorite(product.id)}
                  >
                    <TrashIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <a href="#">
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.name}
                      </a>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{product.farmer.name}</p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">${product.price}/{product.unit}</p>
                </div>
                <div className="mt-2 flex items-center">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.farmer.rating)
                            ? 'text-yellow-400'
                            : 'text-gray-200'
                        }`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="ml-1 text-xs text-gray-500">({product.farmer.rating})</span>
                  </div>
                </div>
                <div className="mt-4">
                  <button
                    type="button"
                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                    onClick={() => addToCart(product.id)}
                  >
                    <ShoppingCartIcon className="mr-2 h-5 w-5" aria-hidden="true" />
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {favoriteProducts.length === 0 && (
            <div className="mt-8 text-center">
              <HeartIcon className="mx-auto h-12 w-12 text-gray-400" aria-hidden="true" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No favourites yet</h3>
              <p className="mt-1 text-sm text-gray-500">
                Start adding products to your favourites to see them here.
              </p>
              <div className="mt-6">
                <a
                  href="/consumer/products"
                  className="inline-flex items-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                  Browse Products
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
} 