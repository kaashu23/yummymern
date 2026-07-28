import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';

const AdminMenu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const { getToken } = useAuth();
  
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    isAvailable: true,
    isVeg: false,
    image: null
  });

  const fetchItems = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${apiUrl}/menu`);
      const data = await res.json();
      setMenuItems(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedMenuItems = [...menuItems].sort((a, b) => {
    if (!sortConfig.key) return 0;
    
    let valA = a[sortConfig.key];
    let valB = b[sortConfig.key];

    if (sortConfig.key === 'categoryName') {
      valA = a.category?.name || '';
      valB = b.category?.name || '';
    } else if (sortConfig.key === 'price') {
      valA = Number(a.price) || 0;
      valB = Number(b.price) || 0;
    } else if (sortConfig.key === 'name') {
      valA = a.name ? a.name.toLowerCase() : '';
      valB = b.name ? b.name.toLowerCase() : '';
    }

    if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
    if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({ name: '', price: '', isAvailable: true, isVeg: false, image: null });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingId(item._id);
    setFormData({ 
      name: item.name, 
      price: item.price, 
      isAvailable: item.isAvailable, 
      isVeg: item.isVeg,
      image: null
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this menu item?")) return;
    try {
      toast.loading("Deleting...", { id: 'delete' });
      const token = await getToken();
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${apiUrl}/menu/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        toast.success("Deleted successfully", { id: 'delete' });
        fetchItems();
      } else {
        toast.error("Failed to delete", { id: 'delete' });
      }
    } catch (err) {
      console.error(err);
      toast.error("Error deleting", { id: 'delete' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      toast.loading(editingId ? "Updating..." : "Adding...", { id: 'save-item' });
      const token = await getToken();
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      
      const url = editingId ? `${apiUrl}/menu/${editingId}` : `${apiUrl}/menu`;
      const method = editingId ? 'PUT' : 'POST';

      const fd = new FormData();
      fd.append('name', formData.name);
      fd.append('price', formData.price);
      fd.append('isAvailable', formData.isAvailable);
      fd.append('isVeg', formData.isVeg);
      if (formData.image) {
        fd.append('image', formData.image);
      }

      const res = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: fd
      });
      
      if (res.ok) {
        toast.success(editingId ? "Updated successfully!" : "Added successfully!", { id: 'save-item' });
        setIsModalOpen(false);
        fetchItems();
      } else {
        const errorData = await res.json();
        toast.error(`Failed to save: ${errorData.message || 'Unknown error'}`, { id: 'save-item' });
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred", { id: 'save-item' });
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 md:p-12 space-y-12">
      <motion.header 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6"
      >
        <div>
          <h2 className="font-['EB_Garamond'] text-4xl text-white/90 italic">Menu Items</h2>
          <p className="text-sm font-light text-white/50 mt-2">Manage the culinary offerings and availability.</p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full md:w-auto mt-4 md:mt-0">
          <input 
            type="text" 
            placeholder="Search menu..."
            className="bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-3 text-sm text-white/70 focus:border-[#c5a059] outline-none transition-colors w-full sm:w-64"
          />
          <button onClick={handleOpenAdd} className="px-6 py-3 bg-[#c5a059] text-[#050505] rounded-lg hover:bg-white transition-colors text-xs uppercase tracking-[0.2em] font-bold whitespace-nowrap flex-shrink-0">
            + Add Item
          </button>
        </div>
      </motion.header>

      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="bg-[#0a0a0a] rounded-2xl border border-white/5 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white/[0.02]">
                <th onClick={() => handleSort('name')} className="px-8 py-4 text-[10px] uppercase tracking-[0.2em] text-white/30 cursor-pointer hover:text-white/60">Item {sortConfig.key === 'name' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}</th>
                <th onClick={() => handleSort('categoryName')} className="px-8 py-4 text-[10px] uppercase tracking-[0.2em] text-white/30 cursor-pointer hover:text-white/60">Category {sortConfig.key === 'categoryName' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}</th>
                <th onClick={() => handleSort('price')} className="px-8 py-4 text-[10px] uppercase tracking-[0.2em] text-white/30 cursor-pointer hover:text-white/60">Price {sortConfig.key === 'price' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}</th>
                <th onClick={() => handleSort('isAvailable')} className="px-8 py-4 text-[10px] uppercase tracking-[0.2em] text-white/30 cursor-pointer hover:text-white/60">Status {sortConfig.key === 'isAvailable' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}</th>
                <th className="px-8 py-4 text-[10px] uppercase tracking-[0.2em] text-white/30 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {sortedMenuItems.map((item, idx) => (
                <tr key={item._id || idx} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-8 py-6">
                    <div className="text-sm text-white/90">{item.name}</div>
                  </td>
                  <td className="px-8 py-6 text-sm text-white/60">{item.category?.name || 'Uncategorized'}</td>
                  <td className="px-8 py-6 text-sm text-white/60">₹{item.price}</td>
                  <td className="px-8 py-6">
                    <span className={`px-3 py-1 rounded-full text-[9px] uppercase tracking-widest ${item.isAvailable ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'}`}>
                      {item.isAvailable ? 'Available' : "86'd"}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button onClick={() => handleOpenEdit(item)} className="text-xs text-[#c5a059] hover:text-white mr-4 transition-colors">Edit</button>
                    <button onClick={() => handleDelete(item._id)} className="text-xs text-red-400 hover:text-red-300 transition-colors">Delete</button>
                  </td>
                </tr>
              ))}
              {menuItems.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-8 py-6 text-center text-sm text-white/50">No menu items found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.section>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 sm:p-8 w-[95%] md:w-[600px] max-h-[90vh] overflow-y-auto flex flex-col"
            >
              <h3 className="font-['EB_Garamond'] text-3xl text-white/90 italic mb-6">
                {editingId ? "Edit Menu Item" : "Add Menu Item"}
              </h3>
              <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">
                <div className="flex flex-col">
                  <label className="text-xs uppercase tracking-widest text-white/50 mb-2">Item Name</label>
                  <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-transparent border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#c5a059] outline-none" />
                </div>
                <div className="flex flex-col">
                  <label className="text-xs uppercase tracking-widest text-white/50 mb-2">Price (₹)</label>
                  <input required type="number" min="0" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full bg-transparent border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#c5a059] outline-none" />
                </div>
                <div className="flex flex-col">
                  <label className="text-xs uppercase tracking-widest text-white/50 mb-2">Image {editingId && "(Optional to replace)"}</label>
                  <input type="file" accept="image/*" onChange={e => setFormData({...formData, image: e.target.files[0]})} className="w-full bg-transparent border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#c5a059] outline-none" />
                </div>
                <div className="flex flex-col sm:flex-row gap-6 mt-2">
                  <label className="flex items-center gap-3 text-sm text-white/70 cursor-pointer">
                    <input type="checkbox" checked={formData.isAvailable} onChange={e => setFormData({...formData, isAvailable: e.target.checked})} className="w-4 h-4 accent-[#c5a059]" />
                    Available
                  </label>
                  <label className="flex items-center gap-3 text-sm text-white/70 cursor-pointer">
                    <input type="checkbox" checked={formData.isVeg} onChange={e => setFormData({...formData, isVeg: e.target.checked})} className="w-4 h-4 accent-green-500" />
                    Vegetarian
                  </label>
                </div>
                <div className="flex justify-end gap-4 mt-6 pt-6 border-t border-white/10">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-3 text-white/50 hover:text-white transition-colors text-sm font-medium">Cancel</button>
                  <button type="submit" className="px-8 py-3 bg-[#c5a059] text-[#050505] rounded-lg hover:bg-white transition-colors text-xs uppercase tracking-[0.2em] font-bold">
                    {editingId ? "Save Changes" : "Save Item"}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminMenu;
