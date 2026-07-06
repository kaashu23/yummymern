import { Routes, Route, useLocation } from 'react-router-dom';
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

import { Toaster } from 'react-hot-toast';

function App() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <div className={`font-['Manrope'] text-[#f5f5f5] selection:bg-[#c5a059]/30 ${isAdmin ? 'bg-[#050505]' : ''}`}>
      <Toaster position="top-center" toastOptions={{ style: { background: '#0a0a0a', color: '#f5f5f5', border: '1px solid rgba(255,255,255,0.1)' } }} />
      {!isAdmin && <Navbar />}
      
      <main className={isAdmin ? 'h-screen' : 'min-h-screen bg-[#050505]'}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/menu/:id" element={<MenuItemDetail />} />
          <Route path="/reservation" element={<Reservation />} />
          <Route path="/my-reservations" element={<MyReservations />} />
          <Route path="/order-online" element={<OrderOnline />} />
          <Route path="/order-checkout" element={<OrderCheckout />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/about" element={<About />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/events" element={<Events />} />
          <Route path="/chefs" element={<Chefs />} />
          <Route path="/contact" element={<Contact />} />
          
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
      </main>
      
      {!isAdmin && <Footer />}
    </div>
  );
}

export default App;
