import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';

// Agent data with logos
const agents = [
  {
    name: 'LangChain',
    logo: 'https://images.seeklogo.com/logo-png/61/1/langchain-icon-logo-png_seeklogo-611655.png'
  },
  {
    name: 'Google ADK',
    logo: 'https://google.github.io/adk-docs/assets/agent-development-kit.png'
  },
  {
    name: 'Gemini',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Google_Gemini_icon_2025.svg/960px-Google_Gemini_icon_2025.svg.png'
  },
  {
    name: 'Claude',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b0/Claude_AI_symbol.svg'
  },
  {
    name: 'ChatGPT',
    logo: 'https://static.vecteezy.com/system/resources/previews/021/059/827/non_2x/chatgpt-logo-chat-gpt-icon-on-white-background-free-vector.jpg'
  },
  {
    name: 'OpenAI SDK',
    logo: 'https://us1.discourse-cdn.com/openai1/original/4X/3/2/1/321a1ba297482d3d4060d114860de1aa5610f8a9.png'
  },
];

// Payment infrastructure grouped by category
const paymentGroups = [
  {
    category: 'PSPs',
    items: [
      { name: 'Stripe', logo: 'https://images.seeklogo.com/logo-png/29/1/stripe-logo-png_seeklogo-290635.png' },
      { name: 'Adyen', logo: 'https://images.seeklogo.com/logo-png/31/1/adyen-logo-png_seeklogo-316102.png' },
    ],
  },
  {
    category: 'Card Networks',
    items: [
      { name: 'Visa Intelligent Commerce', logo: 'https://images.seeklogo.com/logo-png/14/1/visa-logo-png_seeklogo-149697.png' },
      { name: 'Mastercard Agent Pay', logo: 'https://download.logo.wine/logo/Mastercard/Mastercard-Logo.wine.png' },
    ],
  },
  {
    category: 'BNPL',
    items: [
      { name: 'Tamara', logo: 'https://media.licdn.com/dms/image/v2/D4D0BAQEJB3vk5iGuFg/company-logo_200_200/B4DZkAT60sIEAI-/0/1756646846578/tamara_logo?e=2147483647&v=beta&t=jQTR3kO66w_lWVaUTIYVwwNkzYh0EwwEqep1tuR2Wuw' },
      { name: 'Tabby', logo: 'https://s3-eu-west-1.amazonaws.com/tpd/logos/60110918897a86000191df7e/0x0.png' },
    ],
  },
  {
    category: 'Ecommerce',
    items: [
      { name: 'Shopify', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ58f__Hs5QwGWIEcsawDwW1o5IQzaYNPONhQ&s' },
      { name: 'Salla', logo: 'https://avatars.githubusercontent.com/u/44970666?v=4' },
      { name: 'Zid', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfyu1kOIQSHXhwHfO6KHThtedYmSuBKWCgvw&s' },
    ],
  },
  {
    category: 'Digital Assets',
    items: [
      { name: 'USDT', logo: 'https://cryptologos.cc/logos/tether-usdt-logo.png' },
      { name: 'BTC', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1280px-Bitcoin.svg.png' },
      { name: 'ETH', logo: 'https://images.seeklogo.com/logo-png/40/1/ethereum-logo-png_seeklogo-407463.png' },
    ],
  },
  {
    category: 'Instant Payments',
    items: [
      { name: 'Aani', logo: 'https://aep.ae/media/e5udt2yc/asset-2-1.svg' },
      { name: 'Pix', logo: 'https://img.icons8.com/color/1200/pix.jpg' },
    ],
  },
];

// Agent node - shows logo + text always (responsive)
const AgentNode = ({ item, index }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.1 * index, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.05 }}
      className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-2.5 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-sky-200 transition-all cursor-default"
    >
      {!imgError ? (
        <img
          src={item.logo}
          alt={item.name}
          className="w-5 h-5 sm:w-6 sm:h-6 object-contain flex-shrink-0"
          onError={() => setImgError(true)}
        />
      ) : (
        <div className="w-4 h-4 rounded-full flex-shrink-0 bg-sky-400" />
      )}
      <span className="text-xs sm:text-sm font-medium text-gray-700 whitespace-nowrap">
        {item.name}
      </span>
    </motion.div>
  );
};

// Square logo box with hover popup
const LogoBox = ({ item }) => {
  const [imgError, setImgError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Popup on hover */}
      <motion.div
        initial={{ opacity: 0, y: 4 }}
        animate={{
          opacity: isHovered ? 1 : 0,
          y: isHovered ? 0 : 4,
        }}
        transition={{ duration: 0.15 }}
        className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap z-10 pointer-events-none"
      >
        {item.name}
        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
      </motion.div>

      {/* Square logo box */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md hover:border-sky-200 transition-all cursor-default"
      >
        {!imgError ? (
          <img
            src={item.logo}
            alt={item.name}
            className="w-6 h-6 sm:w-8 sm:h-8 object-contain"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-4 h-4 rounded-full bg-sky-400" />
        )}
      </motion.div>
    </div>
  );
};

// Payment group with category label and logo boxes
const PaymentGroup = ({ group, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: 0.1 * index, ease: [0.16, 1, 0.3, 1] }}
    className="flex flex-col gap-1.5 sm:gap-2"
  >
    <span className="text-[9px] sm:text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
      {group.category}
    </span>
    <div className="flex gap-1.5 sm:gap-2">
      {group.items.map((item) => (
        <LogoBox key={item.name} item={item} />
      ))}
    </div>
  </motion.div>
);

