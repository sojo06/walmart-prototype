import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bot, Users, Mic, Package, ShoppingCart, Sparkles } from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: Bot,
      title: 'AI Customer Service',
      description: 'Chat or call our intelligent AI bot for instant support and step-by-step guidance',
      link: '/customer-service',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      icon: Users,
      title: 'Group Shopping',
      description: 'Create shared carts with friends and family for collaborative shopping experiences',
      link: '/group-shopping',
      gradient: 'from-yellow-500 to-yellow-600'
    },
    {
      icon: Mic,
      title: 'Voice Assistant',
      description: 'Use voice commands for smart checkout and hands-free shopping navigation',
      link: '/voice-assistant',
      gradient: 'from-purple-500 to-purple-600'
    },
    {
      icon: Package,
      title: 'Smart Tracking',
      description: 'Track your deliveries in real-time with voice-activated status updates',
      link: '/delivery-tracking',
      gradient: 'from-green-500 to-green-600'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.h1 
              className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-yellow-500 bg-clip-text text-transparent"
              animate={{ 
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                ease: 'linear' 
              }}
            >
              SmartCart
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto"
            >
              Experience the future of shopping with AI-powered assistance, group collaboration, and voice-controlled features
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link to="/products">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-blue-500 to-yellow-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all"
                >
                  Start Shopping
                </motion.button>
              </Link>
              <Link to="/customer-service">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-full shadow-lg hover:shadow-xl border-2 border-blue-200 transition-all"
                >
                  Try AI Assistant
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Floating Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div 
              animate={{ 
                y: [0, -20, 0],
                rotate: [0, 10, 0]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: 'easeInOut' 
              }}
              className="absolute top-20 left-10 w-20 h-20 bg-yellow-400 rounded-full opacity-20"
            />
            <motion.div 
              animate={{ 
                y: [0, 30, 0],
                rotate: [0, -15, 0]
              }}
              transition={{ 
                duration: 5, 
                repeat: Infinity, 
                ease: 'easeInOut',
                delay: 1
              }}
              className="absolute top-40 right-20 w-16 h-16 bg-blue-500 rounded-full opacity-20"
            />
            <motion.div 
              animate={{ 
                y: [0, -25, 0],
                x: [0, 10, 0]
              }}
              transition={{ 
                duration: 6, 
                repeat: Infinity, 
                ease: 'easeInOut',
                delay: 2
              }}
              className="absolute bottom-20 left-1/4 w-24 h-24 bg-purple-400 rounded-full opacity-20"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover how SmartCart revolutionizes your shopping experience with cutting-edge technology
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="group"
                >
                  <Link to={feature.link}>
                    <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 relative overflow-hidden">
                      <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                      
                      <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="text-white w-8 h-8" />
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-blue-600 transition-colors">
                        {feature.title}
                      </h3>
                      
                      <p className="text-gray-600 leading-relaxed">
                        {feature.description}
                      </p>
                      
                      <motion.div 
                        className="mt-6 flex items-center text-blue-500 font-medium group-hover:text-blue-600"
                        whileHover={{ x: 5 }}
                      >
                        Learn More →
                      </motion.div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-blue-600 to-yellow-500 rounded-3xl p-12 text-center text-white relative overflow-hidden"
          >
            <div className="absolute inset-0">
              <motion.div 
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.1, 0.3, 0.1]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  ease: 'easeInOut' 
                }}
                className="absolute top-0 left-0 w-full h-full bg-white rounded-full"
              />
            </div>
            
            <div className="relative z-10">
              <Sparkles className="w-16 h-16 mx-auto mb-6 text-yellow-200" />
              <h3 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Transform Your Shopping?
              </h3>
              <p className="text-xl mb-8 opacity-90">
                Join thousands of users who've already discovered the future of smart shopping
              </p>
              <Link to="/products">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-4 bg-white text-blue-600 font-bold rounded-full shadow-lg hover:shadow-xl transition-all"
                >
                  Get Started Today
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;