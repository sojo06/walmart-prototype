import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Volume2, ShoppingCart, Search, Package, Settings } from 'lucide-react';

const VoiceAssistant = () => {
  const [isListening, setIsListening] = useState(false);
  const [command, setCommand] = useState('');
  const [response, setResponse] = useState('');
  const [voiceWave, setVoiceWave] = useState(0);
  const [suggestions] = useState([
    "Add milk to cart",
    "Where is my order?",
    "Find organic apples",
    "Show me today's deals",
    "Checkout my cart",
    "Remove bread from cart"
  ]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isListening) {
      interval = setInterval(() => {
        setVoiceWave(Math.random() * 100);
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isListening]);

  const handleVoiceCommand = (cmd: string) => {
    setCommand(cmd);
    setIsListening(false);
    
    // Simulate processing
    setTimeout(() => {
      generateResponse(cmd);
    }, 1000);
  };

  const generateResponse = (cmd: string) => {
    const lowerCmd = cmd.toLowerCase();
    
    if (lowerCmd.includes('add') && lowerCmd.includes('cart')) {
      setResponse(`I've added the item to your cart. Your cart now has 3 items. Would you like to continue shopping or checkout?`);
    } else if (lowerCmd.includes('where') && lowerCmd.includes('order')) {
      setResponse(`Your order #12345 is currently out for delivery and should arrive within the next 2 hours. You can track it in real-time from your delivery tracking page.`);
    } else if (lowerCmd.includes('find') || lowerCmd.includes('search')) {
      setResponse(`I found several organic apple varieties available. Would you like me to show you the results or add a specific type to your cart?`);
    } else if (lowerCmd.includes('deals') || lowerCmd.includes('special')) {
      setResponse(`Today's special deals include 20% off organic produce, buy-one-get-one-free on dairy products, and free delivery on orders over $50. Would you like to see more details?`);
    } else if (lowerCmd.includes('checkout')) {
      setResponse(`Your cart total is $47.89 including tax. I can process your payment using your saved payment method, or would you prefer to review the items first?`);
    } else if (lowerCmd.includes('remove')) {
      setResponse(`I've removed the item from your cart. Your updated cart total is $31.94. Is there anything else you'd like to modify?`);
    } else {
      setResponse(`I understand you said "${cmd}". How can I help you with your shopping today?`);
    }
  };

  const startListening = () => {
    setIsListening(true);
    setCommand('');
    setResponse('');
    
    // Simulate voice recognition after 3 seconds
    setTimeout(() => {
      const randomCommand = suggestions[Math.floor(Math.random() * suggestions.length)];
      handleVoiceCommand(randomCommand);
    }, 3000);
  };

  const stopListening = () => {
    setIsListening(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Voice Shopping Assistant
          </h1>
          <p className="text-lg text-gray-600">
            Use voice commands for hands-free shopping experience
          </p>
        </motion.div>

        {/* Voice Interface */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-100"
        >
          {/* Voice Visualizer */}
          <div className="flex justify-center mb-8">
            <motion.div 
              className="relative w-32 h-32 bg-blue-600 rounded-full flex items-center justify-center"
              animate={{ 
                scale: isListening ? [1, 1.1, 1] : 1,
                boxShadow: isListening 
                  ? [`0 0 0 0 rgba(37, 99, 235, 0.4)`, `0 0 0 15px rgba(37, 99, 235, 0)`]
                  : `0 4px 20px rgba(0, 0, 0, 0.1)`
              }}
              transition={{ 
                duration: isListening ? 1.5 : 0.3, 
                repeat: isListening ? Infinity : 0 
              }}
            >
              {/* Voice Wave Animation */}
              {isListening && (
                <div className="absolute inset-0 rounded-full overflow-hidden">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute inset-0 border-2 border-white/30 rounded-full"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.7, 0.3, 0]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.4
                      }}
                    />
                  ))}
                </div>
              )}
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={isListening ? stopListening : startListening}
                className="relative z-10 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md"
              >
                {isListening ? (
                  <MicOff className="w-8 h-8 text-red-500" />
                ) : (
                  <Mic className="w-8 h-8 text-blue-600" />
                )}
              </motion.button>
            </motion.div>
          </div>

          {/* Status and Controls */}
          <div className="text-center mb-8">
            <AnimatePresence mode="wait">
              {isListening ? (
                <motion.div
                  key="listening"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <h2 className="text-xl font-semibold text-blue-600 mb-2">Listening...</h2>
                  <p className="text-gray-600">Speak your command clearly</p>
                  <div className="mt-4 flex justify-center space-x-2">
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-1.5 h-6 bg-blue-600 rounded-full"
                        animate={{ 
                          height: [24, 12, 24]
                        }}
                        transition={{ 
                          duration: 0.8, 
                          repeat: Infinity, 
                          delay: i * 0.1 
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              ) : command ? (
                <motion.div
                  key="processing"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <h2 className="text-xl font-semibold text-green-600 mb-2">Processing Command</h2>
                  <p className="text-gray-600">"{command}"</p>
                </motion.div>
              ) : (
                <motion.div
                  key="ready"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">Ready to Listen</h2>
                  <p className="text-gray-600">Click the microphone or say "Hey SmartCart"</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Response */}
          <AnimatePresence>
            {response && (
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30, scale: 0.9 }}
                className="bg-blue-50 rounded-xl p-4 border border-blue-200"
              >
                <div className="flex items-start space-x-3">
                  <Volume2 className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-sm font-semibold text-blue-900 mb-2">Assistant Response:</h3>
                    <p className="text-sm text-gray-700 leading-relaxed">{response}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Voice Commands Examples */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
            <Mic className="w-5 h-5 mr-2 text-blue-600" />
            Try These Voice Commands
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {suggestions.map((suggestion, index) => (
              <motion.button
                key={suggestion}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleVoiceCommand(suggestion)}
                className="p-3 bg-gray-50 rounded-lg text-left hover:bg-blue-50 hover:border-blue-200 border border-gray-200 transition-all group"
              >
                <div className="flex items-center space-x-2 mb-2">
                  {suggestion.toLowerCase().includes('add') && <ShoppingCart className="w-3 h-3 text-blue-600" />}
                  {suggestion.toLowerCase().includes('find') && <Search className="w-3 h-3 text-green-600" />}
                  {suggestion.toLowerCase().includes('where') && <Package className="w-3 h-3 text-orange-600" />}
                  {suggestion.toLowerCase().includes('checkout') && <Settings className="w-3 h-3 text-purple-600" />}
                  <span className="text-xs text-gray-500 uppercase tracking-wide font-medium">Say</span>
                </div>
                <p className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                  "{suggestion}"
                </p>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Voice Settings */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
            <Settings className="w-5 h-5 mr-2 text-blue-600" />
            Voice Settings
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Voice Activation</h3>
              <div className="space-y-3">
                <label className="flex items-center space-x-3">
                  <input type="checkbox" defaultChecked className="form-checkbox text-blue-600 rounded" />
                  <span className="text-sm text-gray-700">Wake word detection ("Hey SmartCart")</span>
                </label>
                <label className="flex items-center space-x-3">
                  <input type="checkbox" defaultChecked className="form-checkbox text-blue-600 rounded" />
                  <span className="text-sm text-gray-700">Voice feedback responses</span>
                </label>
                <label className="flex items-center space-x-3">
                  <input type="checkbox" className="form-checkbox text-blue-600 rounded" />
                  <span className="text-sm text-gray-700">Continuous listening mode</span>
                </label>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Privacy & Security</h3>
              <div className="space-y-3">
                <label className="flex items-center space-x-3">
                  <input type="checkbox" defaultChecked className="form-checkbox text-blue-600 rounded" />
                  <span className="text-sm text-gray-700">Process voice locally</span>
                </label>
                <label className="flex items-center space-x-3">
                  <input type="checkbox" className="form-checkbox text-blue-600 rounded" />
                  <span className="text-sm text-gray-700">Save voice history</span>
                </label>
                <label className="flex items-center space-x-3">
                  <input type="checkbox" defaultChecked className="form-checkbox text-blue-600 rounded" />
                  <span className="text-sm text-gray-700">Voice command confirmation</span>
                </label>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default VoiceAssistant;