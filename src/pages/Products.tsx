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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-yellow-50 to-blue-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Smart Shopping
          </h1>
          <p className="text-xl text-gray-600">
            Discover products with AI-powered recommendations
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-6 shadow-xl mb-8"
        >
          <div className="grid md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
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
              className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
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
              className="fixed top-24 right-4 z-50 bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-6 rounded-2xl shadow-2xl max-w-sm"
            >
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-3">
                  <Eye className="w-4 h-4 text-yellow-500" />
                </div>
                <h3 className="font-bold">Smart Recommendations</h3>
              </div>
              <p className="mb-4">Since you added milk, you might also like:</p>
              <div className="space-y-2">
                {recommendations.map(rec => {
                  const product = products.find(p => p.id === rec.id);
                  return product ? (
                    <div key={rec.id} className="flex items-center justify-between bg-white/20 rounded-lg p-2">
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm opacity-90">{rec.reason}</p>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => addToCart(rec.id)}
                        className="p-2 bg-white text-yellow-500 rounded-lg"
                      >
                        <Plus className="w-4 h-4" />
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
                className="bg-white rounded-2xl shadow-xl overflow-hidden group"
              >
                {/* Product Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Wishlist Button */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-lg"
                  >
                    <Heart 
                      className={`w-5 h-5 ${
                        wishlist.includes(product.id) 
                          ? 'text-red-500 fill-current' 
                          : 'text-gray-400'
                      }`} 
                    />
                  </motion.button>

                  {/* Sale Badge */}
                  {product.originalPrice && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                      SALE
                    </div>
                  )}

                  {/* Cart Count Badge */}
                  {getCartCount(product.id) > 0 && (
                    <div className="absolute bottom-3 right-3 bg-blue-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">
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
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500 ml-2">
                      ({product.reviews})
                    </span>
                  </div>

                  <h3 className="font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                    {product.name}
                  </h3>
                  
                  <p className="text-sm text-gray-600 mb-3">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl font-bold text-gray-800">
                        ${product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => addToCart(product.id)}
                      className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-yellow-500 text-white rounded-full hover:shadow-lg transition-all"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      <span className="font-medium">Add</span>
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
            className="fixed bottom-4 right-4 bg-gradient-to-r from-blue-600 to-yellow-500 text-white p-4 rounded-2xl shadow-2xl"
          >
            <div className="flex items-center space-x-3">
              <ShoppingCart className="w-6 h-6" />
              <div>
                <p className="font-bold">{cart.length} items in cart</p>
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
                className="px-4 py-2 bg-white text-blue-600 rounded-full font-bold ml-4"
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