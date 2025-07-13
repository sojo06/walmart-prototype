import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, Phone, MessageCircle, Volume2, Mic, User, Package, RefreshCw, Users } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  hasSteps?: boolean;
  steps?: string[];
}

const CustomerService = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your AI assistant. How can I help you today? You can ask me about orders, products, or get step-by-step guidance.",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [callMode, setCallMode] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateBotResponse = (userMessage: string): Message => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('order') || lowerMessage.includes('track')) {
      return {
        id: Date.now().toString(),
        text: "I can help you track your order! Here's how to check your order status:",
        isBot: true,
        timestamp: new Date(),
        hasSteps: true,
        steps: [
          "Go to 'My Orders' in your account menu",
          "Find your order number",
          "Click on 'Track Order' button",
          "View real-time delivery status",
          "Set up delivery notifications"
        ]
      };
    } else if (lowerMessage.includes('return') || lowerMessage.includes('refund')) {
      return {
        id: Date.now().toString(),
        text: "I'll guide you through the return process:",
        isBot: true,
        timestamp: new Date(),
        hasSteps: true,
        steps: [
          "Navigate to 'Order History'",
          "Select the item you want to return",
          "Choose return reason",
          "Print the return label",
          "Package and ship the item",
          "Track your refund status"
        ]
      };
    } else if (lowerMessage.includes('group') || lowerMessage.includes('cart')) {
      return {
        id: Date.now().toString(),
        text: "Let me help you with group shopping! Here's how to create a shared cart:",
        isBot: true,
        timestamp: new Date(),
        hasSteps: true,
        steps: [
          "Click on 'Group Shopping' in the menu",
          "Create a new shopping lobby",
          "Share the invite code with friends",
          "Add items to the shared cart",
          "Review final cart as host",
          "Complete payment for the group"
        ]
      };
    } else if (lowerMessage.includes('voice') || lowerMessage.includes('speak')) {
      return {
        id: Date.now().toString(),
        text: "Voice features make shopping hands-free! Here's how to use voice commands:",
        isBot: true,
        timestamp: new Date(),
        hasSteps: true,
        steps: [
          "Say 'Hey SmartCart' to activate",
          "Use commands like 'Add milk to cart'",
          "Ask 'Where is my order?' for tracking",
          "Say 'Checkout' to complete purchase",
          "Voice search: 'Find organic apples'"
        ]
      };
    } else {
      const responses = [
        "I understand your question. Let me provide you with the best solution based on our knowledge base.",
        "That's a great question! I'm here to help you find the right answer.",
        "Thank you for reaching out. I'll guide you through this step by step.",
        "I can definitely help you with that. Let me walk you through the process.",
      ];
      return {
        id: Date.now().toString(),
        text: responses[Math.floor(Math.random() * responses.length)],
        isBot: true,
        timestamp: new Date()
      };
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: newMessage,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse = generateBotResponse(newMessage);
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleVoiceInput = () => {
    setIsListening(!isListening);
    if (!isListening) {
      // Simulate voice recognition
      setTimeout(() => {
        setNewMessage("How do I track my order?");
        setIsListening(false);
      }, 2000);
    }
  };

  const toggleCallMode = () => {
    setCallMode(!callMode);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-yellow-50 to-blue-100 p-4">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-yellow-500 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <motion.div 
                  animate={{ rotate: callMode ? 360 : 0 }}
                  className="w-12 h-12 bg-white rounded-full flex items-center justify-center"
                >
                  <Bot className="text-blue-600 w-6 h-6" />
                </motion.div>
                <div>
                  <h1 className="text-2xl font-bold text-white">AI Customer Service</h1>
                  <p className="text-blue-100">
                    {callMode ? 'Voice Call Active' : 'Chat Mode Active'} • Always available
                  </p>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleCallMode}
                  className={`p-3 rounded-full transition-all ${
                    callMode ? 'bg-red-500 text-white' : 'bg-white text-blue-600'
                  }`}
                >
                  <Phone className="w-5 h-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCallMode(false)}
                  className={`p-3 rounded-full transition-all ${
                    !callMode ? 'bg-white text-blue-600' : 'bg-blue-700 text-white'
                  }`}
                >
                  <MessageCircle className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </div>

          {/* Chat Interface */}
          <div className="flex h-96">
            {/* Messages Area */}
            <div className="flex-1 flex flex-col">
              <div 
                ref={chatContainerRef}
                className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50"
              >
                <AnimatePresence>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                    >
                      <div className={`max-w-xs lg:max-w-md ${message.isBot ? 'order-1' : 'order-2'}`}>
                        <div className={`flex items-end space-x-2 ${message.isBot ? 'flex-row' : 'flex-row-reverse space-x-reverse'}`}>
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            message.isBot ? 'bg-blue-500' : 'bg-yellow-500'
                          }`}>
                            {message.isBot ? (
                              <Bot className="text-white w-4 h-4" />
                            ) : (
                              <User className="text-white w-4 h-4" />
                            )}
                          </div>
                          <div className={`px-4 py-3 rounded-2xl ${
                            message.isBot 
                              ? 'bg-white border border-gray-200' 
                              : 'bg-gradient-to-r from-blue-500 to-yellow-500 text-white'
                          }`}>
                            <p className="text-sm">{message.text}</p>
                            {message.hasSteps && message.steps && (
                              <div className="mt-3 space-y-2">
                                {message.steps.map((step, index) => (
                                  <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex items-center space-x-2 text-sm bg-blue-50 p-2 rounded-lg"
                                  >
                                    <span className="w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                                      {index + 1}
                                    </span>
                                    <span className="text-gray-700">{step}</span>
                                  </motion.div>
                                ))}
                              </div>
                            )}
                            <p className="text-xs text-gray-500 mt-2">
                              {message.timestamp.toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <Bot className="text-white w-4 h-4" />
                      </div>
                      <div className="bg-white border border-gray-200 px-4 py-3 rounded-2xl">
                        <div className="flex space-x-1">
                          {[0, 1, 2].map((i) => (
                            <motion.div
                              key={i}
                              animate={{ y: [0, -5, 0] }}
                              transition={{ 
                                duration: 0.6, 
                                repeat: Infinity, 
                                delay: i * 0.1 
                              }}
                              className="w-2 h-2 bg-gray-400 rounded-full"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-6 bg-white border-t border-gray-200">
                <div className="flex items-center space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleVoiceInput}
                    className={`p-3 rounded-full transition-all ${
                      isListening 
                        ? 'bg-red-500 text-white' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <Mic className="w-5 h-5" />
                  </motion.button>
                  
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder={isListening ? "Listening..." : "Type your message..."}
                      className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      disabled={isListening}
                    />
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    className="p-3 bg-gradient-to-r from-blue-500 to-yellow-500 text-white rounded-full hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 grid md:grid-cols-3 gap-4"
        >
          {[
            { icon: Package, title: "Track Order", action: "How do I track my order?" },
            { icon: RefreshCw, title: "Return Item", action: "I need to return an item" },
            { icon: Users, title: "Group Shopping", action: "How does group shopping work?" }
          ].map((action, index) => (
            <motion.button
              key={action.title}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setNewMessage(action.action)}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100"
            >
              <action.icon className="w-8 h-8 text-blue-500 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-800">{action.title}</h3>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default CustomerService;