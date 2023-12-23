'use client'
import Clipboard from '@/components/clipboard'

import { shortenAddress } from '@/helpers/utils'
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
    <div className="card candidate-card h-80 bg-base-100 shadow-xl image-full">
      <figure>
        <img src={avatar} alt="Shoes" />
      </figure>
      <div className="candidate-card-body flex flex-col gap-2 p-4">
        <h2 className="card-title">{name}</h2>
        <p>{description}</p>
        <div className="flex justify-between">
          <div className="flex items-center">
            <p>{shortenAddress(candidate)}</p>
            <Clipboard
              tooltipClassName="tooltip tooltip-right"
              content={candidate}
            />
          </div>
          <Vote candidate={candidate} proposalId={Number(proposalId)} />
        </div>
      </div>
    </div>
  )
}
