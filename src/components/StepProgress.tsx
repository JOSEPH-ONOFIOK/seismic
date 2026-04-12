'use client'

import { motion } from 'framer-motion'
import clsx from 'clsx'

interface StepProgressProps {
  currentStep: number
  totalSteps: number
  labels: string[]
}

export default function StepProgress({ currentStep, totalSteps, labels }: StepProgressProps) {
  return (
    <div className="w-full flex items-center gap-0 mb-6">
      {Array.from({ length: totalSteps }).map((_, i) => {
        const stepNum = i + 1
        const isComplete = stepNum < currentStep
        const isActive = stepNum === currentStep

        return (
          <div key={i} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center">
              <motion.div
                className={clsx(
                  'w-7 h-7 rounded-full flex items-center justify-center text-xs font-body font-medium border',
                  isComplete && 'bg-[var(--gold)] border-[var(--gold)] text-black',
                  isActive && 'border-[var(--gold)] text-[var(--gold)] bg-transparent',
                  !isComplete && !isActive && 'border-[#333] text-[#555] bg-transparent'
                )}
                animate={isActive ? { boxShadow: ['0 0 0px rgba(255,215,0,0)', '0 0 12px rgba(255,215,0,0.4)', '0 0 0px rgba(255,215,0,0)'] } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {isComplete ? (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6l3 3 5-5" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : stepNum}
              </motion.div>
              <span className={clsx(
                'text-[9px] mt-1 tracking-widest uppercase whitespace-nowrap',
                isActive ? 'text-[var(--gold)]' : 'text-[#444]'
              )}>
                {labels[i]}
              </span>
            </div>

            {i < totalSteps - 1 && (
              <div className="flex-1 mx-2 h-[1px] relative overflow-hidden" style={{ minWidth: 20 }}>
                <div className="absolute inset-0 bg-[#222]" />
                {isComplete && (
                  <motion.div
                    className="absolute inset-0 bg-[var(--gold)]"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    style={{ transformOrigin: 'left' }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                  />
                )}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
