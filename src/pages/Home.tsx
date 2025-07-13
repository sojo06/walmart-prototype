import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Users, Mic, Package, ShoppingCart, Sparkles, ChevronLeft, ChevronRight, Star, ArrowRight } from 'lucide-react';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const carouselSlides = [
    {
      id: 1,
      title: "AI-Powered Shopping Revolution",
      subtitle: "Experience the future of retail",
      description: "Get instant support, smart recommendations, and seamless shopping with our advanced AI assistant",
      image: "https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=800",
      cta: "Try AI Assistant",
      link: "/customer-service",
      gradient: "from-blue-600 to-purple-600"
    },
    {
      id: 2,
      title: "Shop Together, Save Together",
      subtitle: "Collaborative shopping made easy",
      description: "Create shared carts with friends and family for group purchases and split payments effortlessly",
      image: "https://images.pexels.com/photos/3962285/pexels-photo-3962285.jpeg?auto=compress&cs=tinysrgb&w=800",
      cta: "Start Group Shopping",
      link: "/group-shopping",
      gradient: "from-green-600 to-blue-600"
    },
    {
      id: 3,
      title: "Voice-Activated Shopping",
      subtitle: "Hands-free convenience",
      description: "Use voice commands for smart checkout, product search, and real-time order tracking",
      image: "https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&w=800",
      cta: "Try Voice Features",
      link: "/voice-assistant",
      gradient: "from-purple-600 to-pink-600"
    }
  ];

  const features = [
    {
      icon: Bot,
      title: 'AI Customer Service',
      description: 'Chat or call our intelligent AI bot for instant support and step-by-step guidance',
      link: '/customer-service',
      color: 'blue',
      isFlippable: true
    },
    {
      icon: Users,
      title: 'Group Shopping',
      description: 'Create shared carts with friends and family for collaborative shopping experiences',
      link: '/group-shopping',
      color: 'indigo',
      isFlippable: true
    },
    {
      icon: Mic,
      title: 'Voice Assistant',
      description: 'Use voice commands for smart checkout and hands-free shopping navigation',
      link: '/voice-assistant',
      color: 'violet',
      isFlippable: true,
      isVoiceFeature: true
    },
    {
      icon: Package,
      title: 'Smart Tracking',
      description: 'Track your deliveries in real-time with voice-activated status updates',
      link: '/delivery-tracking',
      color: 'emerald',
      isFlippable: true
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Busy Mom",
      content: "SmartCart's group shopping feature has revolutionized how our family shops. We can all add items and I can checkout when convenient!",
      rating: 5,
      avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
    },
    {
      name: "Mike Chen",
      role: "Tech Professional",
      content: "The voice assistant is incredible. I can add items to my cart while cooking or driving. It's like having a personal shopping assistant.",
      rating: 5,
      avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
    },
    {
      name: "Emma Davis",
      role: "College Student",
      content: "The AI customer service helped me track my order and resolve an issue in minutes. No waiting on hold!",
      rating: 5,
      avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length);
  };

  return (
    <div className="min-h-screen">
      {/* Dynamic Carousel Hero Section */}
      <section className="relative h-screen overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.7 }}
            className="absolute inset-0"
          >
            <div className="relative h-full">
              <img
                src={carouselSlides[currentSlide].image}
                alt={carouselSlides[currentSlide].title}
                className="w-full h-full object-cover"
              />
              <div className={`absolute inset-0 bg-gradient-to-r ${carouselSlides[currentSlide].gradient} opacity-80`} />
              
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="max-w-4xl mx-auto px-6 text-center text-white">
                  <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                  >
                    <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
                      {carouselSlides[currentSlide].title}
                    </h1>
                    <p className="text-2xl md:text-3xl font-light mb-4 opacity-90">
                      {carouselSlides[currentSlide].subtitle}
                    </p>
                    <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-80">
                      {carouselSlides[currentSlide].description}
                    </p>
                    <Link to={carouselSlides[currentSlide].link}>
                      <motion.button
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-4 bg-white text-gray-900 font-semibold rounded-2xl hover:shadow-2xl transition-all inline-flex items-center space-x-2"
                      >
                        <span>{carouselSlides[currentSlide].cta}</span>
                        <ArrowRight className="w-5 h-5" />
                      </motion.button>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Carousel Controls */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-4">
          {carouselSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? 'bg-white scale-125' : 'bg-white/50'
              }`}
            />
          ))}
        </div>

        <button
          onClick={prevSlide}
          className="absolute left-6 top-1/2 transform -translate-y-1/2 p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-6 top-1/2 transform -translate-y-1/2 p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </section>

      {/* Interactive Flip Cards Features Section */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover how SmartCart revolutionizes your shopping experience with cutting-edge technology
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const colorClasses = {
                blue: 'from-blue-500 to-blue-600',
                indigo: 'from-indigo-500 to-indigo-600',
                violet: 'from-violet-500 to-violet-600',
                emerald: 'from-emerald-500 to-emerald-600'
              };
              
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group perspective-1000"
                >
                  <div className="relative w-full h-80 transform-style-preserve-3d transition-transform duration-700 group-hover:rotate-y-180">
                    {/* Front of card */}
                    <div className="absolute inset-0 backface-hidden bg-white rounded-3xl shadow-lg border border-gray-100 p-8 flex flex-col items-center justify-center text-center">
                      <div className={`w-16 h-16 bg-gradient-to-br ${colorClasses[feature.color]} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
                        <Icon className="text-white w-8 h-8" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>

                    {/* Back of card */}
                    <div className={`absolute inset-0 backface-hidden rotate-y-180 bg-gradient-to-br ${colorClasses[feature.color]} rounded-3xl shadow-lg p-8 flex flex-col items-center justify-center text-center text-white`}>
                      <Icon className="w-12 h-12 mb-6 opacity-90" />
                      <h3 className="text-xl font-bold mb-4">
                        Ready to explore?
                      </h3>
                      <p className="text-sm opacity-90 mb-6">
                        Click to experience {feature.title.toLowerCase()} in action
                      </p>
                      <Link to={feature.link}>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-6 py-3 bg-white text-gray-900 font-semibold rounded-xl hover:shadow-lg transition-all"
                        >
                          Get Started
                        </motion.button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join thousands of satisfied customers who've transformed their shopping experience
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-gray-50 rounded-3xl p-8 border border-gray-100 hover:shadow-lg transition-all"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center space-x-3">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-xl object-cover"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center text-white"
          >
            <Sparkles className="w-16 h-16 mx-auto mb-8 text-blue-200" />
            <h3 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Transform Your Shopping?
            </h3>
            <p className="text-xl mb-10 text-blue-100 max-w-2xl mx-auto">
              Join thousands of users who've already discovered the future of smart shopping with AI assistance
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/products">
                <motion.button 
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-2xl hover:shadow-2xl transition-all inline-flex items-center space-x-2"
                >
                  <span>Start Shopping Now</span>
                  <ShoppingCart className="w-5 h-5" />
                </motion.button>
              </Link>
              <Link to="/customer-service">
                <motion.button 
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white/10 text-white font-semibold rounded-2xl border border-white/20 hover:bg-white/20 transition-all inline-flex items-center space-x-2"
                >
                  <span>Try AI Assistant</span>
                  <Bot className="w-5 h-5" />
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