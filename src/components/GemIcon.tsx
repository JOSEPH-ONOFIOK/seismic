'use client'

import { motion } from 'framer-motion'

export default function GemIcon({ size = 80 }: { size?: number }) {
  return (
    <motion.div
      animate={{
        y: [0, -10, -4, -10, 0],
        rotate: [0, 2, 0, -2, 0],
      }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      style={{ width: size, height: size }}
      className="relative"
    >
      {/* Glow ring behind gem */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(255,215,0,0.35) 0%, transparent 70%)',
          filter: 'blur(8px)',
        }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />

      <svg
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        style={{ position: 'relative', zIndex: 1 }}
      >
        <defs>
          <linearGradient id="gemTop" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFF176" />
            <stop offset="100%" stopColor="#FFD700" />
          </linearGradient>
          <linearGradient id="gemLeft" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#B8860B" />
            <stop offset="100%" stopColor="#DAA520" />
          </linearGradient>
          <linearGradient id="gemRight" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#FFD700" />
            <stop offset="100%" stopColor="#FFA500" />
          </linearGradient>
        </defs>

        {/* Gem shape - diamond/hex crystal */}
        {/* Top facet */}
        <polygon points="50,10 75,38 50,45 25,38" fill="url(#gemTop)" />
        {/* Left facet */}
        <polygon points="25,38 50,45 50,88 15,58" fill="url(#gemLeft)" />
        {/* Right facet */}
        <polygon points="75,38 85,58 50,88 50,45" fill="url(#gemRight)" />
        {/* Center line highlight */}
        <line x1="50" y1="45" x2="50" y2="88" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
        {/* Top highlight */}
        <polygon points="50,10 63,30 50,28 37,30" fill="rgba(255,255,255,0.3)" />
      </svg>
    </motion.div>
  )
}
