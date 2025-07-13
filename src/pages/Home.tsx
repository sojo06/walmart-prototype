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
      color: 'blue'
    },
    {
      icon: Users,
      title: 'Group Shopping',
      description: 'Create shared carts with friends and family for collaborative shopping experiences',
      link: '/group-shopping',
      color: 'indigo'
    },
    {
      icon: Mic,
      title: 'Voice Assistant',
      description: 'Use voice commands for smart checkout and hands-free shopping navigation',
      link: '/voice-assistant',
      color: 'violet'
    },
    {
      icon: Package,
      title: 'Smart Tracking',
      description: 'Track your deliveries in real-time with voice-activated status updates',
      link: '/delivery-tracking',
      color: 'emerald'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-6 text-gray-900"
            >
              SmartCart
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-lg md:text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              Experience the future of shopping with AI-powered assistance, group collaboration, and voice-controlled features
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link to="/products">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all shadow-sm hover:shadow-md"
                >
                  Start Shopping
                </motion.button>
              </Link>
              <Link to="/customer-service">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-white text-blue-600 font-medium rounded-lg border border-blue-200 hover:bg-blue-50 transition-all"
                >
                  Try AI Assistant
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              Powerful Features
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover how SmartCart revolutionizes your shopping experience with cutting-edge technology
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const colorClasses = {
                blue: 'bg-blue-600 hover:bg-blue-700',
                indigo: 'bg-indigo-600 hover:bg-indigo-700',
                violet: 'bg-violet-600 hover:bg-violet-700',
                emerald: 'bg-emerald-600 hover:bg-emerald-700'
              };
              
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="group"
                >
                  <Link to={feature.link}>
                    <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 h-full">
                      
                      <div className={`w-12 h-12 ${colorClasses[feature.color]} rounded-xl flex items-center justify-center mb-6 transition-colors duration-300`}>
                        <Icon className="text-white w-6 h-6" />
                      </div>
                      
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        {feature.title}
                      </h3>
                      
                      <p className="text-gray-600 text-sm leading-relaxed mb-4">
                        {feature.description}
                      </p>
                      
                      <motion.div 
                        className="flex items-center text-blue-600 text-sm font-medium group-hover:text-blue-700"
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
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-blue-600 rounded-2xl p-12 text-center text-white"
          >
              <Sparkles className="w-12 h-12 mx-auto mb-6 text-blue-200" />
              <h3 className="text-2xl md:text-3xl font-bold mb-6">
                Ready to Transform Your Shopping?
              </h3>
              <p className="text-lg mb-8 text-blue-100">
                Join thousands of users who've already discovered the future of smart shopping
              </p>
              <Link to="/products">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-gray-50 transition-all"
                >
                  Get Started Today
                </motion.button>
              </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;