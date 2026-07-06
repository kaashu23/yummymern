import { Link } from 'react-router-dom';
import { FiMapPin, FiPhone, FiMail, FiTwitter, FiFacebook, FiInstagram, FiLinkedin } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-[#1f1f24] text-white pt-16 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 border-b border-gray-700 pb-12">
          
          {/* Address */}
          <div className="flex flex-col items-start">
            <div className="flex items-center space-x-3 mb-4">
              <FiMapPin className="text-2xl text-gray-400" />
              <h3 className="text-lg font-semibold tracking-wide">Address</h3>
            </div>
            <p className="text-gray-400 ml-9 leading-relaxed">
              A108 Adam Street<br />
              New York, NY 535022 - US
            </p>
          </div>

          {/* Reservations */}
          <div className="flex flex-col items-start">
            <div className="flex items-center space-x-3 mb-4">
              <FiPhone className="text-2xl text-gray-400" />
              <h3 className="text-lg font-semibold tracking-wide">Reservations</h3>
            </div>
            <div className="text-gray-400 ml-9 leading-relaxed">
              <p><strong>Phone:</strong> +1 5589 55488 55</p>
              <p><strong>Email:</strong> info@yummy.com</p>
            </div>
          </div>

          {/* Opening Hours */}
          <div className="flex flex-col items-start">
            <div className="flex items-center space-x-3 mb-4">
              <FiMail className="text-2xl text-gray-400" />
              <h3 className="text-lg font-semibold tracking-wide">Opening Hours</h3>
            </div>
            <div className="text-gray-400 ml-9 leading-relaxed">
              <p><strong>Mon-Sat:</strong> 11AM - 23PM</p>
              <p><strong>Sunday:</strong> Closed</p>
            </div>
          </div>

          {/* Socials */}
          <div className="flex flex-col items-start">
            <h3 className="text-lg font-semibold tracking-wide mb-6">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="p-3 border border-gray-600 rounded-full hover:border-white hover:text-[#CE1212] transition-colors bg-white/5">
                <FiTwitter />
              </a>
              <a href="#" className="p-3 border border-gray-600 rounded-full hover:border-white hover:text-[#CE1212] transition-colors bg-white/5">
                <FiFacebook />
              </a>
              <a href="#" className="p-3 border border-gray-600 rounded-full hover:border-white hover:text-[#CE1212] transition-colors bg-white/5">
                <FiInstagram />
              </a>
              <a href="#" className="p-3 border border-gray-600 rounded-full hover:border-white hover:text-[#CE1212] transition-colors bg-white/5">
                <FiLinkedin />
              </a>
            </div>
          </div>

        </div>

        <div className="text-center pt-8 text-gray-400 text-sm">
          <p>© Copyright <strong>Yummy</strong>. All Rights Reserved</p>
          <p className="mt-2 text-xs">Designed with <span className="text-[#CE1212]">♥</span> by You</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
