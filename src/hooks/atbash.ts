import { useCallback, useMemo } from 'react'
import { useContractRead, useContractWrite } from 'wagmi'
import * as secp256k1 from '@noble/secp256k1'
import { decode, encode } from 'bs58'
import { hexToBytes } from 'viem'
import axios from 'axios'
import useSWR from 'swr'
import { bytesToHex } from 'viem'

import { InitProposalProps, Proposal } from '@/types'
import { randomNumber } from '@/helpers/utils'
import { toFilename, uploadFileToSupabase } from '@/helpers/upload'
import { useMerkleDistributor } from './merkle'
import { usePubkey } from './identity'

import Atbash from '@/static/abi/Atbash.json'

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
  return data as Proposal
}

export const useMetadata = (proposalId: number) => {
  const { metadata } = useProposalData(proposalId) || { metadata: '' }

  const fetcher = useCallback(async ([metadata]: [any]) => {
    if (!metadata) return
    let cid = encode(Buffer.from(hexToBytes(metadata)))
    const fileName = toFilename(cid)
    const url =
      'https://hnreqcvgchtokkqynbli.supabase.co/storage/v1/object/public/atbash/public/' +
      fileName
    const { data } = await axios.get(url)

    return data
  }, [])

  const { data } = useSWR([metadata], fetcher)

  return data
}

export const useInitProposal = (props: InitProposalProps) => {
  const { abi, address } = useAtbashContract()

  const { writeAsync } = useContractWrite({
    address,
    abi,
    functionName: 'initProposal',
  })
  const merkleDistributor = useMerkleDistributor(props.voters)
  const pubkey = usePubkey()

  const initProposal = useCallback(async () => {
    const { startTime, endTime, candidates, proposalMetadata } = props
    const root = merkleDistributor.root.value
    const merkleBuff = merkleDistributor.toBuffer()
    const blob = [
      new Blob([JSON.stringify({ proposalMetadata, merkleBuff }, null, 2)], {
        type: 'application/json',
      }),
    ]
    const file = new File(blob, 'metadata.txt')
    const cid = await uploadFileToSupabase(file)
    const zero = secp256k1.Point.ZERO

    const randomsNumber: bigint[] = []
    const ballotBoxes = candidates.map(() => {
      const r = randomNumber()
      randomsNumber.push(r)
      const M = zero.add(pubkey.multiply(r))
      return { x: M.x, y: M.y }
    })
    const commitment = randomNumber()

    const tx = await writeAsync({
      args: [
        bytesToHex(root),
        bytesToHex(decode(cid)),
        BigInt(Math.floor(startTime / 1000)),
        BigInt(Math.floor(endTime / 1000)),
        commitment,
        randomsNumber,
        candidates,
        ballotBoxes,
      ],
    })
    return tx.hash
  }, [props])

  return initProposal
}
