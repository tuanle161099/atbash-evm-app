'use client'
import { Fragment, ReactNode, useMemo } from 'react'
import { create } from 'zustand'
import { persist, createJSONStorage, devtools } from 'zustand/middleware'
import { useNetwork } from 'wagmi'

import { env } from '@/configs/env'
import VRC25Issuer from '@/static/abi/VRC25Issuer.json'

/**
 * Store
 */

export type IssuerStore = {
  tokenAddress: string
  setTokenAddress: (tokenAddress: string) => void
}

export const useIssuerStore = create<IssuerStore>()(
  devtools(
    persist(
      (set) => ({
        tokenAddress: '',
        setTokenAddress: (tokenAddress: string) =>
          set({ tokenAddress }, false, 'setTokenAddress'),
      }),
      {
        name: 'issuer',
        storage: createJSONStorage(() => localStorage),
      },
    ),
    {
      name: 'issuer',
      enabled: env === 'development',
    },
  ),
)

/**
 * Hook
 */

export const useTokenAddress = () => {
  return useIssuerStore(({ tokenAddress, setTokenAddress }) => ({
    tokenAddress,
    setTokenAddress,
  }))
}

export const useVRC25IssuerContract = () => {
  const { chain } = useNetwork()

  const vrc25Issuer = useMemo((): {
    address: `0x${string}`
    abi: typeof VRC25Issuer
  } => {
    if (chain?.id === 88)
      return {
        address: '0x8c0faeb5c6bed2129b8674f262fd45c4e9468bee',
        abi: VRC25Issuer,
      }
    return {
      address: '0x0E2C88753131CE01c7551B726b28BFD04e44003F',
      abi: VRC25Issuer,
    }
  }, [chain])

  return vrc25Issuer
}

/**
 * Provider
 */

export default function IssuerProvider({ children }: { children: ReactNode }) {
  return <Fragment>{children}</Fragment>
}
