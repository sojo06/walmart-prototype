import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Headphones, Users, Mic, Package, Home, User, Bell, Search, Menu, X, Zap, Sparkles } from 'lucide-react';

const Header = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navItems = [
    { path: '/', icon: Home, label: 'Home', color: 'from-blue-500 to-blue-600' },
    { path: '/customer-service', icon: Headphones, label: 'Support', color: 'from-green-500 to-green-600' },
    { path: '/group-shopping', icon: Users, label: 'Group Shop', color: 'from-purple-500 to-purple-600' },
    { path: '/products', icon: ShoppingCart, label: 'Products', color: 'from-orange-500 to-orange-600' },
    { path: '/voice-assistant', icon: Mic, label: 'Voice', color: 'from-pink-500 to-pink-600' },
    { path: '/delivery-tracking', icon: Package, label: 'Tracking', color: 'from-indigo-500 to-indigo-600' },
  ];

  const userProfile = {
    name: 'Alex Johnson',
    email: 'alex@example.com',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    status: 'Premium Member'
  };

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-2xl border-b border-gray-100/50 shadow-xl"
    >
      {/* Decorative gradient line */}
      <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
      
      <div className="max-w-8xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          {/* Enhanced Logo */}
          <Link to="/" className="flex items-center space-x-4 group">
            <motion.div 
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.8, type: "spring" }}
              className="relative w-14 h-14 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl group-hover:shadow-blue-500/25"
            >
              <ShoppingCart className="text-white w-7 h-7" />
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center"
              >
                <Sparkles className="w-2 h-2 text-yellow-800" />
              </motion.div>
            </motion.div>
            <div className="hidden sm:block">
              <div className="flex items-center space-x-2">
                <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  SmartCart
                </span>
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-yellow-500"
                >
                  <Zap className="w-5 h-5" />
                </motion.div>
              </div>
              <p className="text-sm text-gray-500 font-medium -mt-1">AI Shopping Revolution</p>
            </div>
          </Link>

          {/* Enhanced Search Bar - Desktop */}
          <div className="hidden lg:flex flex-1 max-w-2xl mx-12">
            <div className="relative w-full group">
              <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-blue-500 transition-colors" />
              <input
                type="text"
                placeholder="Search products, orders, or ask AI assistant..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-14 pr-6 py-4 bg-gray-50/80 border-2 border-gray-200/50 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-700 placeholder-gray-400 backdrop-blur-sm hover:bg-white/80"
              />
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all cursor-pointer"
              >
                <Search className="w-4 h-4" />
              </motion.div>
            </div>
          </div>

          {/* Enhanced Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link key={item.path} to={item.path}>
                  <motion.div 
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative flex items-center space-x-3 px-5 py-3 rounded-2xl transition-all group ${
                      isActive 
                        ? `bg-gradient-to-r ${item.color} text-white shadow-lg shadow-blue-600/25` 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-semibold text-sm">{item.label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl -z-10"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </motion.div>
                </Link>
              );
            })}
          </nav>

          {/* Enhanced Profile & Notifications */}
          <div className="hidden lg:flex items-center space-x-4 ml-8">
            {/* Enhanced Notifications */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
              className="relative p-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-2xl transition-all group"
            >
              <Bell className="w-6 h-6" />
              <motion.span 
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center"
              >
                <span className="text-white text-xs font-bold">3</span>
              </motion.span>
            </motion.button>

            {/* Enhanced Profile Dropdown */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-3 p-2 rounded-2xl hover:bg-gray-50 transition-all group"
              >
                <div className="relative">
                  <img
                    src={userProfile.avatar}
                    alt={userProfile.name}
                    className="w-12 h-12 rounded-2xl object-cover border-3 border-gray-200 group-hover:border-blue-300 transition-all"
                  />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <div className="text-left hidden xl:block">
                  <p className="text-sm font-bold text-gray-900">{userProfile.name}</p>
                  <p className="text-xs text-blue-600 font-medium">{userProfile.status}</p>
                </div>
              </motion.button>

              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 top-full mt-3 w-80 bg-white rounded-3xl shadow-2xl border border-gray-100 py-4 backdrop-blur-xl"
                  >
                    <div className="px-6 py-4 border-b border-gray-100">
                      <div className="flex items-center space-x-4">
                        <img
                          src={userProfile.avatar}
                          alt={userProfile.name}
                          className="w-16 h-16 rounded-2xl object-cover border-2 border-blue-200"
                        />
                        <div>
                          <p className="font-bold text-gray-900 text-lg">{userProfile.name}</p>
                          <p className="text-sm text-gray-500">{userProfile.email}</p>
                          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full mt-1">
                            {userProfile.status}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="py-2">
                      {['View Profile', 'Account Settings', 'Order History', 'Preferences'].map((item) => (
                        <motion.button
                          key={item}
                          whileHover={{ x: 4, backgroundColor: '#f8fafc' }}
                          className="w-full px-6 py-3 text-left text-sm text-gray-700 hover:text-gray-900 transition-all"
                        >
                          {item}
                        </motion.button>
                      ))}
                      <hr className="my-2 border-gray-100" />
                      <motion.button
                        whileHover={{ x: 4, backgroundColor: '#fef2f2' }}
                        className="w-full px-6 py-3 text-left text-sm text-red-600 hover:text-red-700 transition-all"
                      >
                        Sign Out
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Enhanced Mobile Menu Button */}
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-3 rounded-2xl bg-gray-50 text-gray-600 hover:bg-gray-100 transition-all"
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Enhanced Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden py-6 border-t border-gray-100"
            >
              {/* Mobile Search */}
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Mobile Navigation */}
              <nav className="space-y-2 mb-6">
                {navItems.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  
                  return (
                    <Link key={item.path} to={item.path} onClick={() => setIsMenuOpen(false)}>
                      <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ x: 4 }}
                        className={`flex items-center space-x-4 px-4 py-4 rounded-2xl transition-all ${
                          isActive 
                            ? `bg-gradient-to-r ${item.color} text-white` 
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        <Icon className="w-6 h-6" />
                        <span className="font-semibold">{item.label}</span>
                      </motion.div>
                    </Link>
                  );
                })}
              </nav>

              {/* Mobile Profile */}
              <div className="pt-6 border-t border-gray-100">
                <div className="flex items-center space-x-4 px-4 py-4 bg-gray-50 rounded-2xl">
                  <img
                    src={userProfile.avatar}
                    alt={userProfile.name}
                    className="w-12 h-12 rounded-2xl object-cover"
                  />
                  <div>
                    <p className="font-bold text-gray-900">{userProfile.name}</p>
                    <p className="text-sm text-gray-500">{userProfile.email}</p>
                    <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full mt-1">
                      {userProfile.status}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;