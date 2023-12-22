'use client'
import { useSearchParams } from 'next/navigation'

import Vote from './vote'

import { useProposalData } from '@/hooks/atbash'
import GetResult from './getResult'

export default function ProposalDetail() {
  const searchParams = useSearchParams()
  const proposalId = searchParams.get('proposalId')
  if (proposalId === null) return
  const proposal = useProposalData(Number(proposalId))
  if (!proposal) return

  return (
    <div>
      {proposal.candidates.map((candidate) => (
        <Vote
          candidate={candidate}
          key={candidate}
          proposalId={Number(proposalId)}
        />
      ))}
      <GetResult proposalId={Number(proposalId)} />
    </div>
  )
}
