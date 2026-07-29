import { Link, useNavigate } from 'react-router-dom';
import { useUser, SignedIn, SignedOut, UserButton, useClerk } from '@clerk/clerk-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const Navbar = () => {
  const { user } = useUser();
  const { openSignIn } = useClerk();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const isAdmin = 
    user?.publicMetadata?.role === 'admin' || 
    user?.primaryEmailAddress?.emailAddress === 'kashishsalvi06@gmail.com';

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className="fixed top-0 w-full z-50 flex justify-between items-center px-6 md:px-16 py-4 md:py-6 backdrop-blur-md bg-[#050505]/70 border-b border-white/5 pointer-events-auto"
      >
        <Link to="/" className="font-['EB_Garamond'] text-2xl md:text-3xl tracking-tight text-white/90 hover:text-[#c5a059] transition-colors duration-500">
          YUMMY
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10">
          <Link className="font-['Manrope'] text-[10px] uppercase tracking-[0.2em] text-white/60 hover:text-white transition-colors duration-500" to="/menu">Menu</Link>
          <Link className="font-['Manrope'] text-[10px] uppercase tracking-[0.2em] text-white/60 hover:text-white transition-colors duration-500" to="/events">Events</Link>
          <Link className="font-['Manrope'] text-[10px] uppercase tracking-[0.2em] text-white/60 hover:text-white transition-colors duration-500" to="/chefs">Chefs</Link>
          <Link className="font-['Manrope'] text-[10px] uppercase tracking-[0.2em] text-white/60 hover:text-white transition-colors duration-500" to="/gallery">Gallery</Link>
          <Link className="font-['Manrope'] text-[10px] uppercase tracking-[0.2em] text-white/60 hover:text-white transition-colors duration-500" to="/about">Story</Link>
          <Link className="font-['Manrope'] text-[10px] uppercase tracking-[0.2em] text-white/60 hover:text-white transition-colors duration-500" to="/contact">Contact</Link>
          {isAdmin && (
            <Link className="font-['Manrope'] text-[10px] uppercase tracking-[0.2em] text-[#c5a059] hover:text-white transition-colors duration-500" to="/admin/dashboard">Admin</Link>
          )}
        </nav>

        {/* Actions & Mobile Toggle */}
        <div className="flex items-center gap-4 md:gap-6">
          <SignedIn>
            <button onClick={() => navigate('/my-orders')} className="hidden lg:block text-[10px] uppercase tracking-widest text-white/50 hover:text-white transition-colors">Orders</button>
            <button onClick={() => navigate('/my-reservations')} className="hidden lg:block text-[10px] uppercase tracking-widest text-white/50 hover:text-white transition-colors">Bookings</button>
            <UserButton appearance={{ elements: { avatarBox: "w-7 h-7 md:w-8 md:h-8 rounded-full border border-white/20" } }} />
          </SignedIn>
          <SignedOut>
            <button onClick={() => openSignIn()} className="font-['Manrope'] text-[10px] md:text-xs uppercase tracking-[0.2em] text-[#c5a059] md:text-white/60 hover:text-white transition-colors duration-500 mr-2 md:mr-0">Login</button>
          </SignedOut>
          <button onClick={() => navigate('/order-online')} className="font-['Manrope'] text-[10px] md:text-xs uppercase tracking-[0.2em] text-white bg-transparent border border-white/20 px-6 py-3 rounded-full hover:bg-white hover:text-[#050505] transition-all duration-500 hidden lg:block">
            Order Online
          </button>
          
          <button 
            className="md:hidden text-white/80 p-2"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <span className="material-symbols-outlined text-2xl">menu</span>
          </button>
          
          <button onClick={() => navigate('/reservation')} className="font-['Manrope'] text-[10px] md:text-xs uppercase tracking-[0.2em] text-[#050505] bg-white px-4 md:px-6 py-2 md:py-3 rounded-full hover:bg-[#c5a059] hover:text-white transition-all duration-500 font-bold border border-transparent hover:border-white/20 hidden md:block">
            Book Table
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-[#050505]/95 backdrop-blur-xl flex flex-col pt-24 px-8 pb-8 overflow-y-auto"
          >
            <button 
              className="absolute top-6 right-6 text-white/50 hover:text-white p-2"
              onClick={closeMenu}
            >
              <span className="material-symbols-outlined text-3xl">close</span>
            </button>
            
            <nav className="flex flex-col gap-8 mt-10">
              <Link onClick={closeMenu} className="font-['EB_Garamond'] text-4xl text-white/90 hover:text-[#c5a059] transition-colors" to="/">Home</Link>
              <Link onClick={closeMenu} className="font-['EB_Garamond'] text-4xl text-white/90 hover:text-[#c5a059] transition-colors" to="/menu">Menu</Link>
              <Link onClick={closeMenu} className="font-['EB_Garamond'] text-4xl text-white/90 hover:text-[#c5a059] transition-colors" to="/reservation">Reservations</Link>
              <Link onClick={closeMenu} className="font-['EB_Garamond'] text-4xl text-white/90 hover:text-[#c5a059] transition-colors" to="/order-online">Order Online</Link>
              <Link onClick={closeMenu} className="font-['EB_Garamond'] text-4xl text-white/90 hover:text-[#c5a059] transition-colors" to="/chefs">Chefs</Link>
              <Link onClick={closeMenu} className="font-['EB_Garamond'] text-4xl text-white/90 hover:text-[#c5a059] transition-colors" to="/gallery">Gallery</Link>
              <Link onClick={closeMenu} className="font-['EB_Garamond'] text-4xl text-white/90 hover:text-[#c5a059] transition-colors" to="/about">Story</Link>
              <Link onClick={closeMenu} className="font-['EB_Garamond'] text-4xl text-white/90 hover:text-[#c5a059] transition-colors" to="/contact">Contact</Link>
              
              <SignedIn>
                <div className="h-[1px] w-full bg-white/10 my-4"></div>
                <Link onClick={closeMenu} className="font-['Manrope'] text-xs uppercase tracking-[0.2em] text-white/50 hover:text-white" to="/my-orders">My Orders</Link>
                <Link onClick={closeMenu} className="font-['Manrope'] text-xs uppercase tracking-[0.2em] text-white/50 hover:text-white" to="/my-reservations">My Bookings</Link>
                {isAdmin && (
                  <Link onClick={closeMenu} className="font-['Manrope'] text-xs uppercase tracking-[0.2em] text-[#c5a059] hover:text-white" to="/admin/dashboard">Admin Dashboard</Link>
                )}
              </SignedIn>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
