'use client'
import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createGlobalState } from 'react-use'

import { ChevronLeft } from 'lucide-react'
import { Steps } from 'antd'

import './index.scss'
import { InitProposalProps, ProposalMetadata } from '@/types'
import Campaign from './campaign'
import Candidates from './candidates'
import Voters from './voters'

const PROPOSAL_INFO = 0
const CANDIDATE_INFO = 1
const VOTER_ACCEPTED = 2

const DEFAULT_PROPOSAL_METADATA: ProposalMetadata = {
  title: '',
  description: '',
  image: '',
  candidateMetadata: {},
}

const DEFAULT_PROPOSAL: InitProposalProps = {
  startTime: Date.now(), //now
  endTime: Date.now() + 3 * (24 * 60 * 60 * 1000), // Add more 3 days
  voters: [],
  candidates: [],
  proposalMetadata: DEFAULT_PROPOSAL_METADATA,
}

export const useGlobalCampaign =
  createGlobalState<InitProposalProps>(DEFAULT_PROPOSAL)

export default function NewProposal() {
  const [step, setStep] = useState(PROPOSAL_INFO)
  const { back, push } = useRouter()

  const processInit = useMemo(() => {
    switch (step) {
      case PROPOSAL_INFO:
        return <Candidates />
      case CANDIDATE_INFO:
        return <Campaign onNext={() => setStep(CANDIDATE_INFO)} />
      case VOTER_ACCEPTED:
        return <Voters />
    }
  }, [step])

  return (
    <div className="bg-base-100 p-6 rounded-2xl grid grid-cols-12 gap-4">
      <div className="col-span-12 flex items-center justify-between">
        <button className="btn btn-sm btn-ghost -ml-3" onClick={back}>
          <ChevronLeft /> Back
        </button>
        <h5>New Campaign</h5>
      </div>
      <Steps
        className="col-span-full mb-2"
        size="small"
        current={step}
        direction="horizontal"
      >
        <Steps.Step title="Create Campaign" />
        <Steps.Step title="Candidate Settings" />
        <Steps.Step title="Voter Settings" />
      </Steps>
      <div className="col-span-full">{processInit}</div>
    </div>
  )
}
