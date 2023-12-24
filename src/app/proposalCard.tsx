'use client'
import Link from 'next/link'

import { useMetadata, useReceipt } from '@/hooks/atbash'
import TimeCountDown from '@/components/timeCountDown'
import WinnerAvatar from '@/components/winnerAvatar'

type ProposalCardProps = {
  proposalId: number
}

export default function ProposalCard({ proposalId }: ProposalCardProps) {
  const { proposalMetadata } = useMetadata(proposalId) || {
    proposalMetadata: { title: '', description: '', image: '' },
  }
  const receipt = useReceipt(proposalId)

  return (
    <Link href={`/proposal-detail?proposalId=${proposalId}`}>
      <div className="w-full bg-base-100 rounded-2xl p-4 flex flex-col gap-4 h-full relative">
        <img
          className="aspect-video rounded-2xl"
          alt="banner"
          src={proposalMetadata.image}
        />
        <div className="flex items-center flex- justify-between">
          <TimeCountDown proposalId={proposalId} />
          <WinnerAvatar proposalId={proposalId} />
        </div>
        <h5>{proposalMetadata.title}</h5>
        <p>{proposalMetadata.description}</p>
        {receipt && (
          <span className="py-2 px-4 rounded-lg bg-[#FF8460] absolute">
            Voted
          </span>
        )}
      </div>
    </Link>
  )
}
