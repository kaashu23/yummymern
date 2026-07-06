import { motion } from 'framer-motion';

const Contact = () => {
  return (
    <div className="min-h-screen bg-[#050505] text-[#f5f5f5] selection:bg-[#c5a059]/30 pt-40 pb-32 px-6 md:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20">
        
        {/* Left Side: Info */}
        <div className="w-full lg:w-1/2">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="mb-16"
          >
            <span className="text-[10px] uppercase tracking-[0.4em] text-[#c5a059] mb-4 block">Connect</span>
            <h1 className="font-['EB_Garamond'] text-5xl md:text-7xl text-white/90 font-medium leading-tight">
              Get in <span className="italic text-white/50">Touch</span>
            </h1>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12"
          >
            <div>
              <h3 className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-4">Location</h3>
              <p className="font-['EB_Garamond'] text-2xl text-white/80 mb-2">124 Gastronomy Ave</p>
              <p className="text-sm font-light text-white/40">New York, NY 10012</p>
            </div>
            
            <div>
              <h3 className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-4">Reservations</h3>
              <p className="font-['EB_Garamond'] text-2xl text-white/80 mb-2">+1 (555) 123-4567</p>
              <p className="text-sm font-light text-white/40 hover:text-white transition-colors cursor-pointer">reservations@yummy.com</p>
            </div>

            <div>
              <h3 className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-4">Hours</h3>
              <div className="space-y-2 text-sm font-light text-white/60">
                <p><span className="text-white/40 mr-4">Tue-Thu</span> 5:30 PM - 10:00 PM</p>
                <p><span className="text-white/40 mr-4">Fri-Sat</span> 5:00 PM - 11:30 PM</p>
                <p><span className="text-white/40 mr-4">Sun-Mon</span> Closed</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Form */}
        <div className="w-full lg:w-1/2">
          <motion.form 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="bg-[#0a0a0a] border border-white/5 p-8 md:p-12 rounded-2xl flex flex-col gap-8"
          >
            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase tracking-[0.2em] text-white/40">Name</label>
              <input 
                type="text" 
                className="w-full bg-transparent border-b border-white/10 focus:border-[#c5a059] outline-none py-3 text-white transition-colors"
                placeholder="John Doe"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase tracking-[0.2em] text-white/40">Email</label>
              <input 
                type="email" 
                className="w-full bg-transparent border-b border-white/10 focus:border-[#c5a059] outline-none py-3 text-white transition-colors"
                placeholder="john@example.com"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase tracking-[0.2em] text-white/40">Subject</label>
              <input 
                type="text" 
                className="w-full bg-transparent border-b border-white/10 focus:border-[#c5a059] outline-none py-3 text-white transition-colors"
                placeholder="Private Dining Inquiry"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase tracking-[0.2em] text-white/40">Message</label>
              <textarea 
                rows="4"
                className="w-full bg-transparent border-b border-white/10 focus:border-[#c5a059] outline-none py-3 text-white transition-colors resize-none"
                placeholder="How can we help you?"
              ></textarea>
            </div>
            
            <button type="submit" className="mt-4 bg-white text-[#050505] font-bold text-[10px] uppercase tracking-[0.2em] py-4 rounded-full hover:bg-[#c5a059] hover:text-white transition-colors duration-500 w-full md:w-auto md:px-12 md:self-start">
              Send Message
            </button>
          </motion.form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
