import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import CustomerService from './pages/CustomerService';
import GroupShopping from './pages/GroupShopping';
import Products from './pages/Products';
import VoiceAssistant from './pages/VoiceAssistant';
import DeliveryTracking from './pages/DeliveryTracking';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/customer-service" element={<CustomerService />} />
            <Route path="/group-shopping" element={<GroupShopping />} />
            <Route path="/products" element={<Products />} />
            <Route path="/voice-assistant" element={<VoiceAssistant />} />
            <Route path="/delivery-tracking" element={<DeliveryTracking />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;