import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

// Agent data with colors
const agents = [
  { name: 'LangChain', color: '#2D9CDB' },
  { name: 'Google ADK', color: '#4285F4' },
  { name: 'Gemini', color: '#8E75B2' },
  { name: 'Claude', color: '#D97706' },
  { name: 'ChatGPT', color: '#10A37F' },
  { name: 'OpenAI SDK', color: '#412991' },
];

// Payment rails data grouped
const paymentRails = [
  { name: 'Stripe', color: '#635BFF', category: 'PSP' },
  { name: 'Adyen', color: '#0ABF53', category: 'PSP' },
  { name: 'Visa', color: '#1A1F71', category: 'Card' },
  { name: 'Mastercard', color: '#EB001B', category: 'Card' },
  { name: 'USDT', color: '#26A17B', category: 'Crypto' },
  { name: 'Pix', color: '#32BCAD', category: 'RTP' },
];

const FlowLine = ({ delay, reverse = false }) => (
  <motion.div
    className="absolute top-1/2 -translate-y-1/2 h-[2px] bg-gradient-to-r from-transparent via-sky-400 to-transparent"
    style={{ width: '100%' }}
    initial={{ opacity: 0, scaleX: 0 }}
    whileInView={{ opacity: 1, scaleX: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
  >
    <motion.div
      className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-sky-400 shadow-lg shadow-sky-400/50"
      animate={{
        left: reverse ? ['100%', '0%'] : ['0%', '100%'],
        opacity: [0, 1, 1, 0],
      }}
      transition={{
        duration: 2,
        delay: delay + 0.5,
        repeat: Infinity,
        repeatDelay: 1,
        ease: 'linear',
      }}
    />
  </motion.div>
);

const NodeItem = ({ item, index, side, totalItems }) => {
  const angle = (index / totalItems) * 180 - 90;
  const isLeft = side === 'left';

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.1 * index, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.05, x: isLeft ? -5 : 5 }}
      className={`flex items-center gap-3 px-4 py-2.5 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-sky-200 transition-all cursor-default ${
        isLeft ? 'flex-row' : 'flex-row-reverse'
      }`}
    >
      <div
        className="w-3 h-3 rounded-full flex-shrink-0"
        style={{ backgroundColor: item.color }}
      />
      <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
        {item.name}
      </span>
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
      <div className="relative w-48 h-48 rounded-full bg-gradient-to-br from-sky-500 to-blue-600 shadow-2xl shadow-blue-500/30 flex flex-col items-center justify-center p-6">
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
        <div className="relative flex items-center justify-center gap-8 lg:gap-16">
          {/* Left Side: Agents */}
          <div className="flex flex-col gap-3">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2 text-center"
            >
              AI Agents
            </motion.span>
            {agents.map((agent, i) => (
              <NodeItem key={agent.name} item={agent} index={i} side="left" totalItems={agents.length} />
            ))}
          </div>

          {/* Left Flow Lines */}
          <div className="hidden lg:block relative w-24 h-64">
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 300" preserveAspectRatio="none">
              {agents.map((_, i) => {
                const startY = 30 + (i * 240) / (agents.length - 1);
                return (
                  <motion.path
                    key={`left-line-${i}`}
                    d={`M 0 ${startY} Q 50 ${startY} 100 150`}
                    fill="none"
                    stroke="url(#blueGradient)"
                    strokeWidth="2"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 0.6 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.3 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  />
                );
              })}
              <defs>
                <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.8" />
                </linearGradient>
              </defs>
            </svg>

            {/* Animated particles */}
            {[0, 1, 2].map((i) => (
              <motion.div
                key={`particle-left-${i}`}
                className="absolute w-2 h-2 rounded-full bg-sky-400 shadow-lg shadow-sky-400/50"
                style={{ left: '0%', top: '20%' }}
                animate={{
                  left: ['0%', '100%'],
                  top: ['20%', '50%'],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 1.5,
                  delay: i * 0.5,
                  repeat: Infinity,
                  repeatDelay: 1,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>

          {/* Center: Semantic Hub */}
          <CentralHub />

          {/* Right Flow Lines */}
          <div className="hidden lg:block relative w-24 h-64">
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 300" preserveAspectRatio="none">
              {paymentRails.map((_, i) => {
                const endY = 30 + (i * 240) / (paymentRails.length - 1);
                return (
                  <motion.path
                    key={`right-line-${i}`}
                    d={`M 0 150 Q 50 ${endY} 100 ${endY}`}
                    fill="none"
                    stroke="url(#blueGradientRight)"
                    strokeWidth="2"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 0.6 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.8 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  />
                );
              })}
              <defs>
                <linearGradient id="blueGradientRight" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.3" />
                </linearGradient>
              </defs>
            </svg>

            {/* Animated particles */}
            {[0, 1, 2].map((i) => (
              <motion.div
                key={`particle-right-${i}`}
                className="absolute w-2 h-2 rounded-full bg-sky-400 shadow-lg shadow-sky-400/50"
                style={{ left: '0%', top: '50%' }}
                animate={{
                  left: ['0%', '100%'],
                  top: ['50%', '30%'],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 1.5,
                  delay: 0.5 + i * 0.5,
                  repeat: Infinity,
                  repeatDelay: 1,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>

          {/* Right Side: Payment Rails */}
          <div className="flex flex-col gap-3">
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
              <NodeItem key={rail.name} item={rail} index={i} side="right" totalItems={paymentRails.length} />
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

        {/* Bottom stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
        >
          {[
            { value: '50+', label: 'Payment Methods' },
            { value: '180+', label: 'Countries' },
            { value: '<100ms', label: 'Latency' },
            { value: '99.99%', label: 'Uptime' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
              className="text-center"
            >
              <div className="text-2xl sm:text-3xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
