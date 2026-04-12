'use client'

import { Suspense } from 'react'
import CampaignFlow from '@/components/CampaignFlow'

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#080808]" />}>
      <CampaignFlow />
    </Suspense>
  )
}
