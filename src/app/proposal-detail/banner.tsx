'use client'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'

import { ConnectButton } from '@rainbow-me/rainbowkit'

import LOGO from '@/static/images/logo.png'

type BannerProps = {
  imageUrl: string
}

export default function Banner({ imageUrl }: BannerProps) {
  const searchParams = useSearchParams()
  const proposalId = searchParams.get('proposalId') || ''

  return (
    <div
      className="hero h-64 p-6 banner-campaign before:h-64"
      style={{
        backgroundImage: `url(${imageUrl})`,
      }}
    >
      <div className="hero-overlay max-w-[1040px]">
        <div className="flex-auto flex justify-between">
          <div className="w-32 h-11 z-10">
            <Image src={LOGO} alt="logo" />
          </div>
          <ConnectButton />
        </div>
      </div>
    </div>
  )
}
