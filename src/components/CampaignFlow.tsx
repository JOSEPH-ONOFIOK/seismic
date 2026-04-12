'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Background from './Background'
import GemIcon from './GemIcon'
import StepProgress from './StepProgress'
import TaskItem from './TaskItem'
import ReferralBox from './ReferralBox'

const STEP_LABELS = ['Identity', 'Tasks', 'Wallet', 'Done']

const stepVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 60 : -60,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({
    x: dir > 0 ? -60 : 60,
    opacity: 0,
  }),
}

export default function CampaignFlow() {
  const searchParams = useSearchParams()
  const refBy = searchParams.get('ref') || ''

  const [step, setStep] = useState(1)
  const [dir, setDir] = useState(1)
  const [username, setUsername] = useState('')
  const [wallet, setWallet] = useState('')
  const [tasks, setTasks] = useState({ follow: false, quote: false, tag: false })
  const [usernameError, setUsernameError] = useState('')
  const [walletError, setWalletError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  // Pre-fill username if came from referral
  useEffect(() => {
    if (refBy) {
      // just show the referrer info, not pre-fill
    }
  }, [refBy])

  const goTo = (next: number) => {
    setDir(next > step ? 1 : -1)
    setStep(next)
  }

  const handleUsernameNext = () => {
    const clean = username.trim().replace(/^@/, '')
    if (!clean) {
      setUsernameError('Please enter your X username')
      return
    }
    setUsernameError('')
    goTo(2)
  }

  const handleTasksNext = () => {
    if (!allTasksDone) return
    goTo(3)
  }

  const handleWalletSubmit = async () => {
    const clean = wallet.trim()
    if (!clean) {
      setWalletError('Please enter your wallet address')
      return
    }
    if (!/^0x[a-fA-F0-9]{40}$/.test(clean)) {
      setWalletError('Enter a valid EVM wallet address (0x...)')
      return
    }
    setWalletError('')
    setSubmitError('')
    setSubmitting(true)
    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, wallet: clean, tasks, refBy }),
      })
      if (!res.ok) throw new Error('submit failed')
      goTo(4)
    } catch {
      setSubmitError('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const allTasksDone = tasks.follow && tasks.quote && tasks.tag

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-start py-12 px-4">
      <Background />

      <div className="relative z-10 w-full max-w-md flex flex-col items-center gap-6">

        {/* ── HEADER ── */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <GemIcon size={72} />
          <h1
            className="font-display text-5xl font-black tracking-tighter mt-3 text-[var(--gold)]"
            style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.03em' }}
          >
            SEISMIC
          </h1>
          <p className="text-[10px] tracking-[0.3em] text-[#555] uppercase mt-1 font-body">
            NFT ARC · Genesis Collection
          </p>

          {refBy && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[rgba(255,215,0,0.2)] bg-[rgba(255,215,0,0.05)] text-[11px] text-[var(--gold)]"
            >
              <span className="opacity-60">referred by</span>
              <span className="font-medium">@{refBy}</span>
            </motion.div>
          )}
        </motion.div>

        {/* ── CARD ── */}
        <motion.div
          className="w-full rounded-2xl bg-[#111] border border-[rgba(255,255,255,0.06)] p-6 relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5, ease: 'easeOut' }}
        >
          {/* Top shimmer line */}
          <div
            className="absolute top-0 left-0 right-0 h-[1px]"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(255,215,0,0.3), transparent)' }}
          />

          {step < 4 && (
            <StepProgress currentStep={step} totalSteps={4} labels={STEP_LABELS} />
          )}

          {/* ── STEP CONTENT ── */}
          <div className="relative overflow-hidden min-h-[220px]">
            <AnimatePresence custom={dir} mode="wait">

              {/* STEP 1 — USERNAME */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  custom={dir}
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="space-y-4"
                >
                  <div>
                    <span className="text-[10px] tracking-[0.2em] uppercase text-[var(--gold)] bg-[rgba(255,215,0,0.08)] border border-[rgba(255,215,0,0.15)] rounded-full px-3 py-1 inline-block">
                      Step 1 of 3
                    </span>
                    <h2 className="font-display text-2xl font-bold mt-3 text-white" style={{ fontFamily: 'var(--font-display)' }}>
                      Enter your X username
                    </h2>
                    <p className="text-xs text-[#555] mt-1 font-body">We&apos;ll verify your social tasks against this handle</p>
                  </div>

                  <div className="space-y-1">
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#555] text-sm">@</span>
                      <input
                        type="text"
                        placeholder="yourhandle"
                        value={username}
                        onChange={(e) => {
                          setUsername(e.target.value)
                          setUsernameError('')
                        }}
                        onKeyDown={(e) => e.key === 'Enter' && handleUsernameNext()}
                        className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded-xl text-base font-body text-white placeholder-[#444] pl-8 pr-4 py-3 outline-none focus:border-[var(--gold)] transition-colors duration-200"
                      />
                    </div>
                    {usernameError && (
                      <motion.p
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-[11px] text-red-400 pl-1"
                      >
                        {usernameError}
                      </motion.p>
                    )}
                  </div>

                  <button
                    onClick={handleUsernameNext}
                    className="w-full py-3 rounded-xl bg-[var(--gold)] text-black font-body font-bold text-sm tracking-wide hover:opacity-90 active:scale-[0.98] transition-all duration-150"
                  >
                    Continue →
                  </button>
                </motion.div>
              )}

              {/* STEP 2 — TASKS */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  custom={dir}
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="space-y-4"
                >
                  <div>
                    <span className="text-[10px] tracking-[0.2em] uppercase text-[var(--gold)] bg-[rgba(255,215,0,0.08)] border border-[rgba(255,215,0,0.15)] rounded-full px-3 py-1 inline-block">
                      Step 2 of 3
                    </span>
                    <h2 className="font-display text-2xl font-bold mt-3 text-white" style={{ fontFamily: 'var(--font-display)' }}>
                      Let&apos;s cause some trouble...
                    </h2>
                    <p className="text-xs text-[#555] mt-1">Complete all tasks then mark them done</p>
                  </div>

                  <div className="space-y-2">
                    <TaskItem
                      index={0}
                      label="Follow @SeismicNFT on X"
                      subtext="Hit follow on our main account"
                      href="https://x.com/SeismicNFT"
                      checked={tasks.follow}
                      onToggle={() => setTasks(t => ({ ...t, follow: !t.follow }))}
                    />
                    <TaskItem
                      index={1}
                      label='Like & quote the pinned post with a bullish caption containing "Seismic"'
                      subtext="Quote RT with your own take"
                      href="https://x.com/SeismicNFT"
                      checked={tasks.quote}
                      onToggle={() => setTasks(t => ({ ...t, quote: !t.quote }))}
                    />
                    <TaskItem
                      index={2}
                      label="Tag 2 friends on the pinned post"
                      subtext="The more frens, the more chaos"
                      href="https://x.com/SeismicNFT"
                      checked={tasks.tag}
                      onToggle={() => setTasks(t => ({ ...t, tag: !t.tag }))}
                    />
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => goTo(1)}
                      className="px-4 py-3 rounded-xl border border-[#2a2a2a] text-[#666] font-body text-sm hover:border-[#444] hover:text-[#999] transition-all duration-150"
                    >
                      ←
                    </button>
                    <button
                      onClick={handleTasksNext}
                      className={`flex-1 py-3 rounded-xl font-body font-bold text-sm tracking-wide transition-all duration-200 ${
                        allTasksDone
                          ? 'bg-[var(--gold)] text-black hover:opacity-90 active:scale-[0.98]'
                          : 'bg-[#1a1a1a] text-[#555] cursor-not-allowed border border-[#222]'
                      }`}
                      disabled={!allTasksDone}
                    >
                      {allTasksDone ? 'All done →' : `${Object.values(tasks).filter(Boolean).length}/3 tasks completed`}
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 3 — WALLET */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  custom={dir}
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="space-y-4"
                >
                  <div>
                    <span className="text-[10px] tracking-[0.2em] uppercase text-[var(--gold)] bg-[rgba(255,215,0,0.08)] border border-[rgba(255,215,0,0.15)] rounded-full px-3 py-1 inline-block">
                      Step 3 of 3
                    </span>
                    <h2 className="font-display text-2xl font-bold mt-3 text-white" style={{ fontFamily: 'var(--font-display)' }}>
                      Drop your wallet
                    </h2>
                    <p className="text-xs text-[#555] mt-1">Where we&apos;ll send your Genesis NFT if you make the cut</p>
                  </div>

                  <div className="flex gap-2">
                    <span className="text-[10px] tracking-widest uppercase text-[#FFD700] bg-[rgba(255,215,0,0.06)] border border-[rgba(255,215,0,0.2)] rounded-lg px-2 py-1 flex items-center">
                      EVM
                    </span>
                  </div>

                  <div className="space-y-1">
                    <input
                      type="text"
                      placeholder="0x..."
                      value={wallet}
                      onChange={(e) => {
                        setWallet(e.target.value)
                        setWalletError('')
                      }}
                      onKeyDown={(e) => e.key === 'Enter' && handleWalletSubmit()}
                      className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded-xl text-base font-body text-white placeholder-[#444] px-4 py-3 outline-none focus:border-[var(--gold)] transition-colors duration-200"
                    />
                    {walletError && (
                      <motion.p
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-[11px] text-red-400 pl-1"
                      >
                        {walletError}
                      </motion.p>
                    )}
                    <p className="text-[10px] text-[#444] pl-1">We never ask for private keys or seed phrases</p>
                  </div>

                  {submitError && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-[11px] text-red-400 pl-1"
                    >
                      {submitError}
                    </motion.p>
                  )}

                  <div className="flex gap-2">
                    <button
                      onClick={() => goTo(2)}
                      disabled={submitting}
                      className="px-4 py-3 rounded-xl border border-[#2a2a2a] text-[#666] font-body text-sm hover:border-[#444] hover:text-[#999] transition-all duration-150 disabled:opacity-40"
                    >
                      ←
                    </button>
                    <button
                      onClick={handleWalletSubmit}
                      disabled={submitting}
                      className="flex-1 py-3 rounded-xl bg-[var(--gold)] text-black font-body font-bold text-sm tracking-wide hover:opacity-90 active:scale-[0.98] transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {submitting ? 'Submitting...' : 'Submit entry'}
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 4 — SUCCESS */}
              {step === 4 && (
                <motion.div
                  key="step4"
                  custom={dir}
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="space-y-5"
                >
                  {/* Animated check */}
                  <div className="flex justify-center pt-2">
                    <motion.div
                      className="w-16 h-16 rounded-full bg-[rgba(255,215,0,0.1)] border border-[rgba(255,215,0,0.3)] flex items-center justify-center"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.1 }}
                    >
                      <motion.svg
                        width="28" height="28" viewBox="0 0 28 28" fill="none"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ delay: 0.4, duration: 0.5, ease: 'easeOut' }}
                      >
                        <motion.path
                          d="M6 14l6 6 10-10"
                          stroke="#FFD700"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ delay: 0.4, duration: 0.5, ease: 'easeOut' }}
                        />
                      </motion.svg>
                    </motion.div>
                  </div>

                  <div className="text-center space-y-1">
                    <h2 className="font-display text-2xl font-bold text-[var(--gold)]" style={{ fontFamily: 'var(--font-display)' }}>
                      Entry recorded
                    </h2>
                    <p className="text-xs text-[#555]">You&apos;re early. The leaderboard drops soon.</p>
                  </div>

                  {/* Stats row */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-[#0d0d0d] border border-[#1e1e1e] rounded-xl p-3 text-center">
                      <p className="text-[10px] uppercase tracking-widest text-[#555] mb-1">Handle</p>
                      <p className="text-sm text-[var(--gold)] font-medium truncate">@{username.replace('@', '')}</p>
                    </div>
                    <div className="bg-[#0d0d0d] border border-[#1e1e1e] rounded-xl p-3 text-center">
                      <p className="text-[10px] uppercase tracking-widest text-[#555] mb-1">Status</p>
                      <div className="flex items-center justify-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block animate-pulse" />
                        <span className="text-sm text-green-400 font-medium">Active</span>
                      </div>
                    </div>
                  </div>

                  {/* Leaderboard soon */}
                  <div className="flex items-center justify-between bg-[#0d0d0d] border border-[#1e1e1e] rounded-xl px-4 py-3">
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-[#444] mb-0.5">Leaderboard</p>
                      <p className="text-sm text-[var(--gold)] font-medium">Coming soon...</p>
                    </div>
                    <span className="text-2xl">🏆</span>
                  </div>

                  {/* REFERRAL BOX */}
                  <ReferralBox username={username.replace('@', '')} />
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.p
          className="text-[10px] text-[#333] text-center font-body"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Seismic Genesis NFT · not affiliated with @SeismicSys · Scotland, UK
        </motion.p>
      </div>
    </div>
  )
}
