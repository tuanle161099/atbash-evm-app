'use client'
import { useRouter, useSearchParams } from 'next/navigation'

import Banner from './banner'
import CandidateCard from './candidateCard'
import { ChevronLeft } from 'lucide-react'
import GetResult from './getResult'
import TimeCountDown from '@/components/timeCountDown'
import { useAccount } from 'wagmi'

import { useMetadata, useProposalData } from '@/hooks/atbash'

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
  const { address } = useAccount()
  const proposal = useProposalData(Number(proposalId))

  return (
    <div className="w-full ">
      <Banner imageUrl={proposalMetadata.image} />
      <div className="max-w-[1040px] relative flex flex-col align-middle gap-2 mx-auto -top-20 p-4">
        <div>
          <button onClick={back} className="btn  btn-sm text-black">
            <ChevronLeft /> Back
          </button>
        </div>
        <div className="card bg-[#F2F4FA] p-4 rounded-2xl flex-row gap-1 justify-between">
          <div className="flex flex-col gap-4">
            <h5>{proposalMetadata.title}</h5>
            <p className="opacity-50">{proposalMetadata.description}</p>
          </div>
          <div className="flex flex-col gap-4">
            {!!proposal && proposal.authority === address && (
              <GetResult proposalId={Number(proposalId)} />
            )}
            <TimeCountDown proposalId={Number(proposalId)} />
          </div>
        </div>
        <div className="card bg-[#F2F4FA] p-4 rounded-2xl flex flex-col gap-4">
          <h5>Candidate Slate</h5>
          <div className="grid grid-cols-12 gap-3">
            {Object.keys(proposalMetadata.candidateMetadata).map(
              (candidate) => (
                <div className="col-span-3" key={candidate}>
                  <CandidateCard
                    candidate={candidate}
                    proposalId={Number(proposalId)}
                  />
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
