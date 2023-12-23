'use client'
import Clipboard from '@/components/clipboard'

import { shortenAddress } from '@/helpers/utils'
import CandidateModal from './candidateModal'
import { useMetadata } from '@/hooks/atbash'

type CandidateCardProps = {
  address: string
  proposalId: string
}

export default function CandidateCard({
  address,
  proposalId,
}: CandidateCardProps) {
  const { proposalMetadata } = useMetadata(Number(proposalId)) || {
    proposalMetadata: { candidateMetadata: {} },
  }
  const candidates = proposalMetadata?.candidateMetadata
  const { avatar, name, description } = candidates[address] || {
    avatar: '',
    name: '',
    description: '',
  }

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
            <p>{shortenAddress(address)}</p>
            <Clipboard
              tooltipClassName="tooltip tooltip-right"
              content={address}
            />
          </div>
          <CandidateModal
            name={name}
            description={description}
            avatar={avatar}
          />
        </div>
      </div>
    </div>
  )
}
