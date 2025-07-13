import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Plus, ShoppingCart, Crown, Copy, Check, Trash2, DollarSign } from 'lucide-react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  addedBy: string;
}

interface GroupMember {
  id: string;
  name: string;
  avatar: string;
  isHost: boolean;
}

const GroupShopping = () => {
  const [groupCode, setGroupCode] = useState('CART2024');
  const [copied, setCopied] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [newItemPrice, setNewItemPrice] = useState('');
  const [showAddItem, setShowAddItem] = useState(false);

  const [members] = useState<GroupMember[]>([
    { id: '1', name: 'You (Host)', avatar: '👤', isHost: true },
    { id: '2', name: 'Sarah', avatar: '👩', isHost: false },
    { id: '3', name: 'Mike', avatar: '👨', isHost: false },
    { id: '4', name: 'Emma', avatar: '👱‍♀️', isHost: false },
  ]);

  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: '1', name: 'Organic Milk', price: 4.99, quantity: 2, addedBy: 'You' },
    { id: '2', name: 'Whole Grain Bread', price: 3.49, quantity: 1, addedBy: 'Sarah' },
    { id: '3', name: 'Greek Yogurt', price: 5.99, quantity: 3, addedBy: 'Mike' },
    { id: '4', name: 'Fresh Bananas', price: 2.99, quantity: 2, addedBy: 'Emma' },
    { id: '5', name: 'Oat Cereal', price: 6.49, quantity: 1, addedBy: 'You' },
  ]);

  const totalAmount = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  const copyGroupCode = () => {
    navigator.clipboard.writeText(groupCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const addItem = () => {
    if (newItemName && newItemPrice) {
      const newItem: CartItem = {
        id: Date.now().toString(),
        name: newItemName,
        price: parseFloat(newItemPrice),
        quantity: 1,
        addedBy: 'You'
      };
      setCartItems([...cartItems, newItem]);
      setNewItemName('');
      setNewItemPrice('');
      setShowAddItem(false);
    }
  };

  const removeItem = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity > 0) {
      setCartItems(cartItems.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100"
        >
          {/* Header */}
          <div className="bg-blue-600 p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <motion.div 
                  whileHover={{ rotate: 15 }}
                  className="w-10 h-10 bg-white rounded-lg flex items-center justify-center"
                >
                  <Users className="text-blue-600 w-5 h-5" />
                </motion.div>
                <div>
                  <h1 className="text-xl font-semibold text-white">Group Shopping Lobby</h1>
                  <p className="text-blue-200 text-sm">Collaborate with friends and family</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="text-blue-200 text-xs">Group Code</p>
                  <div className="flex items-center space-x-2">
                    <span className="text-white font-mono text-sm font-medium">{groupCode}</span>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={copyGroupCode}
                      className="p-1 rounded"
                    >
                      {copied ? (
                        <Check className="w-3 h-3 text-green-300" />
                      ) : (
                        <Copy className="w-3 h-3 text-white" />
                      )}
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 p-6">
            {/* Members Section */}
            <div className="lg:col-span-1">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Users className="w-4 h-4 mr-2 text-blue-600" />
                Group Members ({members.length})
              </h2>
              
              <div className="space-y-3">
                {members.map((member, index) => (
                  <motion.div
                    key={member.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="text-2xl">{member.avatar}</div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 flex items-center">
                        {member.name}
                        {member.isHost && (
                          <Crown className="w-3 h-3 ml-1 text-yellow-500" />
                        )}
                      </p>
                      <p className="text-xs text-gray-500">
                        {member.isHost ? 'Host' : 'Member'}
                      </p>
                    </div>
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  </motion.div>
                ))}
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full p-3 border border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-400 hover:text-blue-600 transition-all"
                >
                  <Plus className="w-4 h-4 mx-auto mb-1" />
                  <p className="text-sm">Invite More Friends</p>
                </motion.button>
              </div>
            </div>

            {/* Cart Section */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                  <ShoppingCart className="w-4 h-4 mr-2 text-blue-600" />
                  Shared Cart ({cartItems.length} items)
                </h2>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowAddItem(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Item</span>
                </motion.button>
              </div>

              {/* Add Item Modal */}
              <AnimatePresence>
                {showAddItem && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                    onClick={() => setShowAddItem(false)}
                  >
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.9, opacity: 0 }}
                      onClick={(e) => e.stopPropagation()}
                      className="bg-white rounded-xl p-6 w-full max-w-md"
                    >
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Item</h3>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-900 mb-1">
                            Item Name
                          </label>
                          <input
                            type="text"
                            value={newItemName}
                            onChange={(e) => setNewItemName(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter item name"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-900 mb-1">
                            Price ($)
                          </label>
                          <input
                            type="number"
                            step="0.01"
                            value={newItemPrice}
                            onChange={(e) => setNewItemPrice(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter price"
                          />
                        </div>
                      </div>
                      
                      <div className="flex space-x-3 mt-6">
                        <button
                          onClick={() => setShowAddItem(false)}
                          className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={addItem}
                          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
                        >
                          Add Item
                        </button>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Cart Items */}
              <div className="space-y-3 mb-6">
                <AnimatePresence>
                  {cartItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
                        <p className="text-sm text-gray-500">Added by {item.addedBy}</p>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 rounded-lg bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors text-sm"
                        >
                          -
                        </button>
                        <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 rounded-lg bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors text-sm"
                        >
                          +
                        </button>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-sm font-semibold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                        <p className="text-xs text-gray-500">${item.price.toFixed(2)} each</p>
                      </div>
                      
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => removeItem(item.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </motion.button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Cart Summary */}
              <div className="bg-blue-600 rounded-xl p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Cart Summary</h3>
                  <DollarSign className="w-5 h-5" />
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>${totalAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax (8.5%):</span>
                    <span>${(totalAmount * 0.085).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery:</span>
                    <span>$2.99</span>
                  </div>
                  <div className="border-t border-white/20 pt-2 mt-2">
                    <div className="flex justify-between font-semibold">
                      <span>Total:</span>
                      <span>${(totalAmount + (totalAmount * 0.085) + 2.99).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-gray-50 transition-all"
                >
                  Proceed to Checkout (Host Only)
                </motion.button>
                
                <p className="text-center text-blue-200 text-xs mt-2">
                  Only the host can complete the payment
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default GroupShopping;