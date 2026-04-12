import { Suspense } from 'react'
import CampaignFlow from '@/components/CampaignFlow'

function Spinner() {
  return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center">
      <div className="w-10 h-10 rounded-full border-2 border-[#222] border-t-[#FFD700] animate-spin" />
    </div>
  )
}

export default function Home() {
  return (
    <Suspense fallback={<Spinner />}>
      <CampaignFlow />
    </Suspense>
  )
}
