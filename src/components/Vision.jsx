import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Shield, Lock, Zap } from 'lucide-react';

const cards = [
  {
    icon: Shield,
    title: 'Human oversight & guardrails',
    description: 'Policy controls, approval workflows, and spending limits — humans remain the final authority.',
    gradient: 'from-sky-400 to-blue-500',
  },
  {
    icon: Lock,
    title: 'Accountability & authorization',
    description: 'Every agent linked to a verified human via World ID. Signed credentials. Dispute resolution built in.',
    gradient: 'from-blue-500 to-blue-600',
  },
  {
    icon: Zap,
    title: 'Universal integration',
    description: 'Card networks, local RTPs, OpenAI ACP, Google AP2, stablecoins — one integration.',
    gradient: 'from-blue-600 to-sky-500',
  },
];

const VisionCard = ({ card, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="group relative"
    >
      {/* Card glow effect */}
      <div className={`absolute -inset-0.5 bg-gradient-to-r ${card.gradient} rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500`} />

      <div className="relative bg-white border border-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-500">
        {/* Icon */}
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          className={`w-14 h-14 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center mb-6 shadow-lg`}
        >
          <card.icon className="w-7 h-7 text-white" strokeWidth={1.5} />
        </motion.div>

        {/* Content */}
        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          {card.title}
        </h3>
        <p className="text-gray-500 leading-relaxed">
          {card.description}
        </p>

        {/* Hover line effect */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${card.gradient} rounded-b-2xl origin-left`}
        />
      </div>
    </motion.div>
  );
};

export default function Vision() {
  const introRef = useRef(null);
  const isIntroInView = useInView(introRef, { once: true, margin: '-100px' });

  return (
    <section className="py-32 px-6 bg-[#fafafa]">
      <div className="max-w-6xl mx-auto">
        {/* Intro Text */}
        <motion.div
          ref={introRef}
          initial={{ opacity: 0 }}
          animate={isIntroInView ? { opacity: 1 } : {}}
          transition={{ duration: 1 }}
          className="max-w-3xl mx-auto text-center mb-20"
        >
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isIntroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl sm:text-2xl text-gray-500 leading-relaxed mb-8"
          >
            Agents are graduating from simple tasks to complex workflows — browsing, negotiating, transacting. But when it's time to pay, they hit a wall.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isIntroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900 leading-tight"
          >
            Semantic is the missing layer between{' '}
            <span className="gradient-text">agent intent</span> and{' '}
            <span className="gradient-text">financial infrastructure</span>.
          </motion.p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <VisionCard key={card.title} card={card} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
