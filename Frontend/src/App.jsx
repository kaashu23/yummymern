import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import Home from './pages/Home';
import Menu from './pages/Menu';
import MenuItemDetail from './pages/MenuItemDetail';
import Reservation from './pages/Reservation';
import MyReservations from './pages/MyReservations';
import OrderOnline from './pages/OrderOnline';
import OrderCheckout from './pages/OrderCheckout';
import MyOrders from './pages/MyOrders';
import About from './pages/About';
import Gallery from './pages/Gallery';
import Events from './pages/Events';
import Chefs from './pages/Chefs';
import Contact from './pages/Contact';
import LeaveReview from './pages/LeaveReview';
import NotFound from './pages/NotFound';

// Admin Imports
import AdminLayout from './pages/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import AdminReservations from './pages/admin/AdminReservations';
import AdminTables from './pages/admin/AdminTables';
import AdminMenu from './pages/admin/AdminMenu';
import AdminCategories from './pages/admin/AdminCategories';
import AdminOrders from './pages/admin/AdminOrders';
import AdminEvents from './pages/admin/AdminEvents';
import AdminChefs from './pages/admin/AdminChefs';
import AdminGallery from './pages/admin/AdminGallery';
import AdminTestimonials from './pages/admin/AdminTestimonials';
import AdminMessages from './pages/admin/AdminMessages';

import ChatWidget from './components/ChatWidget';
import { Toaster } from 'react-hot-toast';

function App() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <div className={`font-['Manrope'] text-[#f5f5f5] selection:bg-[#c5a059]/30 ${isAdmin ? 'bg-[#050505]' : ''}`}>
      <Toaster position="top-center" toastOptions={{ style: { background: '#0a0a0a', color: '#f5f5f5', border: '1px solid rgba(255,255,255,0.1)' } }} />
      {!isAdmin && <Navbar />}
      
      <main className={isAdmin ? 'h-screen' : 'min-h-screen bg-[#050505]'}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
            <Route path="/menu" element={<PageWrapper><Menu /></PageWrapper>} />
            <Route path="/menu/:id" element={<PageWrapper><MenuItemDetail /></PageWrapper>} />
            <Route path="/reservation" element={<PageWrapper><Reservation /></PageWrapper>} />
            <Route path="/my-reservations" element={<PageWrapper><MyReservations /></PageWrapper>} />
            <Route path="/order-online" element={<PageWrapper><OrderOnline /></PageWrapper>} />
            <Route path="/order-checkout" element={<PageWrapper><OrderCheckout /></PageWrapper>} />
            <Route path="/my-orders" element={<PageWrapper><MyOrders /></PageWrapper>} />
            <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
            <Route path="/gallery" element={<PageWrapper><Gallery /></PageWrapper>} />
            <Route path="/events" element={<PageWrapper><Events /></PageWrapper>} />
            <Route path="/chefs" element={<PageWrapper><Chefs /></PageWrapper>} />
            <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
            <Route path="/leave-review" element={<PageWrapper><LeaveReview /></PageWrapper>} />
            <Route path="*" element={<PageWrapper><NotFound /></PageWrapper>} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="reservations" element={<AdminReservations />} />
              <Route path="tables" element={<AdminTables />} />
              <Route path="menu" element={<AdminMenu />} />
              <Route path="categories" element={<AdminCategories />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="events" element={<AdminEvents />} />
              <Route path="chefs" element={<AdminChefs />} />
              <Route path="gallery" element={<AdminGallery />} />
              <Route path="testimonials" element={<AdminTestimonials />} />
              <Route path="messages" element={<AdminMessages />} />
            </Route>
          </Routes>
        </AnimatePresence>
      </main>
      
      <Footer />
      <ChatWidget />
    </div>
  );
}

const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
);

export default App;
