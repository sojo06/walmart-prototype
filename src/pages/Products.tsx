import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, ShoppingCart, Heart, Star, Plus, Eye } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  description: string;
}

const Products = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [cart, setCart] = useState<string[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [showRecommendations, setShowRecommendations] = useState(false);

  const categories = ['all', 'dairy', 'bakery', 'fruits', 'snacks', 'beverages'];

  const products: Product[] = [
    {
      id: '1',
      name: 'Organic Whole Milk',
      price: 4.99,
      originalPrice: 5.99,
      image: 'https://images.pexels.com/photos/236010/pexels-photo-236010.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'dairy',
      rating: 4.8,
      reviews: 245,
      inStock: true,
      description: 'Fresh organic whole milk from grass-fed cows'
    },
    {
      id: '2',
      name: 'Honey Oat Cereal',
      price: 6.49,
      image: 'https://images.pexels.com/photos/1656663/pexels-photo-1656663.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'snacks',
      rating: 4.6,
      reviews: 189,
      inStock: true,
      description: 'Crunchy oat cereal with natural honey'
    },
    {
      id: '3',
      name: 'Artisan Sourdough Bread',
      price: 3.99,
      image: 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'bakery',
      rating: 4.9,
      reviews: 312,
      inStock: true,
      description: 'Freshly baked artisan sourdough bread'
    },
    {
      id: '4',
      name: 'Fresh Bananas',
      price: 2.99,
      image: 'https://images.pexels.com/photos/2872755/pexels-photo-2872755.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'fruits',
      rating: 4.7,
      reviews: 156,
      inStock: true,
      description: 'Sweet and ripe organic bananas'
    },
    {
      id: '5',
      name: 'Greek Yogurt',
      price: 5.99,
      image: 'https://images.pexels.com/photos/1904403/pexels-photo-1904403.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'dairy',
      rating: 4.8,
      reviews: 203,
      inStock: true,
      description: 'Creamy Greek yogurt with live cultures'
    },
    {
      id: '6',
      name: 'Sparkling Water',
      price: 1.99,
      originalPrice: 2.49,
      image: 'https://images.pexels.com/photos/327090/pexels-photo-327090.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'beverages',
      rating: 4.5,
      reviews: 89,
      inStock: true,
      description: 'Refreshing sparkling water with natural flavors'
    }
  ];

  const recommendations = [
    { id: '2', reason: 'Perfect with milk!' },
    { id: '5', reason: 'Great breakfast combo!' },
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (productId: string) => {
    setCart([...cart, productId]);
    
    // Show recommendations when milk is added
    if (productId === '1') {
      setShowRecommendations(true);
      setTimeout(() => setShowRecommendations(false), 5000);
    }
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const getCartCount = (productId: string) => {
    return cart.filter(id => id === productId).length;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Smart Shopping
          </h1>
          <p className="text-lg text-gray-600">
            Discover products with AI-powered recommendations
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8"
        >
          <div className="grid md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
              >
                <option value="all">All Categories</option>
                {categories.slice(1).map(category => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </motion.div>

        {/* Recommendations Popup */}
        <AnimatePresence>
          {showRecommendations && (
            <motion.div
              initial={{ opacity: 0, y: -50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.9 }}
              className="fixed top-20 right-4 z-50 bg-blue-600 text-white p-4 rounded-xl shadow-lg max-w-sm border border-blue-500"
            >
              <div className="flex items-center mb-3">
                <div className="w-6 h-6 bg-white rounded-lg flex items-center justify-center mr-3">
                  <Eye className="w-3 h-3 text-blue-600" />
                </div>
                <h3 className="text-sm font-semibold">Smart Recommendations</h3>
              </div>
              <p className="text-sm mb-3">Since you added milk, you might also like:</p>
              <div className="space-y-2">
                {recommendations.map(rec => {
                  const product = products.find(p => p.id === rec.id);
                  return product ? (
                    <div key={rec.id} className="flex items-center justify-between bg-white/10 rounded-lg p-2">
                      <div>
                        <p className="text-sm font-medium">{product.name}</p>
                        <p className="text-xs opacity-90">{rec.reason}</p>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => addToCart(rec.id)}
                        className="p-1 bg-white text-blue-600 rounded-lg"
                      >
                        <Plus className="w-3 h-3" />
                      </motion.button>
                    </div>
                  ) : null;
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-sm hover:shadow-md overflow-hidden group border border-gray-100 transition-all"
              >
                {/* Product Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Wishlist Button */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-2 right-2 p-1.5 bg-white rounded-lg shadow-sm"
                  >
                    <Heart 
                      className={`w-4 h-4 ${
                        wishlist.includes(product.id) 
                          ? 'text-red-500 fill-current' 
                          : 'text-gray-400'
                      }`} 
                    />
                  </motion.button>

                  {/* Sale Badge */}
                  {product.originalPrice && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-medium">
                      SALE
                    </div>
                  )}

                  {/* Cart Count Badge */}
                  {getCartCount(product.id) > 0 && (
                    <div className="absolute bottom-2 right-2 bg-blue-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs font-medium">
                      {getCartCount(product.id)}
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <div className="flex items-center mb-2">
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < Math.floor(product.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500 ml-2">
                      ({product.reviews})
                    </span>
                  </div>

                  <h3 className="text-sm font-semibold text-gray-900 mb-2">
                    {product.name}
                  </h3>
                  
                  <p className="text-xs text-gray-600 mb-3">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-semibold text-gray-900">
                        ${product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs text-gray-500 line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => addToCart(product.id)}
                      className="flex items-center space-x-1 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all text-sm"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      <span>Add</span>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Cart Summary */}
        {cart.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-4 right-4 bg-blue-600 text-white p-4 rounded-xl shadow-lg border border-blue-500"
          >
            <div className="flex items-center space-x-3">
              <ShoppingCart className="w-5 h-5" />
              <div>
                <p className="text-sm font-semibold">{cart.length} items in cart</p>
                <p className="text-sm opacity-90">
                  Total: ${cart.reduce((total, id) => {
                    const product = products.find(p => p.id === id);
                    return total + (product?.price || 0);
                  }, 0).toFixed(2)}
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-white text-blue-600 rounded-lg text-sm font-medium ml-4"
              >
                Checkout
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Products;