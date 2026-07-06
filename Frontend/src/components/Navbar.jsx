import { Link, useNavigate } from 'react-router-dom';
import { useUser, SignedIn, SignedOut, UserButton, useClerk } from '@clerk/clerk-react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const { user } = useUser();
  const { openSignIn } = useClerk();
  const navigate = useNavigate();
  const isAdmin = 
    user?.publicMetadata?.role === 'admin' || 
    user?.primaryEmailAddress?.emailAddress === 'kashishsalvi06@gmail.com';

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className="fixed top-0 w-full z-50 flex justify-between items-center px-8 md:px-16 py-6 backdrop-blur-md bg-[#050505]/70 border-b border-white/5 pointer-events-auto"
    >
      <Link to="/" className="font-['EB_Garamond'] text-3xl tracking-tight text-white/90 hover:text-[#c5a059] transition-colors duration-500">
        YUMMY
      </Link>
      
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

      <div className="flex items-center gap-4 md:gap-6">
        <SignedIn>
          <button onClick={() => navigate('/my-orders')} className="hidden lg:block text-[10px] uppercase tracking-widest text-white/50 hover:text-white transition-colors">Orders</button>
          <button onClick={() => navigate('/my-reservations')} className="hidden lg:block text-[10px] uppercase tracking-widest text-white/50 hover:text-white transition-colors">Bookings</button>
          <UserButton appearance={{ elements: { avatarBox: "w-8 h-8 rounded-full border border-white/20" } }} />
        </SignedIn>
        <SignedOut>
          <button onClick={() => openSignIn()} className="font-['Manrope'] text-xs uppercase tracking-[0.2em] text-white/60 hover:text-white transition-colors duration-500 hidden md:block">Login</button>
        </SignedOut>
        <button onClick={() => navigate('/order-online')} className="font-['Manrope'] text-[10px] md:text-xs uppercase tracking-[0.2em] text-white bg-transparent border border-white/20 px-6 py-3 rounded-full hover:bg-white hover:text-[#050505] transition-all duration-500 hidden lg:block">
          Order Online
        </button>
        <button onClick={() => navigate('/reservation')} className="font-['Manrope'] text-[10px] md:text-xs uppercase tracking-[0.2em] text-[#050505] bg-white px-6 py-3 rounded-full hover:bg-[#c5a059] hover:text-white transition-all duration-500 font-bold border border-transparent hover:border-white/20">
          Book Table
        </button>
      </div>
    </motion.header>
  );
};

export default Navbar;
