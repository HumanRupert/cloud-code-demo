import { motion, useInView, useAnimation } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

// Agent data
const agents = [
  { name: 'LangChain', logo: '🦜' },
  { name: 'Google ADK', logo: '🔷' },
  { name: 'Gemini', logo: '✨' },
  { name: 'Claude', logo: '🟠' },
  { name: 'ChatGPT', logo: '💚' },
  { name: 'OpenAI SDK', logo: '⚡' },
];

// Payment rails data
const paymentRails = [
  {
    category: 'PSPs',
    items: [
      { name: 'Stripe', color: '#635BFF' },
      { name: 'Adyen', color: '#0ABF53' },
    ],
  },
  {
    category: 'Card Networks',
    items: [
      { name: 'Visa', color: '#1A1F71' },
      { name: 'Mastercard', color: '#EB001B' },
    ],
  },
  {
    category: 'BNPL',
    items: [
      { name: 'Tamara', color: '#3FBBAD' },
      { name: 'Tabby', color: '#292929' },
    ],
  },
  {
    category: 'Ecommerce',
    items: [
      { name: 'Shopify', color: '#96BF48' },
      { name: 'Salla', color: '#004D40' },
      { name: 'Zid', color: '#6C5CE7' },
    ],
  },
  {
    category: 'Digital Assets',
    items: [
      { name: 'USDT', color: '#26A17B' },
      { name: 'BTC', color: '#F7931A' },
      { name: 'ETH', color: '#627EEA' },
    ],
  },
  {
    category: 'Instant',
    items: [
      { name: 'Aani', color: '#00A651' },
      { name: 'Pix', color: '#32BCAD' },
    ],
  },
];

const AgentPill = ({ agent, index, isInView }) => (
  <motion.div
    initial={{ opacity: 0, x: -50 }}
    animate={isInView ? { opacity: 1, x: 0 } : {}}
    transition={{ duration: 0.6, delay: 0.1 * index, ease: [0.16, 1, 0.3, 1] }}
    whileHover={{ x: 8, scale: 1.02 }}
    className="flex items-center gap-3 px-4 py-3 bg-white rounded-full border border-gray-100 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all duration-300 cursor-default"
  >
    <span className="text-xl">{agent.logo}</span>
    <span className="text-sm font-medium text-gray-700">{agent.name}</span>
  </motion.div>
);

const RailItem = ({ item }) => (
  <motion.div
    whileHover={{ scale: 1.1, y: -2 }}
    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    className="w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold text-white shadow-md cursor-default"
    style={{ backgroundColor: item.color }}
    title={item.name}
  >
    {item.name.slice(0, 2)}
  </motion.div>
);

