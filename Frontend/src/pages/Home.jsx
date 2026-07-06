import { Link } from 'react-router-dom';
import { FiPlayCircle, FiCheckCircle, FiArrowRight } from 'react-icons/fi';
import { motion } from 'framer-motion';
import Hero3D from '../components/Hero3D';

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div className="bg-[#fcfcfc] dark:bg-[#050505] min-h-screen font-['Inter'] selection:bg-[#CE1212] selection:text-white overflow-hidden relative">
      
      {/* 3D Hero Canvas Background */}
      <div className="absolute top-0 left-0 w-full h-[100vh] pointer-events-none">
        <Hero3D />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden z-10 pt-20 pointer-events-none">
        {/* Glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#CE1212]/10 dark:bg-[#CE1212]/20 blur-[120px] rounded-full -z-10"></div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full flex flex-col md:flex-row items-center pointer-events-auto">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full md:w-1/2 text-center md:text-left z-20"
          >
            <motion.div variants={itemVariants} className="inline-block mb-6 px-4 py-1.5 rounded-full border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-white/5 backdrop-blur-md">
              <span className="text-sm font-semibold tracking-wider text-[#CE1212] uppercase">Enjoy Your Healthy Delicious Food</span>
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="text-6xl md:text-8xl font-black text-gray-900 dark:text-white leading-[1.1] tracking-tighter mb-8">
              Taste the <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#CE1212] to-rose-500">
                Future
              </span>
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-lg mx-auto md:mx-0 font-light leading-relaxed">
              Experience gastronomy re-imagined. We blend cutting-edge culinary techniques with timeless flavors.
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
              <Link 
                to="/reservation" 
                className="group relative px-8 py-4 bg-[#CE1212] text-white rounded-full font-bold overflow-hidden shadow-[0_10px_40px_-10px_rgba(206,18,18,0.6)] hover:shadow-[0_10px_50px_-5px_rgba(206,18,18,0.8)] transition-all w-full sm:w-auto text-center"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Book a Table <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-[#CE1212] opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </Link>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noreferrer"
                className="group flex items-center gap-3 px-6 py-4 text-gray-800 dark:text-white font-semibold hover:text-[#CE1212] dark:hover:text-[#CE1212] transition-colors w-full sm:w-auto justify-center"
              >
                <div className="w-12 h-12 rounded-full bg-white dark:bg-white/10 shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform backdrop-blur-sm border border-gray-100 dark:border-white/5">
                  <FiPlayCircle className="text-2xl text-[#CE1212]" />
                </div>
                Watch Video
              </a>
            </motion.div>
          </motion.div>

          <div className="w-full md:w-1/2 h-[50vh] md:h-auto">
             {/* The 3D canvas fills this space visually via the absolute wrapper above */}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-32 bg-white dark:bg-[#0a0a0a] relative z-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="flex flex-col md:flex-row gap-16 items-center"
          >
            <div className="w-full md:w-1/2 relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#CE1212]/20 to-transparent rounded-3xl blur-2xl -z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=2070&auto=format&fit=crop" 
                alt="Restaurant Interior" 
                className="rounded-3xl shadow-2xl object-cover h-[600px] w-full"
              />
              <div className="absolute -bottom-8 -right-8 bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800 hidden md:block">
                <p className="text-5xl font-black text-[#CE1212]">15+</p>
                <p className="text-gray-600 dark:text-gray-400 font-medium">Years of Experience</p>
              </div>
            </div>
            
            <div className="w-full md:w-1/2">
              <span className="text-[#CE1212] font-semibold tracking-wider uppercase text-sm">About Us</span>
              <h2 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white mt-4 mb-8 leading-tight tracking-tight">
                Culinary Artistry <br/> Perfected.
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg mb-8 leading-relaxed font-light">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              
              <ul className="space-y-4 mb-10">
                {['Premium Ingredients', 'Award Winning Chefs', 'Atmospheric Ambience'].map((item, i) => (
                  <motion.li 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3 text-gray-800 dark:text-gray-200 font-medium"
                  >
                    <FiCheckCircle className="text-[#CE1212] text-xl" />
                    {item}
                  </motion.li>
                ))}
              </ul>
              
              <Link 
                to="/about" 
                className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-black rounded-full font-bold hover:scale-105 transition-transform"
              >
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default Home;
