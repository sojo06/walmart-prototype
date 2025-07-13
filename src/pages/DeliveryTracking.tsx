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
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Delivery Tracking
          </h1>
          <p className="text-lg text-gray-600">
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
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Package className="w-4 h-4 mr-2 text-blue-600" />
                Your Orders
              </h2>
              
              <div className="space-y-3">
                {orders.map((order) => (
                  <motion.button
                    key={order.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedOrder(order.id)}
                    className={`w-full p-3 rounded-lg text-left transition-all ${
                      selectedOrder === order.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-50 hover:bg-gray-100 text-gray-900'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-sm font-semibold">Order #{order.id}</span>
                      <span className="text-sm opacity-90">${order.total}</span>
                    </div>
                    <p className="text-xs opacity-80 mb-2">
                      {order.items.join(', ')}
                    </p>
                    <div className="flex items-center space-x-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${
                        order.currentStatus.status === 'delivered' ? 'bg-green-400' :
                        order.currentStatus.status === 'out_for_delivery' ? 'bg-orange-400' :
                        'bg-yellow-400'
                      }`} />
                      <span className="text-xs capitalize">
                        {order.currentStatus.status.replace('_', ' ')}
                      </span>
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Voice Assistant */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                  <Mic className="w-4 h-4 mr-2 text-blue-600" />
                  Voice Tracking
                </h3>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleVoiceQuery}
                  className={`w-full p-2 rounded-lg flex items-center justify-center space-x-2 transition-all text-sm ${
                    isVoiceActive
                      ? 'bg-red-500 text-white'
                      : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                  }`}
                >
                  <Mic className="w-4 h-4" />
                  <span>{isVoiceActive ? 'Listening...' : 'Ask About Order'}</span>
                </motion.button>

                {voiceQuery && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-3 p-2 bg-blue-50 rounded-lg"
                  >
                    <p className="text-xs text-blue-800">{voiceQuery}</p>
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
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              {/* Order Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
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
                      className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors"
                    >
                      <Phone className="w-4 h-4" />
                    </motion.button>
                  )}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Delivery Progress</span>
                  <span className="text-sm text-blue-600">
                    {Math.round(getProgressPercentage(currentOrder.currentStatus.status))}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${getProgressPercentage(currentOrder.currentStatus.status)}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="bg-blue-600 h-2 rounded-full"
                  />
                </div>
              </div>

              {/* Current Status */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-blue-50 rounded-xl p-4 mb-6 border border-blue-200"
              >
                <div className="flex items-start space-x-4">
                  <div className={`p-2 bg-white rounded-lg ${statusColors[currentOrder.currentStatus.status]}`}>
                    {React.createElement(statusIcons[currentOrder.currentStatus.status], { 
                      className: "w-5 h-5" 
                    })}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-gray-900 mb-1 capitalize">
                      {currentOrder.currentStatus.status.replace('_', ' ')}
                    </h3>
                    <p className="text-sm text-gray-700 mb-2">
                      {currentOrder.currentStatus.description}
                    </p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{currentOrder.currentStatus.timestamp}</span>
                      </div>
                      {currentOrder.currentStatus.location && (
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-3 h-3" />
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
                  className="bg-gray-50 rounded-lg p-4 mb-6"
                >
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">Your Driver</h3>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white text-sm font-medium">
                      {currentOrder.driverName.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{currentOrder.driverName}</p>
                      <p className="text-sm text-gray-600">{currentOrder.driverPhone}</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Tracking History */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-4">Tracking History</h3>
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
                        <div className={`p-1.5 rounded-lg ${
                          isActive 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-gray-200 text-gray-600'
                        }`}>
                          <StatusIcon className="w-3 h-3" />
                        </div>
                        <div className="flex-1">
                          <p className={`text-sm font-medium ${
                            isActive ? 'text-gray-800' : 'text-gray-600'
                          }`}>
                            {status.description}
                          </p>
                          <p className="text-xs text-gray-500">{status.timestamp}</p>
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