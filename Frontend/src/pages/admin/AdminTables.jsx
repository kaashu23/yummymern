import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';

const AdminTables = () => {
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const { getToken } = useAuth();
  
  const [formData, setFormData] = useState({
    tableNumber: '',
    capacity: '',
    location: 'Indoor',
    isActive: true
  });

  const fetchTables = async () => {
    try {
      setLoading(true);
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${apiUrl}/tables`);
      const data = await res.json();
      setTables(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTables();
  }, []);

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({ tableNumber: '', capacity: '', location: 'Indoor', isActive: true });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (table) => {
    setEditingId(table._id);
    setFormData({ 
      tableNumber: table.tableNumber, 
      capacity: table.capacity, 
      location: table.location, 
      isActive: table.isActive !== false 
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this table?")) return;
    try {
      toast.loading("Deleting...", { id: 'delete' });
      const token = await getToken();
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${apiUrl}/tables/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        toast.success("Deleted successfully", { id: 'delete' });
        fetchTables();
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
      toast.loading(editingId ? "Updating..." : "Adding...", { id: 'save-table' });
      const token = await getToken();
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      
      const url = editingId ? `${apiUrl}/tables/${editingId}` : `${apiUrl}/tables`;
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      
      if (res.ok) {
        toast.success(editingId ? "Updated successfully!" : "Added successfully!", { id: 'save-table' });
        setIsModalOpen(false);
        fetchTables();
      } else {
        const errorData = await res.json();
        toast.error(`Failed to save: ${errorData.message || 'Unknown error'}`, { id: 'save-table' });
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred", { id: 'save-table' });
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
          <h2 className="font-['EB_Garamond'] text-4xl text-white/90 italic">Tables</h2>
          <p className="text-sm font-light text-white/50 mt-2">Manage restaurant capacity and floor plan.</p>
        </div>
        <button onClick={handleOpenAdd} className="px-6 py-3 bg-[#c5a059] text-[#050505] rounded-lg hover:bg-white transition-colors text-xs uppercase tracking-[0.2em] font-bold mt-4 md:mt-0 whitespace-nowrap flex-shrink-0">
          + Add Table
        </button>
      </motion.header>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        {loading ? (
          [1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="p-6 rounded-2xl border border-white/5 bg-[#0a0a0a] flex flex-col animate-pulse min-h-[160px]">
              <div className="flex justify-between items-start mb-4">
                <div className="h-6 w-16 bg-white/10 rounded"></div>
                <div className="h-4 w-12 bg-white/5 rounded-full"></div>
              </div>
              <div className="h-3 w-24 bg-white/5 rounded mb-2 mt-auto"></div>
              <div className="h-3 w-32 bg-white/5 rounded mb-4"></div>
              <div className="flex justify-between border-t border-white/5 pt-4">
                <div className="h-3 w-10 bg-white/10 rounded"></div>
                <div className="h-3 w-12 bg-white/10 rounded"></div>
              </div>
            </div>
          ))
        ) : tables.length === 0 ? (
          <div className="col-span-full p-8 text-center text-white/50">No tables found.</div>
        ) : (
          tables.map((table) => (
            <div key={table._id} className={`p-6 rounded-2xl border transition-colors flex flex-col ${table.isActive !== false ? 'bg-[#0a0a0a] border-white/10 hover:border-[#c5a059]/50' : 'bg-red-950/10 border-red-900/30'}`}>
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-['EB_Garamond'] text-2xl text-white/90">{table.tableNumber}</h3>
                <span className={`text-[9px] uppercase tracking-widest px-2 py-1 rounded-full ${table.isActive !== false ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'}`}>
                  {table.isActive !== false ? 'Active' : 'Offline'}
                </span>
              </div>
              <p className="text-sm text-white/50 font-light mb-1 flex-grow"><span className="text-white/30 mr-2 text-xs uppercase">Capacity</span> {table.capacity} Guests</p>
              <p className="text-sm text-white/50 font-light mb-4"><span className="text-white/30 mr-2 text-xs uppercase">Location</span> {table.location}</p>
              <div className="mt-auto flex justify-between border-t border-white/5 pt-4">
                <button onClick={() => handleOpenEdit(table)} className="text-xs text-[#c5a059] hover:text-white transition-colors">Edit</button>
                <button onClick={() => handleDelete(table._id)} className="text-xs text-red-400 hover:text-red-300 transition-colors">Delete</button>
              </div>
            </div>
          ))
        )}
      </motion.div>

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
                {editingId ? "Edit Table" : "Add Table"}
              </h3>
              <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">
                <div className="flex flex-col">
                  <label className="text-xs uppercase tracking-widest text-white/50 mb-2">Table Number</label>
                  <input required type="text" placeholder="e.g. T-10" value={formData.tableNumber} onChange={e => setFormData({...formData, tableNumber: e.target.value})} className="w-full bg-transparent border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#c5a059] outline-none" />
                </div>
                <div className="flex flex-col">
                  <label className="text-xs uppercase tracking-widest text-white/50 mb-2">Capacity (Guests)</label>
                  <input required type="number" min="1" value={formData.capacity} onChange={e => setFormData({...formData, capacity: e.target.value})} className="w-full bg-transparent border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#c5a059] outline-none" />
                </div>
                <div className="flex flex-col">
                  <label className="text-xs uppercase tracking-widest text-white/50 mb-2">Location</label>
                  <select value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#c5a059] outline-none">
                    <option value="Indoor">Indoor</option>
                    <option value="Outdoor">Outdoor</option>
                    <option value="Bar">Bar</option>
                    <option value="Patio">Patio</option>
                  </select>
                </div>
                <div className="flex items-center gap-3 mt-2">
                  <input type="checkbox" id="isActive" checked={formData.isActive} onChange={e => setFormData({...formData, isActive: e.target.checked})} className="w-4 h-4 accent-[#c5a059] cursor-pointer" />
                  <label htmlFor="isActive" className="text-sm text-white/70 cursor-pointer">Active / Available</label>
                </div>
                <div className="flex justify-end gap-4 mt-6 pt-6 border-t border-white/10">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-3 text-white/50 hover:text-white transition-colors text-sm font-medium">Cancel</button>
                  <button type="submit" className="px-8 py-3 bg-[#c5a059] text-[#050505] rounded-lg hover:bg-white transition-colors text-xs uppercase tracking-[0.2em] font-bold">
                    {editingId ? "Save Changes" : "Save Table"}
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

export default AdminTables;
