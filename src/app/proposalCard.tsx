'use client'
import { useProposalData } from '@/hooks/atbash'

type ProposalCardProps = {
  proposalId: number
}

export default function ProposalCard({ proposalId }: ProposalCardProps) {
  const proposal = useProposalData(proposalId)
  console.log(proposal)
  return (
    <div className="w-full bg-gray-100 rounded-2xl p-2 flex flex-col gap-4">
      <img
        className="aspect-video rounded-2xl"
        alt="banner"
        src="https://psyxmwdgtfwzworjuzqw.supabase.co/storage/v1/object/public/space3/public/51c7964676cf1db5ca4cda4ed677ec92cf02147e8dd6fc44e41d60c3ae506ade"
      />
      <h5>Title</h5>
      <p>Description</p>
    </div>
  )
}
