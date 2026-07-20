import { useEffect } from 'react';
import { Outlet, Link, useLocation, Navigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import toast from 'react-hot-toast';

const AdminLayout = () => {
  const { user, isLoaded } = useUser();
  const location = useLocation();

  if (isLoaded && !user) {
    return <Navigate to="/" replace />;
  }

  const isAdmin = user?.publicMetadata?.role === 'admin' || user?.primaryEmailAddress?.emailAddress === 'kashishsalvi06@gmail.com';

  if (isLoaded && user && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  const role = user?.publicMetadata?.role || (user?.primaryEmailAddress?.emailAddress === 'kashishsalvi06@gmail.com' ? 'super_admin' : 'admin');

  useEffect(() => {
    // Setup Socket.io for Real-Time notifications
    import('socket.io-client').then(({ io }) => {
      const socket = io(import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000');
      
      socket.on('connect', () => {
        socket.emit('join_admin');
      });

      socket.on('new_order', (order) => {
        toast.success(`New Order Received! ID: ${order._id.substring(0, 6)}`, {
          icon: '🛎️',
          duration: 5000,
        });
      });

      return () => socket.disconnect();
    });
  }, []);

  const navLinks = [
    { name: "Overview", path: "/admin/dashboard", icon: "dashboard", roles: ['super_admin', 'admin'] },
    { name: "Reservations", path: "/admin/reservations", icon: "event_seat", roles: ['super_admin', 'admin', 'host'] },
    { name: "Tables", path: "/admin/tables", icon: "table_restaurant", roles: ['super_admin', 'admin', 'host'] },
    { name: "Menu", path: "/admin/menu", icon: "restaurant_menu", roles: ['super_admin', 'admin'] },
    { name: "Categories", path: "/admin/categories", icon: "category", roles: ['super_admin', 'admin'] },
    { name: "Orders", path: "/admin/orders", icon: "local_shipping", roles: ['super_admin', 'admin', 'chef'] },
    { name: "Events", path: "/admin/events", icon: "celebration", roles: ['super_admin', 'admin'] },
    { name: "Chefs", path: "/admin/chefs", icon: "outdoor_grill", roles: ['super_admin', 'admin'] },
    { name: "Gallery", path: "/admin/gallery", icon: "collections", roles: ['super_admin', 'admin'] },
    { name: "Testimonials", path: "/admin/testimonials", icon: "reviews", roles: ['super_admin', 'admin'] },
    { name: "Messages", path: "/admin/messages", icon: "mail", roles: ['super_admin', 'admin', 'host'] },
  ].filter(link => link.roles.includes(role));

  return (
    <div className="flex h-screen w-full bg-[#050505] text-[#f5f5f5] font-['Manrope'] selection:bg-[#c5a059]/30 overflow-hidden">
      {/* Noise Texture */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

      {/* SideNavBar */}
      <aside className="hidden md:flex flex-col h-full w-64 bg-[#0a0a0a] border-r border-white/5 p-6 gap-6 z-10 relative overflow-y-auto custom-scrollbar">
        <div className="mb-4 mt-4">
          <h1 className="font-['EB_Garamond'] text-3xl text-white/90 italic">Sanctuary</h1>
          <p className="text-[10px] uppercase tracking-[0.4em] text-[#c5a059] mt-2">Command Center</p>
        </div>
        
        <nav className="flex-1 flex flex-col gap-1">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link 
                key={link.name} 
                to={link.path} 
                className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 ${isActive ? 'bg-white/5 border border-white/10 text-[#c5a059]' : 'text-white/40 hover:bg-white/[0.02] hover:text-white border border-transparent'}`}
              >
                <span className="material-symbols-outlined text-[18px]">{link.icon}</span>
                <span className="text-xs tracking-wider">{link.name}</span>
              </Link>
            );
          })}
          
          {/* Divider */}
          <div className="h-px w-full bg-white/10 my-4"></div>
          
          {/* Return to Site */}
          <Link 
            to="/" 
            className="flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 text-white/40 hover:bg-white/[0.02] hover:text-white border border-transparent"
          >
            <span className="material-symbols-outlined text-[18px]">public</span>
            <span className="text-xs tracking-wider">Return to Site</span>
          </Link>
        </nav>
        
        <div className="mt-auto pt-6 border-t border-white/10 flex flex-col gap-4">
          <div className="flex items-center gap-3 px-2">
            <div className="w-10 h-10 rounded-full border border-[#c5a059] overflow-hidden">
              <img className="w-full h-full object-cover" alt="Admin user" src={user?.imageUrl || "https://lh3.googleusercontent.com/aida-public/AB6AXuAq3J84GkxMelLGtgKcmYYckOiH5JIv7HLMB5998n0kTRjFK2OS9qMo4qoAdmvx5RNKJmMoTVJWNyad9Y0PNmNT2DwjXt50AnAak4NQLUAuwn-tbm3xGYxI-Hg5b3DFYyJ8IoQ0wBTvkjG3xlrSoXRLcv4zgXPV_R7ydnWsUhksGIjz2OAOSeUreAjFkYWuDuwb_FtnEiAYjw3y0POGWP9B7lsZiUNH2oy_F1CO5tyswzaMNj8-St-EnMqL1yukL9_XCWGtnLZMkX0d"}/>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-white/90">{user?.firstName || 'Executive'}</p>
              <p className="text-[9px] text-white/40 mt-1 font-['EB_Garamond'] italic">Maitre D'</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Canvas */}
      <main className="flex-1 h-full overflow-y-auto relative custom-scrollbar pb-16 z-10">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
