const MenuTabs = ({ categories, activeCategory, setActiveCategory }) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-12">
      <button
        onClick={() => setActiveCategory('all')}
        className={`relative text-lg font-medium transition-colors duration-300 pb-2 ${
          activeCategory === 'all' 
            ? 'text-[#CE1212]' 
            : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
        } group`}
      >
        All Menu
        <span className={`absolute left-0 bottom-0 h-0.5 bg-[#CE1212] transition-all duration-300 ${
          activeCategory === 'all' ? 'w-full' : 'w-0 group-hover:w-full'
        }`}></span>
      </button>

      {categories.map((category) => (
        <button
          key={category._id}
          onClick={() => setActiveCategory(category._id)}
          className={`relative text-lg font-medium transition-colors duration-300 pb-2 ${
            activeCategory === category._id 
              ? 'text-[#CE1212]' 
              : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
          } group`}
        >
          {category.name}
          <span className={`absolute left-0 bottom-0 h-0.5 bg-[#CE1212] transition-all duration-300 ${
            activeCategory === category._id ? 'w-full' : 'w-0 group-hover:w-full'
          }`}></span>
        </button>
      ))}
    </div>
  );
};

export default MenuTabs;
