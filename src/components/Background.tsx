'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

export default function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const handleResize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)

    // Particles
    const particles: {
      x: number; y: number; vx: number; vy: number;
      size: number; opacity: number; life: number; maxLife: number;
    }[] = []

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -Math.random() * 0.4 - 0.1,
        size: Math.random() * 1.5 + 0.3,
        opacity: Math.random() * 0.6 + 0.2,
        life: Math.random() * 200,
        maxLife: 200 + Math.random() * 100,
      })
    }

    let animId: number
    const animate = () => {
      ctx.clearRect(0, 0, width, height)

      // Draw grid dots
      ctx.fillStyle = 'rgba(255,215,0,0.04)'
      const spacing = 60
      for (let x = 0; x < width; x += spacing) {
        for (let y = 0; y < height; y += spacing) {
          ctx.beginPath()
          ctx.arc(x, y, 0.8, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      particles.forEach((p) => {
        p.life++
        if (p.life > p.maxLife) {
          p.x = Math.random() * width
          p.y = height + 10
          p.life = 0
          p.vy = -Math.random() * 0.4 - 0.1
          p.vx = (Math.random() - 0.5) * 0.3
        }
        p.x += p.vx
        p.y += p.vy

        const fade = p.life < 30 ? p.life / 30 : p.life > p.maxLife - 30 ? (p.maxLife - p.life) / 30 : 1
        ctx.globalAlpha = p.opacity * fade
        ctx.fillStyle = '#FFD700'
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
      })

      ctx.globalAlpha = 1
      animId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <>
      {/* Canvas particles */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
        style={{ opacity: 0.8 }}
      />

      {/* Central radial glow */}
      <motion.div
        className="fixed pointer-events-none z-0"
        style={{
          top: '10%', left: '50%', transform: 'translateX(-50%)',
          width: 700, height: 500,
          background: 'radial-gradient(ellipse, rgba(255,215,0,0.07) 0%, transparent 65%)',
          filter: 'blur(20px)',
        }}
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Bottom glow */}
      <div
        className="fixed bottom-0 left-1/2 -translate-x-1/2 pointer-events-none z-0"
        style={{
          width: 500, height: 200,
          background: 'radial-gradient(ellipse, rgba(255,215,0,0.04) 0%, transparent 70%)',
        }}
      />

      {/* Scan line */}
      <motion.div
        className="fixed left-0 right-0 pointer-events-none z-0"
        style={{
          height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(255,215,0,0.08), transparent)',
        }}
        animate={{ top: ['-2%', '102%'] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear', repeatDelay: 4 }}
      />
    </>
  )
}
