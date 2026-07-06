import { Link, useLocation } from 'react-router-dom';
import { SignedIn, SignedOut, UserButton, useClerk } from '@clerk/clerk-react';
import { useState, useEffect } from 'react';
import { FiMenu, FiX, FiMoon, FiSun } from 'react-icons/fi';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/themeSlice';
import { motion } from 'framer-motion';

const Navbar = () => {
  const location = useLocation();
  const { openSignIn } = useClerk();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const theme = useSelector((state) => state.theme.mode);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'Reservation', path: '/reservation' },
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled 
          ? 'py-4 bg-white/70 dark:bg-black/70 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800/50 shadow-sm' 
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group z-50">
            <motion.span 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#CE1212] to-rose-500 dark:from-red-500 dark:to-orange-500"
            >
              Yummy<span className="text-gray-900 dark:text-white">.</span>
            </motion.span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-1 bg-gray-100/50 dark:bg-white/5 backdrop-blur-md rounded-full px-4 py-2 border border-gray-200/50 dark:border-white/10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="relative px-5 py-2 text-sm font-medium rounded-full transition-colors group"
              >
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-white dark:bg-white/10 shadow-sm rounded-full -z-10"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className={`relative z-10 ${
                  location.pathname === link.path 
                    ? 'text-[#CE1212] dark:text-white' 
                    : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
                }`}>
                  {link.name}
                </span>
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <motion.button 
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleToggleTheme} 
              className="p-2 bg-gray-100 dark:bg-white/10 rounded-full text-gray-600 dark:text-gray-300 backdrop-blur-sm"
            >
              {theme === 'light' ? <FiMoon size={18} /> : <FiSun size={18} />}
            </motion.button>
            
            <SignedIn>
              <UserButton appearance={{ elements: { avatarBox: "w-10 h-10 ring-2 ring-white dark:ring-gray-800 shadow-sm" } }} />
            </SignedIn>
            <SignedOut>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => openSignIn()}
                className="px-6 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-black text-sm font-semibold rounded-full hover:shadow-lg transition-all"
              >
                Sign In
              </motion.button>
            </SignedOut>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden space-x-4 z-50">
            <button onClick={handleToggleTheme} className="p-2 text-gray-600 dark:text-gray-300">
              {theme === 'light' ? <FiMoon size={20} /> : <FiSun size={20} />}
            </button>
            <SignedIn>
              <UserButton />
            </SignedIn>
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="p-2 text-gray-900 dark:text-white"
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden absolute top-full left-0 w-full bg-white/95 dark:bg-black/95 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 py-6 px-6 flex flex-col space-y-6 shadow-2xl"
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`text-2xl font-medium ${
                location.pathname === link.path ? 'text-[#CE1212]' : 'text-gray-900 dark:text-white'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <SignedOut>
            <button 
              onClick={() => { openSignIn(); setIsOpen(false); }}
              className="mt-4 bg-gray-900 dark:bg-white text-white dark:text-black py-4 rounded-xl font-bold text-lg"
            >
              Sign In
            </button>
          </SignedOut>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
