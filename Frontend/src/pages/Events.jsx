import { motion } from 'framer-motion';

const Events = () => {
  const events = [
    {
      id: 1,
      title: "Truffle & Wine Tasting",
      date: "November 15, 2026",
      time: "7:00 PM",
      description: "An exclusive evening featuring a five-course tasting menu centered around seasonal white truffles, perfectly paired with vintage wines.",
      image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=2940&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "Chef's Table Collaboration",
      date: "December 5, 2026",
      time: "8:00 PM",
      description: "Join our Head Chef and a special guest Michelin-starred chef for a radical ten-course collaborative experience.",
      image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=2874&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "New Year's Eve Gala",
      date: "December 31, 2026",
      time: "9:00 PM",
      description: "Ring in the new year with an opulent midnight feast, champagne towers, and live avant-garde jazz.",
      image: "https://images.unsplash.com/photo-1519671482749-fd098f3b2323?q=80&w=2940&auto=format&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-[#f5f5f5] selection:bg-[#c5a059]/30 pt-40 pb-32 px-6 md:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-24 text-center md:text-left"
        >
          <span className="text-[10px] uppercase tracking-[0.4em] text-[#c5a059] mb-4 block">Experiences</span>
          <h1 className="font-['EB_Garamond'] text-5xl md:text-7xl text-white/90 font-medium">
            Upcoming <span className="italic text-white/50">Events</span>
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: index * 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl mb-8">
                <div className="absolute inset-0 bg-[#050505]/20 group-hover:bg-transparent transition-colors duration-700 z-10"></div>
                <img 
                  src={event.image} 
                  alt={event.title} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-[0.16,1,0.3,1]"
                />
                <div className="absolute top-6 left-6 z-20">
                  <div className="bg-[#050505]/80 backdrop-blur-md border border-white/10 px-4 py-2 text-[10px] uppercase tracking-widest text-[#c5a059]">
                    {event.date}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-['EB_Garamond'] text-2xl text-white/90 group-hover:text-[#c5a059] transition-colors duration-500">
                  {event.title}
                </h3>
                <span className="text-xs tracking-widest text-white/40 pt-1">{event.time}</span>
              </div>
              
              <p className="text-white/40 text-sm font-light leading-relaxed mb-6">
                {event.description}
              </p>
              
              <button className="text-[10px] uppercase tracking-[0.3em] text-white hover:text-[#c5a059] transition-colors border-b border-white/20 hover:border-[#c5a059] pb-1">
                Reserve Seats
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Events;
