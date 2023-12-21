'use client'

import Link from 'next/link'
import Island from '@/components/island'
import ProposalCard from './proposalCard'

import { useProposalCount } from '@/hooks/atbash'
import { Plus } from 'lucide-react'
import Header from './header'

export default function Home() {
  const { amount } = useProposalCount()
  return (
    <Island>
      <div className="flex flex-col gap-6 pb-6">
        <header>
          <Header />
        </header>
        <div className="flex flex-col items-center">
          <div className="max-w-[1200px] w-full flex gap-6 flex-col ">
            <div className="flex items-center">
              <h4 className="flex-auto">All Campaigns {amount}</h4>
              <Link href="/new-proposal" className="btn btn-primary text-black">
                <Plus /> Add new
              </Link>
            </div>
            <div className="w-full grid grid-cols-12 gap-4">
              {Array.from(Array(amount).keys()).map((proposalId) => (
                <div className="col-span-3" key={proposalId}>
                  <ProposalCard proposalId={proposalId} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Island>
  )
}
