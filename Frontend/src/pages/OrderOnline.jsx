import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import api from '../utils/axios';

const OrderOnline = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const res = await api.get('/menu');
      setMenuItems(res.data);
    } catch (error) {
      console.error('Failed to fetch menu:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  const subtotal = cart.reduce((acc, item) => acc + item.price, 0);
  const taxes = subtotal * 0.09; // 9% tax
  const total = subtotal + taxes;

  const handleCheckout = () => {
    if (cart.length > 0) {
      navigate('/order-checkout', { state: { cart, subtotal, taxes, total } });
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#f5f5f5] selection:bg-[#c5a059]/30 pt-40 pb-32 px-6 md:px-16 overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-16">
        
        {/* Menu Side */}
        <div className="flex-1">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="mb-16"
          >
            <span className="text-[10px] uppercase tracking-[0.4em] text-[#c5a059] mb-4 block">Yummy at Home</span>
            <h1 className="font-['EB_Garamond'] text-5xl md:text-6xl text-white/90 font-medium">
              Order <span className="italic text-white/50">Online</span>
            </h1>
          </motion.div>

          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div 
                key="loader"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col gap-8"
              >
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex justify-between items-center p-6 border border-white/5 bg-[#0a0a0a] rounded-2xl animate-pulse">
                    <div className="flex flex-col gap-3 w-full max-w-md">
                      <div className="h-6 w-48 bg-white/10 rounded"></div>
                      <div className="h-3 w-3/4 bg-white/5 rounded mt-1"></div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="h-6 w-16 bg-[#c5a059]/20 rounded"></div>
                      <div className="w-10 h-10 rounded-full bg-white/5"></div>
                    </div>
                  </div>
                ))}
              </motion.div>
            ) : (
              <motion.div key="menuList" className="flex flex-col gap-8">
                {menuItems.map((item, idx) => (
                  <motion.div 
                    key={item._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: idx * 0.1 }}
                    className="flex justify-between items-center p-6 border border-white/5 bg-[#0a0a0a] rounded-2xl hover:border-white/20 transition-colors group"
                  >
                    <div>
                      <h3 className="font-['EB_Garamond'] text-2xl text-white/90">{item.name}</h3>
                      <p className="text-sm font-light text-white/50 mt-1">{item.description}</p>
                    </div>
                    <div className="flex items-center gap-6">
                      <span className="font-['EB_Garamond'] text-xl text-[#c5a059]">₹{(item.price || 0).toLocaleString()}</span>
                      <button 
                        onClick={() => addToCart(item)}
                        className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-[#050505] hover:bg-[#c5a059] hover:border-[#c5a059] transition-all"
                      >
                        +
                      </button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Cart Sidebar */}
        <div className="w-full md:w-96">
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="sticky top-32 bg-[#0a0a0a] border border-white/10 p-8 rounded-2xl"
          >
            <h3 className="text-xs uppercase tracking-[0.3em] text-white/60 border-b border-white/10 pb-4 mb-6">Your Order</h3>
            
            <div className="flex flex-col gap-4 mb-8 min-h-[100px]">
              {cart.length === 0 ? (
                <span className="text-sm text-white/30 italic font-['EB_Garamond']">Your cart is empty.</span>
              ) : (
                cart.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center">
                    <span className="text-sm text-white/90">{item.name}</span>
                    <span className="text-sm text-white/50">₹{(item.price || 0).toLocaleString()}</span>
                  </div>
                ))
              )}
            </div>
            
            <div className="border-t border-white/10 pt-6 space-y-3 mb-8">
              <div className="flex justify-between text-sm text-white/50">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
              </div>
              <div className="flex justify-between text-sm text-white/50">
                <span>Taxes & Fees</span>
                <span>₹{taxes.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
              </div>
              <div className="flex justify-between text-xl font-['EB_Garamond'] text-[#c5a059] mt-4 pt-4 border-t border-white/5">
                <span>Total</span>
                <span>₹{total.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
              </div>
            </div>

            <button 
              onClick={handleCheckout}
              disabled={cart.length === 0}
              className={`w-full py-4 text-[10px] uppercase tracking-[0.2em] font-bold rounded-full transition-colors duration-500 ${cart.length === 0 ? 'bg-white/10 text-white/30 cursor-not-allowed' : 'bg-white text-[#050505] hover:bg-[#c5a059] hover:text-white'}`}
            >
              Proceed to Checkout
            </button>
          </motion.div>
        </div>

      </div>
    </div>
  );
};

export default OrderOnline;
