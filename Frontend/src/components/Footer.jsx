import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full bg-[#050505] pt-32 pb-12 px-6 md:px-16 border-t border-white/5 font-['Manrope'] selection:bg-[#c5a059]/30 text-[#f5f5f5]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-16">
        <div className="max-w-xs">
          <h3 className="font-['EB_Garamond'] text-3xl mb-6 text-white/90">YUMMY</h3>
        </div>
        <div className="flex gap-16 md:gap-24">
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.2em] text-white/60 mb-6">Connect</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-white/40 hover:text-white text-sm transition-colors">reservations@yummy.com</a></li>
              <li><a href="#" className="text-white/40 hover:text-white text-sm transition-colors">+1 (555) 123-4567</a></li>
              <li><a href="#" className="text-white/40 hover:text-white text-sm transition-colors">124 Gastronomy Ave</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.2em] text-white/60 mb-6">Socials</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-white/40 hover:text-white text-sm transition-colors">Instagram</a></li>
              <li><a href="#" className="text-white/40 hover:text-white text-sm transition-colors">Twitter</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
        <span className="text-[10px] uppercase tracking-widest text-white/30">© {new Date().getFullYear()} Yummy. All Rights Reserved.</span>
        <div className="flex gap-6">
          <span className="text-[10px] uppercase tracking-widest text-white/30 hover:text-white cursor-pointer transition-colors">Privacy</span>
          <span className="text-[10px] uppercase tracking-widest text-white/30 hover:text-white cursor-pointer transition-colors">Terms</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
