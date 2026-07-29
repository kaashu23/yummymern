import React, { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import api from '../utils/axios';

const LeaveReview = () => {
  const [formData, setFormData] = useState({
    guestName: '',
    rating: 5,
    comment: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.guestName || !formData.comment) {
      return toast.error("Please fill out all fields.");
    }
    
    setLoading(true);
    try {
      await api.post('/reviews', formData);
      setSubmitted(true);
      toast.success("Thank you for your review!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit review.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen pt-40 pb-32 flex items-center justify-center bg-[#050505] text-[#f5f5f5]">
        <div className="text-center">
          <span className="material-symbols-outlined text-6xl text-[#c5a059] mb-6 block">check_circle</span>
          <h2 className="font-['EB_Garamond'] text-4xl text-white/90 mb-4">Thank You</h2>
          <p className="text-white/50 text-sm font-light">Your review has been successfully submitted and will be reviewed by our team.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-40 pb-32 bg-[#050505] text-[#f5f5f5] selection:bg-[#c5a059]/30 relative overflow-hidden flex items-center justify-center">
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-xl w-full mx-auto px-6 relative z-10"
      >
        <div className="text-center mb-12">
          <span className="text-[10px] uppercase tracking-[0.4em] text-[#c5a059] mb-4 block">Feedback</span>
          <h1 className="font-['EB_Garamond'] text-4xl md:text-5xl text-white/90 italic">How was your <span className="not-italic">Experience?</span></h1>
        </div>

        <form onSubmit={handleSubmit} className="bg-[#0a0a0a] p-8 md:p-12 rounded-2xl border border-white/5 flex flex-col gap-8 shadow-2xl">
          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase tracking-[0.2em] text-white/40">Your Name</label>
            <input 
              type="text" 
              value={formData.guestName}
              onChange={e => setFormData({...formData, guestName: e.target.value})}
              className="bg-transparent border-b border-white/20 focus:border-[#c5a059] text-white py-3 outline-none transition-colors"
              placeholder="e.g., Jane Doe"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase tracking-[0.2em] text-white/40">Rating</label>
            <div className="flex gap-4">
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setFormData({...formData, rating: star})}
                  className={`text-2xl transition-colors ${formData.rating >= star ? 'text-[#c5a059]' : 'text-white/20 hover:text-white/40'}`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase tracking-[0.2em] text-white/40">Your Thoughts</label>
            <textarea 
              value={formData.comment}
              onChange={e => setFormData({...formData, comment: e.target.value})}
              className="bg-transparent border-b border-white/20 focus:border-[#c5a059] text-white py-3 outline-none transition-colors min-h-[100px] resize-y"
              placeholder="Tell us what you loved..."
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="mt-4 bg-white text-[#050505] text-xs uppercase tracking-[0.2em] py-4 rounded-lg hover:bg-[#c5a059] hover:text-white transition-all duration-500 disabled:opacity-50 font-bold"
          >
            {loading ? 'Submitting...' : 'Submit Review'}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default LeaveReview;
