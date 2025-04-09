import React, { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { 
  HeartIcon, 
  ShoppingCartIcon, 
  FunnelIcon , 
  XMarkIcon 
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

const products: Product[] = [
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
    id: '2',
    name: 'Fresh Basil',
    description: 'Aromatic basil leaves, perfect for Italian dishes and garnishing.',
    price: 2.49,
    unit: 'bunch',
    image: 'https://images.unsplash.com/photo-1628557010296-39c5b5a1a8b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    farmer: {
      id: 'f1',
      name: 'Green Valley Farms',
      rating: 4.8
    },
    category: 'Herbs',
    isFavorite: false
  },
  {
    id: '3',
    name: 'Organic Carrots',
    description: 'Sweet, crunchy carrots grown in organic soil. Rich in vitamins and minerals.',
    price: 2.99,
    unit: 'lb',
    image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    farmer: {
      id: 'f2',
      name: 'Sunny Acres',
      rating: 4.6
    },
    category: 'Vegetables',
    isFavorite: false
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
  },
  {
    id: '5',
    name: 'Fresh Lettuce',
    description: 'Crisp, fresh lettuce heads. Perfect for salads and sandwiches.',
    price: 1.99,
    unit: 'head',
    image: 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    farmer: {
      id: 'f1',
      name: 'Green Valley Farms',
      rating: 4.8
    },
    category: 'Vegetables',
    isFavorite: false
  },
  {
    id: '6',
    name: 'Organic Apples',
    description: 'Sweet and juicy apples. Great for snacking or baking.',
    price: 5.99,
    unit: '3lb bag',
    image: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    farmer: {
      id: 'f4',
      name: 'Apple Orchard',
      rating: 4.9
    },
    category: 'Fruits',
    isFavorite: false
  },
  {
    id: '7',
    name: 'Fresh Eggs',
    description: 'Farm-fresh eggs from free-range chickens. Rich in flavor and nutrients.',
    price: 5.99,
    unit: 'dozen',
    image: 'https://images.unsplash.com/photo-1569288033719-78a52d3776a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    farmer: {
      id: 'f5',
      name: 'Happy Hen Farm',
      rating: 4.5
    },
    category: 'Dairy & Eggs',
    isFavorite: false
  },
  {
    id: '8',
    name: 'Organic Milk',
    description: 'Creamy, organic milk from grass-fed cows. No antibiotics or hormones.',
    price: 4.99,
    unit: 'gallon',
    image: 'https://images.unsplash.com/photo-1563636619-e9143da41bab?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    farmer: {
      id: 'f6',
      name: 'Dairy Delight',
      rating: 4.7
    },
    category: 'Dairy & Eggs',
    isFavorite: false
  }
];

const categories = [
  'All',
  'Vegetables',
  'Fruits',
  'Herbs',
  'Dairy & Eggs',
  'Meat',
  'Bakery'
];

export default function ConsumerProducts() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [productsList, setProductsList] = useState(products);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const toggleFavorite = (productId: string) => {
    setProductsList(productsList.map(product => 
      product.id === productId 
        ? { ...product, isFavorite: !product.isFavorite } 
        : product
    ));
  };

  const addToCart = (productId: string) => {
    // This would be connected to a cart context or Redux store
    console.log(`Adding product ${productId} to cart`);
  };

  const filteredProducts = productsList.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <DashboardLayout>
      <div className="py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-2xl font-semibold text-gray-900">Products</h1>
              <p className="mt-2 text-sm text-gray-700">
                Browse and purchase fresh produce from local farmers.
              </p>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="relative rounded-md shadow-sm sm:max-w-xs">
              <input
                type="text"
                name="search"
                id="search"
                className="block w-full rounded-md border-gray-300 pr-10 focus:border-green-500 focus:ring-green-500 sm:text-sm"
                placeholder="Search products..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <div className="mt-3 sm:mt-0 sm:ml-4">
              <button
                type="button"
                className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                onClick={() => setShowFilters(!showFilters)}
              >
                <FunnelIcon  className="mr-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                Filters
              </button>
            </div>
          </div>

          {/* Category Filters */}
          {showFilters && (
            <div className="mt-4 rounded-md bg-white p-4 shadow">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-900">Categories</h3>
                <button
                  type="button"
                  className="text-sm text-gray-500 hover:text-gray-700"
                  onClick={() => setShowFilters(false)}
                >
                  <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${
                      selectedCategory === category
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                    onClick={() => handleCategoryChange(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Products Grid */}
          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <div key={product.id} className="group relative">
                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                  />
                  <button
                    type="button"
                    className="absolute top-2 right-2 rounded-full bg-white p-1 text-gray-400 hover:text-red-500 focus:outline-none"
                    onClick={() => toggleFavorite(product.id)}
                  >
                    {product.isFavorite ? (
                      <HeartIconSolid className="h-5 w-5 text-red-500" aria-hidden="true" />
                    ) : (
                      <HeartIcon className="h-5 w-5" aria-hidden="true" />
                    )}
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
          {filteredProducts.length === 0 && (
            <div className="mt-8 text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No products found</h3>
              <p className="mt-1 text-sm text-gray-500">
                Try adjusting your search or filter to find what you're looking for.
              </p>
              <div className="mt-6">
                <button
                  type="button"
                  className="inline-flex items-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                  }}
                >
                  Clear Filters
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
} 