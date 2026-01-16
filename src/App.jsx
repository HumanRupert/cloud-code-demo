import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Vision from './components/Vision';
import Architecture from './components/Architecture';
import Features from './components/Features';
import CTA from './components/CTA';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import Preloader from './components/Preloader';

function App() {
  return (
    <Preloader>
      <div className="min-h-screen bg-[#fafafa]">
        <ScrollProgress />
        <Navbar />
        <main>
          <Hero />
          <Vision />
          <Architecture />
          <Features />
          <CTA />
        </main>
        <Footer />
      </div>
    </Preloader>
  );
}

export default App;
