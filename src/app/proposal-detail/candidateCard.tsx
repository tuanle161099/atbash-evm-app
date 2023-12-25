'use client'

import { shortenAddress, tomoscan } from '@/helpers/utils'
import { useCandidateData } from '@/hooks/atbash'
import Vote from './vote'

type CandidateCardProps = {
  candidate: string
  proposalId: number
}

export default function CandidateCard({
  candidate,
  proposalId,
}: CandidateCardProps) {
  const { avatar, name, description } = useCandidateData(proposalId, candidate)

  return (
    <div className="card bg-base-100 p-2 h-full">
      <figure>
        <img src={avatar} alt="Shoes" className="rounded-2xl aspect-square" />
      </figure>
      <div className="flex flex-col gap-2 p-2 ">
        <div className="flex items-center gap-1">
          <h5 className="flex-auto truncate">{name}</h5>
          <p
            className="caption opacity-50 hover:cursor-pointer hover:underline"
            onClick={() => window.open(tomoscan(candidate), '_blank')}
          >
            {shortenAddress(candidate)}
          </p>
        </div>
        <p className="truncate">{description}</p>
        <Vote candidate={candidate} proposalId={proposalId} />
      </div>
    </div>
  )
}
