import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { AnimatedCounter } from '../hooks/useCountUp';

// Agent data with logos from seeklogo
const agents = [
  {
    name: 'LangChain',
    color: '#2D9CDB',
    logo: 'https://images.seeklogo.com/logo-png/52/1/langchain-logo-png_seeklogo-527539.png'
  },
  {
    name: 'Google ADK',
    color: '#4285F4',
    logo: 'https://images.seeklogo.com/logo-png/35/1/google-g-2015-logo-png_seeklogo-352655.png'
  },
  {
    name: 'Gemini',
    color: '#8E75B2',
    logo: 'https://images.seeklogo.com/logo-png/55/1/google-gemini-logo-png_seeklogo-556522.png'
  },
  {
    name: 'Claude',
    color: '#D97706',
    logo: 'https://images.seeklogo.com/logo-png/52/1/anthropic-logo-png_seeklogo-524837.png'
  },
  {
    name: 'ChatGPT',
    color: '#10A37F',
    logo: 'https://images.seeklogo.com/logo-png/52/1/openai-logo-png_seeklogo-527024.png'
  },
  {
    name: 'OpenAI SDK',
    color: '#412991',
    logo: 'https://images.seeklogo.com/logo-png/52/1/openai-logo-png_seeklogo-527024.png'
  },
];

// Payment rails with logos
const paymentRails = [
  {
    name: 'Stripe',
    color: '#635BFF',
    logo: 'https://images.seeklogo.com/logo-png/52/1/stripe-logo-png_seeklogo-527130.png'
  },
  {
    name: 'Adyen',
    color: '#0ABF53',
    logo: 'https://images.seeklogo.com/logo-png/52/2/adyen-logo-png_seeklogo-527283.png'
  },
  {
    name: 'Visa',
    color: '#1A1F71',
    logo: 'https://images.seeklogo.com/logo-png/52/1/visa-logo-png_seeklogo-527085.png'
  },
  {
    name: 'Mastercard',
    color: '#EB001B',
    logo: 'https://images.seeklogo.com/logo-png/48/1/mastercard-logo-png_seeklogo-489106.png'
  },
  {
    name: 'Shopify',
    color: '#96BF48',
    logo: 'https://images.seeklogo.com/logo-png/52/1/shopify-logo-png_seeklogo-526853.png'
  },
  {
    name: 'USDT',
    color: '#26A17B',
    logo: 'https://images.seeklogo.com/logo-png/40/2/tether-usdt-logo-png_seeklogo-405426.png'
  },
];

// Agent node - shows logo + text always
const AgentNode = ({ item, index }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.1 * index, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.05, x: -5 }}
      className="flex items-center gap-3 px-4 py-2.5 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-sky-200 transition-all cursor-default"
    >
      {!imgError ? (
        <img
          src={item.logo}
          alt={item.name}
          className="w-6 h-6 object-contain flex-shrink-0"
          onError={() => setImgError(true)}
        />
      ) : (
        <div
          className="w-4 h-4 rounded-full flex-shrink-0"
          style={{ backgroundColor: item.color }}
        />
      )}
      <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
        {item.name}
      </span>
    </motion.div>
  );
};

// Payment rail node - shows logo only, text on hover
const PaymentRailNode = ({ item, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.1 * index, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.05, x: 5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="flex items-center gap-3 px-4 py-2.5 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-sky-200 transition-all cursor-default flex-row-reverse"
    >
      {!imgError ? (
        <img
          src={item.logo}
          alt={item.name}
          className="w-6 h-6 object-contain flex-shrink-0"
          onError={() => setImgError(true)}
        />
      ) : (
        <div
          className="w-4 h-4 rounded-full flex-shrink-0"
          style={{ backgroundColor: item.color }}
        />
      )}
      <motion.span
        initial={{ opacity: 0, width: 0 }}
        animate={{
          opacity: isHovered ? 1 : 0,
          width: isHovered ? 'auto' : 0,
        }}
        transition={{ duration: 0.2 }}
        className="text-sm font-medium text-gray-700 whitespace-nowrap overflow-hidden"
      >
        {item.name}
      </motion.span>
    </motion.div>
  );
};

