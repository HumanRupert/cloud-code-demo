import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Vision from './components/Vision';
import Architecture from './components/Architecture';
import Features from './components/Features';
import CTA from './components/CTA';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import CustomCursor from './components/CustomCursor';

function App() {
  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-zinc-950 transition-colors duration-300">
      <ScrollProgress />
      <CustomCursor />
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
