import { Link } from 'react-router-dom';
import { FiStar } from 'react-icons/fi';

const MenuCard = ({ item }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col items-center p-6 relative">
      
      {/* Badges */}
      <div className="absolute top-4 left-4 flex flex-col gap-2">
        {item.isChefSpecial && (
          <span className="bg-[#CE1212] text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
            Chef's Special
          </span>
        )}
        {item.isVeg ? (
          <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
            Veg
          </span>
        ) : (
          <span className="bg-red-800 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
            Non-Veg
          </span>
        )}
      </div>

      {/* Image */}
      <div className="w-48 h-48 rounded-full overflow-hidden mb-6 mt-4 shadow-lg group-hover:scale-105 transition-transform duration-500">
        <img 
          src={item.images[0] || 'https://via.placeholder.com/300'} 
          alt={item.name} 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2 text-center group-hover:text-[#CE1212] transition-colors">
        {item.name}
      </h3>
      
      <p className="text-gray-500 dark:text-gray-400 text-center text-sm mb-4 line-clamp-2">
        {item.description}
      </p>

      <div className="flex items-center gap-1 mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <FiStar 
            key={star} 
            className={`w-4 h-4 ${star <= Math.round(item.averageRating || 0) ? 'text-yellow-400 fill-current' : 'text-gray-300 dark:text-gray-600'}`} 
          />
        ))}
        <span className="text-xs text-gray-400 ml-1">({item.ratings?.length || 0})</span>
      </div>

      <div className="text-3xl font-bold text-[#CE1212]">
        ${item.price.toFixed(2)}
      </div>

      <Link 
        to={`/menu/${item._id}`}
        className="mt-6 px-6 py-2 border-2 border-[#CE1212] text-[#CE1212] hover:bg-[#CE1212] hover:text-white rounded-full font-medium transition-all"
      >
        View Details
      </Link>
    </div>
  );
};

export default MenuCard;