// Central Hub - responsive sizing
const CentralHub = () => {
  const features = ['Policy Enforcement', 'Authorization', 'Visibility'];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="relative"
    >
      {/* Outer glow ring */}
      <div className="absolute -inset-6 sm:-inset-8 rounded-full bg-gradient-to-r from-sky-400/20 via-blue-500/20 to-sky-400/20 blur-2xl animate-pulse-glow" />

      {/* Rotating ring */}
      <motion.div
        className="absolute -inset-3 sm:-inset-4 rounded-full border-2 border-dashed border-sky-200"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />

      {/* Main hub - responsive size */}
      <div className="relative w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-full bg-gradient-to-br from-sky-500 to-blue-600 shadow-2xl shadow-blue-500/30 flex flex-col items-center justify-center p-4 sm:p-6">
        {/* Inner shimmer */}
        <div className="absolute inset-0 rounded-full overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full"
            animate={{ translateX: ['100%', '-100%'] }}
            transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
          />
        </div>

        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-white text-lg sm:text-xl font-bold mb-2 sm:mb-3 relative"
        >
          Semantic
        </motion.span>

        <div className="space-y-1 sm:space-y-1.5 relative">
          {features.map((feature, i) => (
            <motion.div
              key={feature}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 + i * 0.1 }}
              className="text-[10px] sm:text-xs text-white/80 text-center"
            >
              {feature}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// Simple subtle particle for desktop
const SimpleParticle = ({ index, startY, endY }) => (
  <motion.div
    className="absolute w-2 h-2 rounded-full bg-sky-400/80"
    style={{
      left: '0%',
      top: startY,
      boxShadow: '0 0 6px rgba(14, 165, 233, 0.4)',
    }}
    animate={{
      left: ['0%', '100%'],
      top: [startY, endY],
      opacity: [0, 0.8, 0],
    }}
    transition={{
      duration: 2.5,
      delay: index * 1.5,
      repeat: Infinity,
      repeatDelay: 2,
      ease: 'easeInOut',
    }}
  />
);

// Vertical flow arrow for mobile
const VerticalFlowArrow = () => (
  <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    className="flex flex-col items-center py-4 lg:hidden"
  >
    <motion.div
      animate={{ y: [0, 8, 0] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      className="text-sky-400"
    >
      <ChevronDown className="w-6 h-6" />
    </motion.div>
  </motion.div>
);

export default function Architecture() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const totalGroups = paymentGroups.length;

  return (
    <section id="architecture" ref={ref} className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 bg-gradient-to-b from-[#fafafa] to-gray-50 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            How It Works
          </h2>
          <p className="text-gray-500 text-base sm:text-lg max-w-2xl mx-auto px-4">
            One integration connects AI agents to on-chain and off-chain payment infrastructure
          </p>
        </motion.div>

        {/* Architecture Visualization - Vertical on mobile, Horizontal on desktop */}
        <div className="relative flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-12">

          {/* Agents Section */}
          <div className="w-full lg:w-auto">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3 block text-center"
            >
              AI Agents
            </motion.span>
            {/* Grid on mobile, vertical stack on desktop */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-2 sm:gap-2.5 px-2 lg:px-0">
              {agents.map((agent, i) => (
                <AgentNode key={agent.name} item={agent} index={i} />
              ))}
            </div>
          </div>

          {/* Vertical Flow Arrow (mobile only) */}
          <VerticalFlowArrow />

          {/* Left Flow Lines (desktop only) */}
          <div className="hidden lg:block relative w-24 h-80">
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 320" preserveAspectRatio="none">
              <defs>
                <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
                <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.2" />
                  <stop offset="50%" stopColor="#0ea5e9" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.7" />
                </linearGradient>
              </defs>

              {agents.map((_, i) => {
                const startY = 30 + (i * 260) / (agents.length - 1);
                return (
                  <motion.path
                    key={`left-line-${i}`}
                    d={`M 0 ${startY} Q 50 ${startY} 100 160`}
                    fill="none"
                    stroke="url(#blueGradient)"
                    strokeWidth="2"
                    filter="url(#glow)"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.3 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  />
                );
              })}
            </svg>

            {/* Subtle particles */}
            <SimpleParticle index={0} startY="25%" endY="50%" />
            <SimpleParticle index={1} startY="75%" endY="50%" />
          </div>

          {/* Center: Semantic Hub */}
          <CentralHub />

          {/* Vertical Flow Arrow (mobile only) */}
          <VerticalFlowArrow />

          {/* Right Flow Lines (desktop only) */}
          <div className="hidden lg:block relative w-24 h-80">
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 320" preserveAspectRatio="none">
              <defs>
                <linearGradient id="blueGradientRight" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.7" />
                  <stop offset="50%" stopColor="#0ea5e9" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.2" />
                </linearGradient>
              </defs>

              {paymentGroups.map((_, i) => {
                const endY = 30 + (i * 260) / (totalGroups - 1);
                return (
                  <motion.path
                    key={`right-line-${i}`}
                    d={`M 0 160 Q 50 ${endY} 100 ${endY}`}
                    fill="none"
                    stroke="url(#blueGradientRight)"
                    strokeWidth="2"
                    filter="url(#glow)"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.8 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  />
                );
              })}
            </svg>

            {/* Subtle particles */}
            <SimpleParticle index={0} startY="50%" endY="25%" />
            <SimpleParticle index={1} startY="50%" endY="75%" />
          </div>

          {/* Payment Infrastructure Section */}
          <div className="w-full lg:w-auto">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3 block text-center"
            >
              Payment Infrastructure
            </motion.span>
            {/* Grid on mobile, vertical stack on desktop */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-3 sm:gap-4 px-2 lg:px-0">
              {paymentGroups.map((group, i) => (
                <PaymentGroup key={group.category} group={group} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
