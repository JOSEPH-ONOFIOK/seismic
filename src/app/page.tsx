import { Suspense } from 'react'
import CampaignFlow from '@/components/CampaignFlow'
import Background from '@/components/Background'
import GemIcon from '@/components/GemIcon'

const CAMPAIGN_OPEN = process.env.CAMPAIGN_OPEN === 'true'

function Spinner() {
  return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center">
      <div className="w-10 h-10 rounded-full border-2 border-[#222] border-t-[#FFD700] animate-spin" />
    </div>
  )
}

function ClosedPage() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4">
      <Background />
      <div className="relative z-10 flex flex-col items-center gap-6 text-center max-w-sm">
        <GemIcon size={72} />
        <div>
          <h1
            className="font-display text-5xl font-black tracking-tighter text-[#FFD700]"
            style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.03em' }}
          >
            SEISMIC
          </h1>
          <p className="text-[10px] tracking-[0.3em] text-[#555] uppercase mt-1">
            NFT ARC · Genesis Collection
          </p>
        </div>

        <div className="w-full rounded-2xl bg-[#111] border border-[rgba(255,255,255,0.06)] p-8 space-y-4"
          style={{ boxShadow: '0 0 0 1px rgba(255,215,0,0)' }}
        >
          <div
            className="absolute top-0 left-0 right-0 h-[1px] rounded-t-2xl"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(255,215,0,0.3), transparent)' }}
          />
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[rgba(255,255,255,0.03)] border border-[#222]">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block" />
            <span className="text-[11px] tracking-widest uppercase text-[#555]">Registrations closed</span>
          </div>
          <p className="text-white font-display text-xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>
            The waitlist is full.
          </p>
          <p className="text-[#555] text-xs leading-relaxed">
            Genesis collection entries are locked. Follow{' '}
            <a
              href="https://x.com/SeismicNFT"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#FFD700] hover:opacity-80 transition-opacity"
            >
              @SeismicNFT
            </a>
            {' '}for mint announcements and future drops.
          </p>
        </div>

        <p className="text-[10px] text-[#333]">
          Seismic Genesis NFT · not affiliated with @SeismicSys · Scotland, UK
        </p>
      </div>
    </div>
  )
}

export default function Home() {
  if (!CAMPAIGN_OPEN) return <ClosedPage />

  return (
    <Suspense fallback={<Spinner />}>
      <CampaignFlow />
    </Suspense>
  )
}
