export type Proposal = {
  merkleRoot: string
  metadata: string
  ballotBoxes: [bigint, bigint][]
  startDate: bigint
  endDate: bigint
  randomNumbers: bigint[]
  candidates: string[]
  commitment: bigint
}

export type CandidateMetadata = {
  name: string
  avatar: string
  description: string
}

export type ProposalMetadata = {
  title: string
  description: string
  image: string
  candidateMetadata: Record<string, CandidateMetadata>
}

export type InitProposalProps = {
  startTime: number
  endTime: number
  voters: string[]
  candidates: string[]
  proposalMetadata: ProposalMetadata
}
