'use client'
import { useRouter, useSearchParams } from 'next/navigation'

import Banner from './banner'
import CandidateCard from './candidateCard'
import { ChevronLeft, PackageCheck } from 'lucide-react'
import { useMetadata } from '@/hooks/atbash'

import './index.scss'

import Vote from './vote'
import GetResult from './getResult'

import { useProposalData } from '@/hooks/atbash'

export default function ProposalDetail() {
  const { back } = useRouter()
  const searchParams = useSearchParams()
  const proposalId = searchParams.get('proposalId') || ''

  const { proposalMetadata } = useMetadata(Number(proposalId)) || {
    proposalMetadata: {
      title: '',
      description: '',
      image: '',
      candidateMetadata: {},
    },
  }
  const listCandidate = proposalMetadata.candidateMetadata

  return (
    <div className="w-full">
      <div>
        <Banner imageUrl={proposalMetadata.image} />
      </div>
      <div className="max-w-[1040px] relative flex flex-col align-middle gap-2 mx-auto -top-20">
        <div>
          <button onClick={back} className="btn btn-primary btn-sm text-black">
            <ChevronLeft /> Back
          </button>
        </div>
        <div className="card bg-[#F2F4FA] p-6 rounded-2xl grid grid-cols-12 gap-4">
          <div className="col-span-full flex justify-between">
            <h4>{proposalMetadata.title}</h4>
            <button className="btn btn-primary btn-sm text-black">
              <PackageCheck /> Get Result
            </button>
          </div>
          <div className="col-span-full">
            <h5>Description</h5>
            <p>{proposalMetadata.description}</p>
          </div>
        </div>
        <div className="card bg-[#F2F4FA] p-6 rounded-2xl grid grid-cols-12 gap-6">
          <div className="col-span-full">
            <h5>Campaign Candidate</h5>
          </div>
          <div className="col-span-full">
            <div className="grid grid-cols-3 items-center gap-2">
              {Object.keys(listCandidate).map((address) => (
                <CandidateCard
                  key={address}
                  address={address}
                  proposalId={proposalId}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
