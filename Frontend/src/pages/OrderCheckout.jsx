import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth, useUser } from '@clerk/clerk-react';
import toast from 'react-hot-toast';

const OrderCheckout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { getToken } = useAuth();
  const { user } = useUser();
  const { cart, subtotal, taxes, total } = location.state || { cart: [], subtotal: 0, taxes: 0, total: 0 };

  const handlePayment = async (e) => {
    e.preventDefault();
    if (cart.length === 0) return toast.error("Cart is empty");
    
    try {
      toast.loading("Processing order...", { id: 'checkout' });
      const token = await getToken();
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      
      const formattedItems = cart.reduce((acc, item) => {
        const existing = acc.find(i => i.menuItem === item._id);
        if (existing) {
          existing.quantity += 1;
        } else {
          acc.push({
            menuItem: item._id,
            name: item.name,
            price: item.price,
            quantity: 1
          });
        }
        return acc;
      }, []);

      const payload = {
        customerInfo: {
          name: user?.fullName || `${e.target.firstName.value} ${e.target.lastName.value}`,
          email: user?.primaryEmailAddress?.emailAddress || 'guest@example.com'
        },
        orderType: 'delivery',
        items: formattedItems,
        subtotal,
        tax: taxes,
        totalAmount: total,
        deliveryAddress: {
          street: e.target.street.value,
          city: e.target.city.value,
          zipCode: e.target.zipCode.value
        }
      };

      const response = await fetch(`${apiUrl}/orders`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      if (data.success) {
        toast.success("Payment successful! Order placed.", { id: 'checkout' });
        navigate('/my-orders');
      } else {
        toast.error("Failed to place order: " + data.message, { id: 'checkout' });
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred during checkout", { id: 'checkout' });
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#f5f5f5] selection:bg-[#c5a059]/30 pt-40 pb-32 px-6 md:px-16 overflow-hidden">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 text-center"
        >
          <span className="text-[10px] uppercase tracking-[0.4em] text-[#c5a059] mb-4 block">Final Step</span>
          <h1 className="font-['EB_Garamond'] text-4xl md:text-5xl text-white/90 font-medium">
            Complete <span className="italic text-white/50">Checkout</span>
          </h1>
        </motion.div>

        <motion.form 
          onSubmit={handlePayment}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 md:p-12 space-y-12"
        >
          {/* Order Type */}
          <div className="flex gap-4">
            <button type="button" className="flex-1 py-4 border border-[#c5a059] bg-[#c5a059]/10 text-[#c5a059] rounded-xl text-xs uppercase tracking-widest font-bold">
              Delivery
            </button>
            <button type="button" className="flex-1 py-4 border border-white/10 text-white/40 hover:text-white rounded-xl text-xs uppercase tracking-widest transition-colors">
              Pickup
            </button>
          </div>

          {/* Delivery Address */}
          <div className="space-y-6">
            <h3 className="text-xs uppercase tracking-[0.3em] text-white/60 border-b border-white/10 pb-4">Delivery Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input id="firstName" name="firstName" type="text" required placeholder="First Name" className="w-full bg-transparent border-b border-white/10 focus:border-[#c5a059] outline-none py-3 text-white transition-colors" />
              <input id="lastName" name="lastName" type="text" required placeholder="Last Name" className="w-full bg-transparent border-b border-white/10 focus:border-[#c5a059] outline-none py-3 text-white transition-colors" />
              <input id="street" name="street" type="text" required placeholder="Street Address" className="w-full bg-transparent border-b border-white/10 focus:border-[#c5a059] outline-none py-3 text-white transition-colors md:col-span-2" />
              <input id="city" name="city" type="text" required placeholder="City" className="w-full bg-transparent border-b border-white/10 focus:border-[#c5a059] outline-none py-3 text-white transition-colors" />
              <input id="zipCode" name="zipCode" type="text" required placeholder="ZIP Code" className="w-full bg-transparent border-b border-white/10 focus:border-[#c5a059] outline-none py-3 text-white transition-colors" />
            </div>
          </div>

          {/* Payment */}
          <div className="space-y-6">
            <h3 className="text-xs uppercase tracking-[0.3em] text-white/60 border-b border-white/10 pb-4">Payment</h3>
            <div className="p-6 border border-white/10 rounded-xl bg-white/5 flex items-center justify-center gap-4 text-white/40">
              <span className="material-symbols-outlined">credit_card</span>
              <span className="text-sm font-light">Stripe Checkout securely handled on next step.</span>
            </div>
          </div>

          <button type="submit" className="w-full py-5 bg-white text-[#050505] text-xs uppercase tracking-[0.2em] font-bold rounded-full hover:bg-[#c5a059] hover:text-white transition-colors duration-500 mt-8">
            Pay ₹{total.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} with Stripe
          </button>
        </motion.form>
      </div>
    </div>
  );
};

export default OrderCheckout;
