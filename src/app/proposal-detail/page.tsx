'use client'
import { useSearchParams } from 'next/navigation'

import Vote from './vote'
import GetResult from './getResult'

import { useProposalData } from '@/hooks/atbash'

export default function ProposalDetail() {
  const searchParams = useSearchParams()
  const proposalId = searchParams.get('proposalId')
  const proposal = useProposalData(Number(proposalId))

  return (
    <div>
      {proposal?.candidates.map((candidate) => (
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
