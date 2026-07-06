import { motion } from 'framer-motion';

const OrderOnline = () => {
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

          <div className="flex flex-col gap-8">
            {[
              { id: 1, name: "Wagyu A5 Striploin", desc: "Served with smoked black garlic purée.", price: 120 },
              { id: 2, name: "Truffle Risotto", desc: "Wild mushrooms and aged parmesan.", price: 45 },
              { id: 3, name: "Yuzu Cheesecake", desc: "Burnt butter crumb, citrus glaze.", price: 18 }
            ].map((item, idx) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                className="flex justify-between items-center p-6 border border-white/5 bg-[#0a0a0a] rounded-2xl hover:border-white/20 transition-colors group"
              >
                <div>
                  <h3 className="font-['EB_Garamond'] text-2xl text-white/90">{item.name}</h3>
                  <p className="text-sm font-light text-white/50 mt-1">{item.desc}</p>
                </div>
                <div className="flex items-center gap-6">
                  <span className="font-['EB_Garamond'] text-xl text-[#c5a059]">${item.price}</span>
                  <button className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-[#050505] hover:bg-[#c5a059] hover:border-[#c5a059] transition-all">
                    +
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
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
            
            <div className="flex flex-col gap-4 mb-8">
              <div className="flex justify-between items-center">
                <span className="text-sm text-white/90">Wagyu A5 Striploin</span>
                <span className="text-sm text-white/50">$120</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-white/90">Yuzu Cheesecake</span>
                <span className="text-sm text-white/50">$18</span>
              </div>
            </div>
            
            <div className="border-t border-white/10 pt-6 space-y-3 mb-8">
              <div className="flex justify-between text-sm text-white/50">
                <span>Subtotal</span>
                <span>$138</span>
              </div>
              <div className="flex justify-between text-sm text-white/50">
                <span>Taxes & Fees</span>
                <span>$12.50</span>
              </div>
              <div className="flex justify-between text-xl font-['EB_Garamond'] text-[#c5a059] mt-4 pt-4 border-t border-white/5">
                <span>Total</span>
                <span>$150.50</span>
              </div>
            </div>

            <button className="w-full py-4 bg-white text-[#050505] text-[10px] uppercase tracking-[0.2em] font-bold rounded-full hover:bg-[#c5a059] hover:text-white transition-colors duration-500">
              Proceed to Checkout
            </button>
          </motion.div>
        </div>

      </div>
    </div>
  );
};

export default OrderOnline;
