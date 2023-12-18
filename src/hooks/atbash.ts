import { useContractRead, useNetwork } from 'wagmi'

import Atbash from '@/static/abi/Atbash.json'
import { useMemo } from 'react'

export const useAtbashContract = () => {
  const atbash = useMemo((): {
    address: `0x${string}`
    abi: typeof Atbash
  } => {
    return {
      address: '0x5aeB2f77E1829B14461588370E9C132d214dd3Ad',
      abi: Atbash,
    }
  }, [])

  return atbash
}

export const useProposalCount = () => {
  const atbash = useAtbashContract()
  const { data: max, isLoading } = useContractRead({
    address: atbash.address,
    abi: atbash.abi,
    functionName: 'proposalId',
  })
  return { amount: Number(max) || 0, isLoading }
}

export const useProposalData = (proposalId: number) => {
  const { abi, address } = useAtbashContract()

  const { data } = useContractRead({
    address,
    abi,
    functionName: 'getProposal',
    args: [proposalId],
  })
  return data
}