const AnimatedConnection = ({ isInView, delay, direction }) => {
  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 1.5, delay, ease: [0.16, 1, 0.3, 1] },
        opacity: { duration: 0.3, delay },
      },
    },
  };

  const particleVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: [0, 1, 1, 0],
      transition: {
        duration: 2,
        delay: delay + 1,
        repeat: Infinity,
        repeatDelay: 1,
      },
    },
  };

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
      <defs>
        <linearGradient id={`gradient-${direction}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={direction === 'left' ? '#6366f1' : '#8b5cf6'} />
          <stop offset="100%" stopColor={direction === 'left' ? '#8b5cf6' : '#a855f7'} />
        </linearGradient>
      </defs>
      <motion.path
        d={direction === 'left' ? 'M 0,50 Q 50,50 100,50' : 'M 0,50 Q 50,50 100,50'}
        fill="none"
        stroke={`url(#gradient-${direction})`}
        strokeWidth="2"
        variants={pathVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        style={{ vectorEffect: 'non-scaling-stroke' }}
      />
    </svg>
  );
};

const ConnectionLines = ({ isInView }) => {
  const lines = [
    { start: 0, delay: 0.2 },
    { start: 1, delay: 0.3 },
    { start: 2, delay: 0.4 },
    { start: 3, delay: 0.5 },
    { start: 4, delay: 0.6 },
    { start: 5, delay: 0.7 },
  ];

  return (
    <div className="hidden lg:block absolute inset-0 pointer-events-none">
      {/* Left to center connection beams */}
      {lines.map((line, i) => (
        <motion.div
          key={`left-${i}`}
          className="absolute h-0.5 bg-gradient-to-r from-indigo-400/60 to-purple-500/60"
          style={{
            left: '22%',
            width: '12%',
            top: `${12 + i * 14}%`,
          }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: line.delay, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Animated particle */}
          <motion.div
            className="absolute w-2 h-2 -top-0.5 rounded-full bg-indigo-500 shadow-lg shadow-indigo-500/50"
            initial={{ left: 0 }}
            animate={isInView ? { left: ['0%', '100%'] } : {}}
            transition={{
              duration: 1.5,
              delay: line.delay + 0.5,
              repeat: Infinity,
              repeatDelay: 2,
              ease: 'easeInOut',
            }}
          />
        </motion.div>
      ))}

      {/* Center to right connection beams */}
      {paymentRails.map((_, i) => (
        <motion.div
          key={`right-${i}`}
          className="absolute h-0.5 bg-gradient-to-r from-purple-500/60 to-pink-400/60"
          style={{
            left: '66%',
            width: '12%',
            top: `${12 + i * 14}%`,
          }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Animated particle */}
          <motion.div
            className="absolute w-2 h-2 -top-0.5 rounded-full bg-purple-500 shadow-lg shadow-purple-500/50"
            initial={{ left: 0 }}
            animate={isInView ? { left: ['0%', '100%'] } : {}}
            transition={{
              duration: 1.5,
              delay: 1 + i * 0.1 + 0.5,
              repeat: Infinity,
              repeatDelay: 2,
              ease: 'easeInOut',
            }}
          />
        </motion.div>
      ))}
    </div>
  );
};

const SemanticHub = ({ isInView }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={isInView ? { opacity: 1, scale: 1 } : {}}
    transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
    className="relative"
  >
    {/* Outer glow */}
    <div className="absolute -inset-8 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-2xl animate-pulse-glow" />

    {/* Rotating border */}
    <motion.div
      className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-30"
      animate={{ rotate: 360 }}
      transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
    />

    {/* Main hub */}
    <div className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-2xl p-8 text-white shadow-2xl">
      {/* Inner shimmer */}
      <div className="absolute inset-0 rounded-2xl overflow-hidden">
        <div className="absolute inset-0 animate-shimmer opacity-20" />
      </div>

      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="text-2xl font-bold mb-6 text-center relative"
      >
        Semantic
      </motion.h3>

      <div className="space-y-3 relative">
        {['Policy enforcement', 'Authorization & auditability', 'Accountability'].map((feature, i) => (
          <motion.div
            key={feature}
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 1 + i * 0.1 }}
            className="flex items-center gap-2 text-sm text-white/90"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-white/80" />
            {feature}
          </motion.div>
        ))}
      </div>
    </div>
  </motion.div>
);

export default function Architecture() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-32 px-6 bg-gradient-to-b from-[#fafafa] to-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            How it works
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Semantic connects AI agents to the global payment infrastructure
          </p>
        </motion.div>

        {/* Architecture Diagram */}
        <div className="relative grid grid-cols-1 lg:grid-cols-[1fr,auto,1fr] gap-8 lg:gap-12 items-center">
          {/* Connection Lines - Desktop only */}
          <ConnectionLines isInView={isInView} />

          {/* Left Column: Agents */}
          <div className="relative">
            <motion.h3
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
              className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-6 text-center lg:text-left"
            >
              Agents
            </motion.h3>
            <div className="flex flex-wrap lg:flex-col gap-3 justify-center lg:justify-start">
              {agents.map((agent, index) => (
                <AgentPill key={agent.name} agent={agent} index={index} isInView={isInView} />
              ))}
            </div>
          </div>

          {/* Center: Semantic Hub */}
          <div className="flex justify-center py-8">
            <SemanticHub isInView={isInView} />
          </div>

          {/* Right Column: Payment Rails */}
          <div className="relative">
            <motion.h3
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 1 }}
              className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-6 text-center lg:text-right"
            >
              Payment Rails
            </motion.h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {paymentRails.map((group, groupIndex) => (
                <motion.div
                  key={group.category}
                  initial={{ opacity: 0, x: 50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 1.2 + groupIndex * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                >
                  <span className="text-xs text-gray-400 font-medium block mb-3">{group.category}</span>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <RailItem key={item.name} item={item} />
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile flow indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 2 }}
          className="lg:hidden mt-8 flex items-center justify-center gap-4 text-gray-400"
        >
          <span className="text-sm">Agents</span>
          <motion.span
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            →
          </motion.span>
          <span className="text-sm font-medium text-gray-600">Semantic</span>
          <motion.span
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
          >
            →
          </motion.span>
          <span className="text-sm">Payment Rails</span>
        </motion.div>
      </div>
    </section>
  );
}
