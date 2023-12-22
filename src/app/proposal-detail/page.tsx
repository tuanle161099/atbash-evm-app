'use client'
import { useSearchParams } from 'next/navigation'

export default function ProposalDetail() {
  const searchParams = useSearchParams()
  const proposalId = searchParams.get('proposalId') || ''
  return <div>page</div>
}
