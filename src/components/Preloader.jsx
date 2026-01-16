import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// All image URLs to preload before showing the page
const imageUrls = [
  // Main logo
  '/logo.png',

  // Hero carousel logos
  '/logos/xbto.png',
  '/logos/tether.png',
  '/logos/goldman-sachs.png',
  '/logos/antler.png',
  '/logos/khalifa-university.png',
  '/logos/huawei.png',
  '/logos/hsbc.png',
  '/logos/google.png',

  // Architecture - AI/Agent logos
  '/logos/langchain.png',
  '/logos/google-adk.png',
  '/logos/gemini.png',
  '/logos/claude.svg',
  '/logos/chatgpt.jpg',
  '/logos/openai-agents.png',

  // Architecture - Payment logos
  '/logos/stripe.png',
  '/logos/adyen.png',
  '/logos/visa.png',
  '/logos/mastercard.png',
  '/logos/tabby.png',
  '/logos/usdt.png',
  '/logos/btc.png',
  '/logos/eth.png',
  '/logos/aani.svg',
  '/logos/pix.jpg',

  // External URLs (still need to load these)
  'https://media.licdn.com/dms/image/v2/D4E0BAQGKolmYRTf1uQ/company-logo_200_200/company-logo_200_200/0/1738848703564/nokiabelllabs_logo?e=2147483647&v=beta&t=llk9AEjdCbZMXgb_RoOLYJZz2MONrkjUz1qXlG0CgLM',
  'https://media.licdn.com/dms/image/v2/D4D0BAQEJB3vk5iGuFg/company-logo_200_200/B4DZkAT60sIEAI-/0/1756646846578/tamara_logo?e=2147483647&v=beta&t=jQTR3kO66w_lWVaUTIYVwwNkzYh0EwwEqep1tuR2Wuw',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ58f__Hs5QwGWIEcsawDwW1o5IQzaYNPONhQ&s',
  'https://avatars.githubusercontent.com/u/44970666?v=4',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfyu1kOIQSHXhwHfO6KHThtedYmSuBKWCgvw&s',
];

export default function Preloader({ children }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const preloadImages = async () => {
      const promises = imageUrls.map(src => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = resolve;
          img.onerror = resolve; // Continue even if image fails to load
        });
      });

      await Promise.all(promises);

      // Small delay for smoother transition
      setTimeout(() => setIsLoading(false), 100);
    };

    preloadImages();
  }, []);

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="fixed inset-0 z-50 bg-[#fafafa] flex items-center justify-center"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center gap-4"
            >
              <img
                src="/logo.png"
                alt="Loading"
                className="w-12 h-12 object-contain"
              />
              <motion.div
                className="w-8 h-1 bg-gradient-to-r from-sky-400 to-blue-500 rounded-full"
                animate={{ scaleX: [0.3, 1, 0.3] }}
                transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </>
  );
}
