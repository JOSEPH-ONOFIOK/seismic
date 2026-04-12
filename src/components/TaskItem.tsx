'use client'

import { motion, AnimatePresence } from 'framer-motion'
import clsx from 'clsx'

interface TaskItemProps {
  label: string
  subtext?: string
  href: string
  checked: boolean
  onToggle: () => void
  index: number
}

export default function TaskItem({ label, subtext, href, checked, onToggle, index }: TaskItemProps) {
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
        {subtext && (
          <p className="text-[11px] text-[#555] mt-0.5">{subtext}</p>
        )}
      </div>

      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => { if (!checked) onToggle() }}
        className="text-[11px] text-[var(--gold)] opacity-60 hover:opacity-100 transition-opacity whitespace-nowrap px-2 py-1 border border-[rgba(255,215,0,0.15)] rounded-md hover:border-[rgba(255,215,0,0.4)] hover:bg-[rgba(255,215,0,0.05)]"
      >
        go ↗
      </a>

      <button
        onClick={onToggle}
        className={clsx(
          'w-6 h-6 rounded-full border flex-shrink-0 flex items-center justify-center transition-all duration-200',
          checked ? 'bg-[var(--gold)] border-[var(--gold)]' : 'border-[#444] bg-transparent hover:border-[#666]'
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
        </AnimatePresence>
      </button>
    </motion.div>
  )
}
