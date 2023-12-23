'use client'
import { useRouter, useSearchParams } from 'next/navigation'

import Banner from './banner'
import CandidateCard from './candidateCard'
import { ChevronLeft } from 'lucide-react'
import GetResult from './getResult'
import TimeCountDown from '@/components/timeCountDown'

import { useMetadata } from '@/hooks/atbash'

import './index.scss'

export default function ProposalDetail() {
  const { back } = useRouter()
  const searchParams = useSearchParams()
  const proposalId = searchParams.get('proposalId')
  const { proposalMetadata } = useMetadata(Number(proposalId)) || {
    proposalMetadata: {
      title: '',
      description: '',
      image: '',
      candidateMetadata: {},
    },
  }

  return (
    <div className="w-full">
      <Banner imageUrl={proposalMetadata.image} />
      <div className="max-w-[1040px] relative flex flex-col align-middle gap-2 mx-auto -top-20">
        <div>
          <button onClick={back} className="btn btn-primary btn-sm text-black">
            <ChevronLeft /> Back
          </button>
        </div>
        <div className="card bg-[#F2F4FA] p-6 rounded-2xl grid grid-cols-12 gap-4">
          <div className="col-span-full flex justify-between">
            <h4>{proposalMetadata.title}</h4>
            <GetResult proposalId={Number(proposalId)} />
          </div>
          <div className="col-span-full">
            <TimeCountDown proposalId={Number(proposalId)} />
          </div>
          <div className="col-span-full">
            <h5>Description</h5>
            <p>{proposalMetadata.description}</p>
          </div>
        </div>
        <div className="card bg-[#F2F4FA] p-6 rounded-2xl flex flex-col gap-6">
          <h5>Campaign Candidate</h5>
          <div className="grid grid-cols-3 items-center gap-2">
            {Object.keys(proposalMetadata.candidateMetadata).map(
              (candidate) => (
                <CandidateCard
                  key={candidate}
                  candidate={candidate}
                  proposalId={Number(proposalId)}
                />
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
