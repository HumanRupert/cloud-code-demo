import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ShoppingCart, CreditCard, Code, Store, Globe, Shield, Wallet, Coins, Layers } from 'lucide-react';

const tabs = [
  { id: 'ecommerce', label: 'Ecommerce Platforms', icon: Store },
  { id: 'psps', label: 'PSPs', icon: CreditCard },
  { id: 'developers', label: 'Developers', icon: Code },
];

const tabContent = {
  ecommerce: {
    headline: 'Get ready for agentic commerce',
    features: [
      {
        icon: ShoppingCart,
        title: 'In-house shopping agents',
        description: 'From product discovery to cart to checkout, fully managed.',
      },
      {
        icon: Globe,
        title: 'Third-party agent integration',
        description: 'Connect your inventory to ChatGPT, Claude, Gemini and other third-party agents.',
      },
      {
        icon: Shield,
        title: 'Agent authorization',
        description: 'Control which agents can access your catalog, revoke anytime.',
      },
    ],
  },
  psps: {
    headline: 'Add agentic checkout to your rails',
    features: [
      {
        icon: CreditCard,
        title: 'Embedded agentic checkout',
        description: 'Your merchants inside ChatGPT, Claude, Gemini, and more.',
      },
      {
        icon: Layers,
        title: 'Universal protocol support',
        description: 'Google AP2, OpenAI ACP, Mastercard AgentPay, Visa TAP, Intelligent Commerce. Connect once, support every agent payment standard as they emerge.',
      },
      {
        icon: Globe,
        title: 'Global coverage',
        description: 'Access 180+ countries and 50+ payment methods through a single integration.',
      },
    ],
  },
  developers: {
    headline: 'Give your agent a wallet',
    features: [
      {
        icon: Wallet,
        title: 'Pay for resources',
        description: 'Let your agents purchase compute, data, and services via A2A and MCP.',
      },
      {
        icon: Coins,
        title: 'Monetize your tools',
        description: 'Charge other agents for access to your MCP servers and A2A endpoints.',
      },
      {
        icon: Layers,
        title: 'Stablecoin rails',
        description: 'Microtransactions on optimized chains, near-zero fees, instant settlement.',
      },
    ],
  },
};

const FeatureCard = ({ feature, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    className="flex gap-5 group"
  >
    <motion.div
      whileHover={{ scale: 1.1, rotate: 5 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-50 to-blue-50 border border-sky-100/50 flex items-center justify-center group-hover:from-sky-100 group-hover:to-blue-100 transition-colors duration-300"
    >
      <feature.icon className="w-6 h-6 text-sky-600" strokeWidth={1.5} />
    </motion.div>
    <div className="pt-1">
      <h4 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-sky-600 transition-colors">
        {feature.title}
      </h4>
      <p className="text-gray-500 leading-relaxed">
        {feature.description}
      </p>
    </div>
  </motion.div>
);

const TabButton = ({ tab, isActive, onClick, layoutId }) => (
  <motion.button
    onClick={onClick}
    className={`relative px-6 py-3 text-sm font-medium rounded-full transition-colors duration-300 ${
      isActive ? 'text-white' : 'text-gray-600 hover:text-gray-900'
    }`}
    whileHover={{ scale: isActive ? 1 : 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    {isActive && (
      <motion.div
        layoutId={layoutId}
        className="absolute inset-0 bg-gray-900 rounded-full"
        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
      />
    )}
    <span className={`relative z-10 flex items-center gap-2 ${isActive ? 'text-white' : ''}`}>
      <tab.icon className="w-4 h-4" />
      {tab.label}
    </span>
  </motion.button>
);

export default function Features() {
  const [activeTab, setActiveTab] = useState('ecommerce');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const content = tabContent[activeTab];

  return (
    <section ref={ref} className="py-32 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            What Semantic Does for You
          </h2>
        </motion.div>

        {/* Tab Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap justify-center gap-2 mb-12 p-2 bg-gray-50 rounded-full w-fit mx-auto"
        >
          {tabs.map((tab) => (
            <TabButton
              key={tab.id}
              tab={tab}
              isActive={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
              layoutId="activeTab"
            />
          ))}
        </motion.div>

        {/* Tab Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-100 rounded-3xl p-8 sm:p-12 shadow-sm">
            {/* Fixed height container to prevent layout shift */}
            <div className="min-h-[420px] sm:min-h-[380px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Headline */}
                  <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-10 text-center"
                  >
                    {content.headline}
                  </motion.h3>

                  {/* Features */}
                  <div className="space-y-8">
                    {content.features.map((feature, index) => (
                      <FeatureCard key={feature.title} feature={feature} index={index} />
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute -z-10 -top-4 -left-4 w-24 h-24 bg-sky-100/50 rounded-full blur-2xl" />
          <div className="absolute -z-10 -bottom-4 -right-4 w-32 h-32 bg-blue-100/50 rounded-full blur-2xl" />
        </motion.div>
      </div>
    </section>
  );
}
