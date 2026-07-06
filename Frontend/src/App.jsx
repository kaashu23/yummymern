import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Reservation from './pages/Reservation';
import ScrollAnimations from './components/ScrollAnimations';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 transition-colors duration-300">
      <Navbar />
      <ScrollAnimations>
        <main className="flex-grow pt-20 main" data-scroll-container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/reservation" element={<Reservation />} />
            {/* Add more routes here as we build them */}
          </Routes>
        </main>
      </ScrollAnimations>
      <Footer />
    </div>
  );
}

export default App;