const CentralHub = () => {
  const features = ['Policy Enforcement', 'Authorization', 'Accountability'];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="relative"
    >
      {/* Outer glow ring */}
      <div className="absolute -inset-8 rounded-full bg-gradient-to-r from-sky-400/20 via-blue-500/20 to-sky-400/20 blur-2xl animate-pulse-glow" />

      {/* Rotating ring */}
      <motion.div
        className="absolute -inset-4 rounded-full border-2 border-dashed border-sky-200"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />

      {/* Main hub */}
      <div className="relative w-44 h-44 lg:w-48 lg:h-48 rounded-full bg-gradient-to-br from-sky-500 to-blue-600 shadow-2xl shadow-blue-500/30 flex flex-col items-center justify-center p-6">
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
          className="text-white text-xl font-bold mb-3 relative"
        >
          Semantic
        </motion.span>

        <div className="space-y-1.5 relative">
          {features.map((feature, i) => (
            <motion.div
              key={feature}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 + i * 0.1 }}
              className="text-xs text-white/80 text-center"
            >
              {feature}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// Enhanced particle with glow trail
const GlowParticle = ({ side, index, startY, endY }) => {
  const isLeft = side === 'left';
  const delay = index * 0.4;

  return (
    <>
      {/* Main particle with glow */}
      <motion.div
        className="absolute w-3 h-3 rounded-full"
        style={{
          left: isLeft ? '0%' : '0%',
          top: startY,
          background: 'radial-gradient(circle, #0ea5e9 0%, #0284c7 50%, transparent 70%)',
          boxShadow: '0 0 20px 8px rgba(14, 165, 233, 0.6), 0 0 40px 16px rgba(14, 165, 233, 0.3)',
        }}
        animate={{
          left: ['0%', '100%'],
          top: [startY, endY],
          scale: [0.5, 1.2, 0.5],
        }}
        transition={{
          duration: 2,
          delay: delay,
          repeat: Infinity,
          repeatDelay: 1,
          ease: [0.16, 1, 0.3, 1],
        }}
      />
      {/* Trail particles */}
      {[1, 2, 3].map((trailIndex) => (
        <motion.div
          key={`trail-${side}-${index}-${trailIndex}`}
          className="absolute w-2 h-2 rounded-full bg-sky-400/40"
          style={{
            left: isLeft ? '0%' : '0%',
            top: startY,
          }}
          animate={{
            left: ['0%', '100%'],
            top: [startY, endY],
            opacity: [0, 0.6, 0],
            scale: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 2,
            delay: delay + (trailIndex * 0.1),
            repeat: Infinity,
            repeatDelay: 1,
            ease: [0.16, 1, 0.3, 1],
          }}
        />
      ))}
    </>
  );
};

export default function Architecture() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-32 px-6 bg-gradient-to-b from-[#fafafa] to-gray-50 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            One integration connects AI agents to global payment infrastructure
          </p>
        </motion.div>

        {/* Architecture Visualization */}
        <div className="relative flex items-center justify-center gap-4 lg:gap-12">
          {/* Left Side: Agents (logo + text always) */}
          <div className="flex flex-col gap-2.5">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2 text-center"
            >
              AI Agents
            </motion.span>
            {agents.map((agent, i) => (
              <AgentNode key={agent.name} item={agent} index={i} />
            ))}
          </div>

          {/* Left Flow Lines with Enhanced Particles */}
          <div className="hidden lg:block relative w-24 h-80">
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 320" preserveAspectRatio="none">
              {/* Glow filter for paths */}
              <defs>
                <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
                <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.2" />
                  <stop offset="50%" stopColor="#0ea5e9" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.8" />
                </linearGradient>
              </defs>

              {/* Animated pulsing paths */}
              {agents.map((_, i) => {
                const startY = 30 + (i * 260) / (agents.length - 1);
                return (
                  <g key={`left-line-${i}`}>
                    {/* Base path */}
                    <motion.path
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
                    {/* Animated pulse overlay */}
                    <motion.path
                      d={`M 0 ${startY} Q 50 ${startY} 100 160`}
                      fill="none"
                      stroke="#0ea5e9"
                      strokeWidth="3"
                      strokeOpacity="0.3"
                      initial={{ pathLength: 0 }}
                      animate={{
                        pathLength: [0, 1],
                        opacity: [0.8, 0],
                      }}
                      transition={{
                        duration: 1.5,
                        delay: i * 0.2,
                        repeat: Infinity,
                        repeatDelay: 2,
                        ease: 'easeOut',
                      }}
                    />
                  </g>
                );
              })}
            </svg>

            {/* Enhanced glowing particles */}
            <GlowParticle side="left" index={0} startY="10%" endY="50%" />
            <GlowParticle side="left" index={1} startY="30%" endY="50%" />
            <GlowParticle side="left" index={2} startY="50%" endY="50%" />
            <GlowParticle side="left" index={3} startY="70%" endY="50%" />
            <GlowParticle side="left" index={4} startY="90%" endY="50%" />
          </div>

          {/* Center: Semantic Hub */}
          <CentralHub />

          {/* Right Flow Lines with Enhanced Particles */}
          <div className="hidden lg:block relative w-24 h-80">
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 320" preserveAspectRatio="none">
              <defs>
                <linearGradient id="blueGradientRight" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#0ea5e9" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.2" />
                </linearGradient>
              </defs>

              {paymentRails.map((_, i) => {
                const endY = 30 + (i * 260) / (paymentRails.length - 1);
                return (
                  <g key={`right-line-${i}`}>
                    <motion.path
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
                    {/* Animated pulse overlay */}
                    <motion.path
                      d={`M 0 160 Q 50 ${endY} 100 ${endY}`}
                      fill="none"
                      stroke="#0ea5e9"
                      strokeWidth="3"
                      strokeOpacity="0.3"
                      initial={{ pathLength: 0 }}
                      animate={{
                        pathLength: [0, 1],
                        opacity: [0.8, 0],
                      }}
                      transition={{
                        duration: 1.5,
                        delay: 0.5 + i * 0.2,
                        repeat: Infinity,
                        repeatDelay: 2,
                        ease: 'easeOut',
                      }}
                    />
                  </g>
                );
              })}
            </svg>

            {/* Enhanced glowing particles going right */}
            <GlowParticle side="right" index={0} startY="50%" endY="10%" />
            <GlowParticle side="right" index={1} startY="50%" endY="30%" />
            <GlowParticle side="right" index={2} startY="50%" endY="50%" />
            <GlowParticle side="right" index={3} startY="50%" endY="70%" />
            <GlowParticle side="right" index={4} startY="50%" endY="90%" />
          </div>

          {/* Right Side: Payment Rails (logo only, text on hover) */}
          <div className="flex flex-col gap-2.5">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2 text-center"
            >
              Payment Rails
            </motion.span>
            {paymentRails.map((rail, i) => (
              <PaymentRailNode key={rail.name} item={rail} index={i} />
            ))}
          </div>
        </div>

        {/* Mobile simplified view */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="lg:hidden mt-12 flex items-center justify-center gap-4 text-gray-400"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-sky-400" />
            <span className="text-sm">6 AI Agents</span>
          </div>
          <motion.span
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            →
          </motion.span>
          <span className="text-sm font-semibold text-gray-600">Semantic</span>
          <motion.span
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
          >
            →
          </motion.span>
          <div className="flex items-center gap-2">
            <span className="text-sm">6 Payment Rails</span>
            <div className="w-2 h-2 rounded-full bg-sky-400" />
          </div>
        </motion.div>

        {/* Bottom stats with animated counters */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
        >
          {[
            { value: '50+', label: 'Payment Methods', delay: 0 },
            { value: '180+', label: 'Countries', delay: 0.1 },
            { value: '<100ms', label: 'Latency', delay: 0.2 },
            { value: '99.99%', label: 'Uptime', delay: 0.3 },
          ].map((stat) => (
            <AnimatedCounter
              key={stat.label}
              value={stat.value}
              label={stat.label}
              delay={stat.delay}
              duration={2000}
              className="text-center"
              valueClassName="text-2xl sm:text-3xl font-bold text-gray-900"
              labelClassName="text-sm text-gray-500 mt-1"
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
