'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAccount } from 'wagmi'
import classNames from 'classnames'

import { ChevronLeft } from 'lucide-react'
import TimeCountDown from '@/components/timeCountDown'
import Banner from './banner'
import CandidateCard from './candidateCard'
import GetResult from './getResult'

import { useMetadata, useProposalData } from '@/hooks/atbash'

import './index.scss'

export default function ProposalDetail() {
  const { back } = useRouter()
  const searchParams = useSearchParams()
  const proposalId = searchParams.get('proposalId')
  const { metadata, isLoading } = useMetadata(Number(proposalId))
  const { address } = useAccount()
  const proposal = useProposalData(Number(proposalId))

  const { title, description, image, candidateMetadata } =
    metadata?.proposalMetadata || {
      title: '',
      description: '',
      image: '',
      candidateMetadata: {},
    }

  return (
    <div className={classNames('w-full', { 'animate-pulse': isLoading })}>
      <Banner imageUrl={image} />
      <div className="max-w-[1040px] relative flex flex-col align-middle gap-2 mx-auto -top-20 p-4">
        <div>
          <button onClick={back} className="btn  btn-sm text-black">
            <ChevronLeft /> Back
          </button>
        </div>
        <div className="card bg-[#F2F4FA] p-4 rounded-2xl flex-row gap-4 grid col-span-12">
          <div className="flex gap-4 col-span-full justify-between flex-wrap">
            <h5>{title}</h5>
            <div className="flex items-center gap-4">
              <TimeCountDown proposalId={Number(proposalId)} />
              {!!proposal && proposal.authority === address && (
                <GetResult proposalId={Number(proposalId)} />
              )}
            </div>
          </div>
          <p className="opacity-50 col-span-full">{description}</p>
        </div>
        <div className="card bg-[#F2F4FA] p-4 rounded-2xl flex flex-col gap-4">
          <h5>Candidate Slate</h5>
          <div className="grid grid-cols-12 gap-3">
            {Object.keys(candidateMetadata).map((candidate) => (
              <div
                className="md:col-span-3 col-span-full h-full"
                key={candidate}
              >
                <CandidateCard
                  candidate={candidate}
                  proposalId={Number(proposalId)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
