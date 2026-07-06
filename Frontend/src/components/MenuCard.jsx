import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const MenuCard = ({ item }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="group relative cursor-pointer block border-b border-white/10 pb-8 hover:border-[#c5a059]/50 transition-colors"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10 text-[#f5f5f5]">
        <div className="flex-1 flex flex-col justify-center">
          {item.isChefSpecial && (
            <span className="text-[10px] uppercase tracking-[0.4em] text-[#c5a059] mb-3 block">
              Signature
            </span>
          )}
          <h3 className="font-['EB_Garamond'] text-3xl md:text-4xl text-white/90 group-hover:text-[#c5a059] transition-colors duration-500">
            {item.name}
          </h3>
          <p className="text-white/40 font-['Manrope'] text-sm font-light mt-3 max-w-lg leading-relaxed">
            {item.description}
          </p>
        </div>
        
        <div className="text-left md:text-right flex flex-col items-start md:items-end">
          <span className="font-['Manrope'] text-xl md:text-2xl font-light text-white/80">
            ${item.price.toFixed(2)}
          </span>
          <Link 
            to={`/menu/${item._id}`}
            className="mt-4 text-[10px] uppercase tracking-[0.2em] text-white/50 group-hover:text-white transition-colors flex items-center gap-2"
          >
            Discover <span className="material-symbols-outlined text-[12px]">east</span>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default MenuCard;
