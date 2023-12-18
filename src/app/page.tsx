'use client'

import Island from '@/components/island'
import ProposalCard from './proposalCard'

import { useProposalCount } from '@/hooks/atbash'
import Splash from '@/components/splash'

export default function Home() {
  const { amount, isLoading } = useProposalCount()
  // if (isLoading) return <Splash open={isLoading} />
  return (
    <Island>
      <div className="flex flex-col items-center">
        <div className="max-w-[1200px] w-full flex gap-6 flex-col ">
          <h4>All Campaigns {amount}</h4>
          <div className="w-full grid grid-cols-12 gap-4">
            {Array.from(Array(amount).keys()).map((proposalId) => (
              <div className="col-span-3" key={proposalId}>
                <ProposalCard proposalId={proposalId} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Island>
  )
}
