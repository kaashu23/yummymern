import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const AdminMessages = () => {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading for UI consistency
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6 md:p-12 space-y-12">
      <motion.header 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6"
      >
        <div>
          <h2 className="font-['EB_Garamond'] text-4xl text-white/90 italic">Messages</h2>
          <p className="text-sm font-light text-white/50 mt-2">Inquiries from the contact form.</p>
        </div>
      </motion.header>

      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="bg-[#0a0a0a] rounded-2xl border border-white/5 overflow-hidden flex flex-col md:flex-row"
      >
        {/* Inbox List */}
        <div className="w-full md:w-1/3 border-r border-white/5 h-[600px] overflow-y-auto">
          {loading ? (
            [1, 2, 3, 4, 5].map(i => (
              <div key={i} className="p-6 border-b border-white/5 animate-pulse">
                <div className="flex justify-between items-center mb-2">
                  <div className="h-4 w-24 bg-white/10 rounded"></div>
                  <div className="h-3 w-12 bg-white/5 rounded"></div>
                </div>
                <div className="h-3 w-32 bg-white/5 rounded"></div>
              </div>
            ))
          ) : (
            [
              { id: 1, name: "Emily Chen", subject: "Private Event Inquiry", date: "Today", read: false },
              { id: 2, name: "Michael Roberts", subject: "Allergy Question", date: "Yesterday", read: true },
              { id: 3, name: "Jessica Alba", subject: "Reservation Update", date: "Oct 12", read: true },
            ].map((msg) => (
              <div key={msg.id} className={`p-6 border-b border-white/5 cursor-pointer hover:bg-white/[0.02] transition-colors ${!msg.read ? 'bg-white/[0.03]' : ''}`}>
                <div className="flex justify-between items-center mb-1">
                  <h4 className={`text-sm ${!msg.read ? 'text-white/90 font-bold' : 'text-white/60'}`}>{msg.name}</h4>
                  <span className="text-[10px] text-white/30">{msg.date}</span>
                </div>
                <p className={`text-xs truncate ${!msg.read ? 'text-[#c5a059]' : 'text-white/40'}`}>{msg.subject}</p>
              </div>
            ))
          )}
        </div>
        
        {/* Message Detail Pane */}
        <div className="w-full md:w-2/3 p-8 flex flex-col h-[600px]">
          {loading ? (
            <div className="animate-pulse h-full flex flex-col">
              <div className="mb-8 pb-6 border-b border-white/10">
                <div className="h-8 w-64 bg-white/10 rounded mb-4"></div>
                <div className="flex items-center gap-4">
                  <div className="h-4 w-24 bg-white/10 rounded"></div>
                  <div className="h-4 w-48 bg-white/5 rounded"></div>
                </div>
              </div>
              <div className="flex-1 space-y-4">
                <div className="h-4 w-full bg-white/5 rounded"></div>
                <div className="h-4 w-full bg-white/5 rounded"></div>
                <div className="h-4 w-3/4 bg-white/5 rounded"></div>
                <div className="h-4 w-full bg-white/5 rounded mt-8"></div>
                <div className="h-4 w-5/6 bg-white/5 rounded"></div>
              </div>
              <div className="mt-8 pt-6 border-t border-white/10 flex gap-4">
                <div className="h-10 w-24 bg-white/10 rounded-lg"></div>
                <div className="h-10 w-32 bg-white/10 rounded-lg"></div>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-8 pb-6 border-b border-white/10">
                <h3 className="font-['EB_Garamond'] text-3xl text-white/90 mb-2">Private Event Inquiry</h3>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-[#c5a059]">Emily Chen</span>
                  <span className="text-white/30">&lt;emily.chen@example.com&gt;</span>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto">
                <p className="text-sm font-light leading-relaxed text-white/60 whitespace-pre-wrap">
                  Hello,
                  
                  I am interested in hosting a private dinner for my company's executive team next month. We would have approximately 15 guests. 
                  
                  Do you offer a private dining room, and if so, what are the minimum spend requirements and available set menus?
                  
                  Thank you,
                  Emily
                </p>
              </div>
              <div className="mt-8 pt-6 border-t border-white/10 flex gap-4">
                <button className="px-6 py-3 bg-[#c5a059] text-[#050505] rounded-lg hover:bg-white transition-colors text-xs uppercase tracking-[0.2em] font-bold">
                  Reply
                </button>
                <button className="px-6 py-3 border border-white/10 text-white/60 rounded-lg hover:text-white transition-colors text-xs uppercase tracking-[0.2em]">
                  Mark as Unread
                </button>
              </div>
            </>
          )}
        </div>
      </motion.section>
    </div>
  );
};

export default AdminMessages;
