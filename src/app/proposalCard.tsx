'use client'
import { useMetadata, useProposalData } from '@/hooks/atbash'

type ProposalCardProps = {
  proposalId: number
}

export default function ProposalCard({ proposalId }: ProposalCardProps) {
  const proposal = useProposalData(proposalId)
  const { proposalMetadata } = useMetadata(proposalId) || {
    proposalMetadata: { title: '', description: '', image: '' },
  }

  return (
    <div className="w-full bg-base-100 rounded-2xl p-4 flex flex-col gap-4">
      <img
        className="aspect-video rounded-2xl"
        alt="banner"
        src={proposalMetadata.image}
      />
      <h5>{proposalMetadata.title}</h5>
      <p>{proposalMetadata.description}</p>
    </div>
  )
}
