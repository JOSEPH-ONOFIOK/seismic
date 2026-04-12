'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface ReferralBoxProps {
  username: string
}

export default function ReferralBox({ username }: ReferralBoxProps) {
  const [copied, setCopied] = useState(false)

  const referralUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}?ref=${encodeURIComponent(username.replace('@', ''))}`
      : `https://seismicnft.art?ref=${username.replace('@', '')}`

  const tweetText = `Just joined the @SeismicNFT Genesis drop 🔥 Seismic NFT is shaking up the space — grab your spot before it's gone 💎 Join using my link:`
  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}&url=${encodeURIComponent(referralUrl)}`

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(referralUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      // fallback
      const el = document.createElement('textarea')
      el.value = referralUrl
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.4 }}
      className="rounded-xl border border-[rgba(255,215,0,0.2)] bg-[#0a0a0a] p-4 space-y-3"
    >
      <div className="flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-[var(--gold)] animate-pulse" />
        <span className="text-[10px] tracking-[0.2em] uppercase text-[var(--gold)] font-body">
          Your referral link
        </span>
      </div>

      {/* URL display */}
      <div className="flex items-center gap-2 bg-[#080808] border border-[#1e1e1e] rounded-lg px-3 py-2.5">
        <span className="flex-1 text-xs text-[#888] truncate font-body">{referralUrl}</span>
        <button
          onClick={handleCopy}
          className="flex-shrink-0 flex items-center gap-1.5 text-[11px] font-medium transition-all duration-200 px-2.5 py-1 rounded-md border"
          style={{
            color: copied ? '#000' : 'var(--gold)',
            background: copied ? 'var(--gold)' : 'transparent',
            borderColor: copied ? 'var(--gold)' : 'rgba(255,215,0,0.25)',
          }}
        >
          <AnimatePresence mode="wait">
            {copied ? (
              <motion.span
                key="copied"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.15 }}
              >
                ✓ Copied
              </motion.span>
            ) : (
              <motion.span
                key="copy"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.15 }}
              >
                Copy
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Share on X button */}
      <a
        href={tweetUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg border border-[rgba(255,215,0,0.2)] text-sm font-medium text-[var(--gold)] hover:bg-[rgba(255,215,0,0.06)] hover:border-[rgba(255,215,0,0.4)] transition-all duration-200"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
        Share on X
      </a>

      <p className="text-[10px] text-[#444] text-center font-body">
        Each friend who joins via your link boosts your leaderboard rank
      </p>
    </motion.div>
  )
}
