import { useContractRead } from 'wagmi'

import abi from '@/static/abi/Atbash.json'

export const useProposals = () => {
  const { data } = useContractRead({
    address: '0x5aeB2f77E1829B14461588370E9C132d214dd3Ad',
    abi: abi,
    functionName: 'proposalId',
  })
  return data
}
