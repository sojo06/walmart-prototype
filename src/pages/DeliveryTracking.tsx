import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, Truck, MapPin, Clock, CheckCircle, Phone, MessageCircle, Mic } from 'lucide-react';

interface DeliveryStatus {
  id: string;
  status: 'confirmed' | 'preparing' | 'shipped' | 'out_for_delivery' | 'delivered';
  timestamp: string;
  description: string;
  location?: string;
}

interface Order {
  id: string;
  items: string[];
  total: number;
  estimatedDelivery: string;
  currentStatus: DeliveryStatus;
  trackingHistory: DeliveryStatus[];
  driverName?: string;
  driverPhone?: string;
}

const DeliveryTracking = () => {
  const [selectedOrder, setSelectedOrder] = useState<string>('12345');
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [voiceQuery, setVoiceQuery] = useState('');

  const orders: Order[] = [
    {
      id: '12345',
      items: ['Organic Milk', 'Honey Oat Cereal', 'Fresh Bananas'],
      total: 14.47,
      estimatedDelivery: '2:30 PM - 3:00 PM',
      currentStatus: {
        id: '4',
        status: 'out_for_delivery',
        timestamp: '1:45 PM',
        description: 'Out for delivery - Driver is 15 minutes away',
        location: '2.3 miles from your location'
      },
      trackingHistory: [
        {
          id: '1',
          status: 'confirmed',
          timestamp: '11:30 AM',
          description: 'Order confirmed and payment processed'
        },
        {
          id: '2',
          status: 'preparing',
          timestamp: '12:15 PM',
          description: 'Items being picked and packed'
        },
        {
          id: '3',
          status: 'shipped',
          timestamp: '1:20 PM',
          description: 'Package shipped from warehouse'
        },
        {
          id: '4',
          status: 'out_for_delivery',
          timestamp: '1:45 PM',
          description: 'Out for delivery - Driver is 15 minutes away',
          location: '2.3 miles from your location'
        }
      ],
      driverName: 'Alex Johnson',
      driverPhone: '+1 (555) 123-4567'
    },
    {
      id: '12346',
      items: ['Artisan Bread', 'Greek Yogurt'],
      total: 9.98,
      estimatedDelivery: '4:00 PM - 4:30 PM',
      currentStatus: {
        id: '2',
        status: 'preparing',
        timestamp: '2:00 PM',
        description: 'Items being picked and packed'
      },
      trackingHistory: [
        {
          id: '1',
          status: 'confirmed',
          timestamp: '1:45 PM',
          description: 'Order confirmed and payment processed'
        },
        {
          id: '2',
          status: 'preparing',
          timestamp: '2:00 PM',
          description: 'Items being picked and packed'
        }
      ]
    }
  ];

  const currentOrder = orders.find(order => order.id === selectedOrder) || orders[0];

  const statusIcons = {
    confirmed: CheckCircle,
    preparing: Package,
    shipped: Truck,
    out_for_delivery: MapPin,
    delivered: CheckCircle
  };

  const statusColors = {
    confirmed: 'text-green-500',
    preparing: 'text-yellow-500',
    shipped: 'text-blue-500',
    out_for_delivery: 'text-orange-500',
    delivered: 'text-green-600'
  };

  const getProgressPercentage = (status: string) => {
    const statusOrder = ['confirmed', 'preparing', 'shipped', 'out_for_delivery', 'delivered'];
    const currentIndex = statusOrder.indexOf(status);
    return ((currentIndex + 1) / statusOrder.length) * 100;
  };

  const handleVoiceQuery = () => {
    setIsVoiceActive(true);
    
    // Simulate voice recognition
    setTimeout(() => {
      setVoiceQuery("Where is my order?");
      setIsVoiceActive(false);
      
      // Simulate voice response
      setTimeout(() => {
        setVoiceQuery(`Your order #${currentOrder.id} is currently ${currentOrder.currentStatus.description.toLowerCase()}. Estimated delivery: ${currentOrder.estimatedDelivery}.`);
      }, 1000);
    }, 2000);
  };

  // Auto-refresh simulation
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate real-time updates
      console.log('Checking for delivery updates...');
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-yellow-50 to-blue-100 p-4">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Delivery Tracking
          </h1>
          <p className="text-xl text-gray-600">
            Track your orders in real-time with voice assistance
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Order Selection */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <Package className="w-5 h-5 mr-2 text-blue-500" />
                Your Orders
              </h2>
              
              <div className="space-y-3">
                {orders.map((order) => (
                  <motion.button
                    key={order.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedOrder(order.id)}
                    className={`w-full p-4 rounded-xl text-left transition-all ${
                      selectedOrder === order.id
                        ? 'bg-gradient-to-r from-blue-500 to-yellow-500 text-white'
                        : 'bg-gray-50 hover:bg-gray-100 text-gray-800'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-bold">Order #{order.id}</span>
                      <span className="text-sm opacity-90">${order.total}</span>
                    </div>
                    <p className="text-sm opacity-80 mb-2">
                      {order.items.join(', ')}
                    </p>
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${
                        order.currentStatus.status === 'delivered' ? 'bg-green-400' :
                        order.currentStatus.status === 'out_for_delivery' ? 'bg-orange-400' :
                        'bg-yellow-400'
                      }`} />
                      <span className="text-sm capitalize">
                        {order.currentStatus.status.replace('_', ' ')}
                      </span>
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Voice Assistant */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                  <Mic className="w-4 h-4 mr-2 text-blue-500" />
                  Voice Tracking
                </h3>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleVoiceQuery}
                  className={`w-full p-3 rounded-xl flex items-center justify-center space-x-2 transition-all ${
                    isVoiceActive
                      ? 'bg-red-500 text-white'
                      : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                  }`}
                >
                  <Mic className="w-4 h-4" />
                  <span>{isVoiceActive ? 'Listening...' : 'Ask About Order'}</span>
                </motion.button>

                {voiceQuery && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-3 p-3 bg-blue-50 rounded-lg"
                  >
                    <p className="text-sm text-blue-800">{voiceQuery}</p>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Tracking Details */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-2xl shadow-xl p-6">
              {/* Order Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    Order #{currentOrder.id}
                  </h2>
                  <p className="text-gray-600">
                    Estimated delivery: {currentOrder.estimatedDelivery}
                  </p>
                </div>
                
                <div className="flex space-x-2">
                  {currentOrder.driverPhone && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-3 bg-green-100 text-green-600 rounded-xl hover:bg-green-200 transition-colors"
                    >
                      <Phone className="w-5 h-5" />
                    </motion.button>
                  )}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 bg-blue-100 text-blue-600 rounded-xl hover:bg-blue-200 transition-colors"
                  >
                    <MessageCircle className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-600">Delivery Progress</span>
                  <span className="text-sm text-blue-600">
                    {Math.round(getProgressPercentage(currentOrder.currentStatus.status))}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${getProgressPercentage(currentOrder.currentStatus.status)}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="bg-gradient-to-r from-blue-500 to-yellow-500 h-3 rounded-full"
                  />
                </div>
              </div>

              {/* Current Status */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-r from-blue-50 to-yellow-50 rounded-2xl p-6 mb-6 border border-blue-200"
              >
                <div className="flex items-start space-x-4">
                  <div className={`p-3 bg-white rounded-xl ${statusColors[currentOrder.currentStatus.status]}`}>
                    {React.createElement(statusIcons[currentOrder.currentStatus.status], { 
                      className: "w-6 h-6" 
                    })}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800 mb-1 capitalize">
                      {currentOrder.currentStatus.status.replace('_', ' ')}
                    </h3>
                    <p className="text-gray-700 mb-2">
                      {currentOrder.currentStatus.description}
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{currentOrder.currentStatus.timestamp}</span>
                      </div>
                      {currentOrder.currentStatus.location && (
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>{currentOrder.currentStatus.location}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Driver Info */}
              {currentOrder.driverName && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-gray-50 rounded-xl p-4 mb-6"
                >
                  <h3 className="font-semibold text-gray-800 mb-2">Your Driver</h3>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-yellow-500 rounded-full flex items-center justify-center text-white font-bold">
                      {currentOrder.driverName.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{currentOrder.driverName}</p>
                      <p className="text-sm text-gray-600">{currentOrder.driverPhone}</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Tracking History */}
              <div>
                <h3 className="font-bold text-gray-800 mb-4">Tracking History</h3>
                <div className="space-y-4">
                  {currentOrder.trackingHistory.map((status, index) => {
                    const StatusIcon = statusIcons[status.status];
                    const isActive = index === currentOrder.trackingHistory.length - 1;
                    
                    return (
                      <motion.div
                        key={status.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * index }}
                        className={`flex items-start space-x-4 ${
                          isActive ? 'opacity-100' : 'opacity-60'
                        }`}
                      >
                        <div className={`p-2 rounded-lg ${
                          isActive 
                            ? 'bg-gradient-to-r from-blue-500 to-yellow-500 text-white' 
                            : 'bg-gray-200 text-gray-600'
                        }`}>
                          <StatusIcon className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                          <p className={`font-medium ${
                            isActive ? 'text-gray-800' : 'text-gray-600'
                          }`}>
                            {status.description}
                          </p>
                          <p className="text-sm text-gray-500">{status.timestamp}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryTracking;