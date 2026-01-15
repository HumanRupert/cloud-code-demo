import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Vision from './components/Vision';
import Architecture from './components/Architecture';
import Features from './components/Features';
import CTA from './components/CTA';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-[#fafafa]">
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
  );
}

export default App;
