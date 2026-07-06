import { motion } from 'framer-motion';

const OrderCheckout = () => {
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
              <input type="text" placeholder="First Name" className="w-full bg-transparent border-b border-white/10 focus:border-[#c5a059] outline-none py-3 text-white transition-colors" />
              <input type="text" placeholder="Last Name" className="w-full bg-transparent border-b border-white/10 focus:border-[#c5a059] outline-none py-3 text-white transition-colors" />
              <input type="text" placeholder="Street Address" className="w-full bg-transparent border-b border-white/10 focus:border-[#c5a059] outline-none py-3 text-white transition-colors md:col-span-2" />
              <input type="text" placeholder="City" className="w-full bg-transparent border-b border-white/10 focus:border-[#c5a059] outline-none py-3 text-white transition-colors" />
              <input type="text" placeholder="ZIP Code" className="w-full bg-transparent border-b border-white/10 focus:border-[#c5a059] outline-none py-3 text-white transition-colors" />
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
            Pay $150.50 with Stripe
          </button>
        </motion.form>
      </div>
    </div>
  );
};

export default OrderCheckout;
