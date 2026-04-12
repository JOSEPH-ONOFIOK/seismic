'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import clsx from 'clsx'

const DELAY_MS = 5000

interface TaskItemProps {
  label: string
  subtext?: string
  href: string
  checked: boolean
  onToggle: () => void
  index: number
}

export default function TaskItem({ label, subtext, href, checked, onToggle, index }: TaskItemProps) {
  const [visited, setVisited] = useState(false)
  const [countdown, setCountdown] = useState(0)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const handleGoClick = () => {
    if (checked || visited) return
    setVisited(true)
    setCountdown(Math.ceil(DELAY_MS / 1000))

    intervalRef.current = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    timerRef.current = setTimeout(() => {
      onToggle()
    }, DELAY_MS)
  }

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  const canCheck = visited && countdown === 0

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.08, duration: 0.35, ease: 'easeOut' }}
      className={clsx(
        'flex items-center gap-3 rounded-xl border p-3 transition-all duration-300',
        checked
          ? 'bg-[rgba(255,215,0,0.04)] border-[rgba(255,215,0,0.2)]'
          : 'bg-[#0d0d0d] border-[#1e1e1e]'
      )}
    >
      <div className="flex-1 min-w-0">
        <p className={clsx('text-sm leading-snug transition-colors duration-200', checked ? 'text-[#888] line-through' : 'text-[#d0d0d0]')}>
          {label}
        </p>
        {subtext && !visited && (
          <p className="text-[11px] text-[#555] mt-0.5">{subtext}</p>
        )}
        {visited && !checked && (
          <p className="text-[11px] text-[var(--gold)] mt-0.5 opacity-70">
            {countdown > 0 ? `verifying... ${countdown}s` : 'verified ✓'}
          </p>
        )}
      </div>

      {!checked && (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleGoClick}
          className={clsx(
            'text-[11px] whitespace-nowrap px-2 py-1 border rounded-md transition-all',
            visited
              ? 'text-[#555] border-[#222] cursor-default pointer-events-none'
              : 'text-[var(--gold)] opacity-60 hover:opacity-100 border-[rgba(255,215,0,0.15)] hover:border-[rgba(255,215,0,0.4)] hover:bg-[rgba(255,215,0,0.05)]'
          )}
        >
          {visited ? 'opened ✓' : 'go ↗'}
        </a>
      )}

      <button
        onClick={() => { if (canCheck && !checked) onToggle() }}
        disabled={!canCheck && !checked}
        className={clsx(
          'w-6 h-6 rounded-full border flex-shrink-0 flex items-center justify-center transition-all duration-200',
          checked
            ? 'bg-[var(--gold)] border-[var(--gold)]'
            : canCheck
              ? 'border-[#666] bg-transparent hover:border-[var(--gold)] cursor-pointer'
              : 'border-[#2a2a2a] bg-transparent cursor-not-allowed opacity-30'
        )}
      >
        <AnimatePresence>
          {checked && (
            <motion.svg
              key="check"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              width="11" height="11" viewBox="0 0 11 11" fill="none"
            >
              <path d="M2 5.5l2.5 2.5 4.5-4.5" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </motion.svg>
          )}
          {!checked && canCheck && (
            <motion.div
              key="dot"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-1.5 h-1.5 rounded-full bg-[#FFD700]"
            />
          )}
        </AnimatePresence>
      </button>
    </motion.div>
  )
}
