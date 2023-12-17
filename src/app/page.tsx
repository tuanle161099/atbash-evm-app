'use client'

import { useProposals } from '@/hooks/atbash'

export default function Home() {
  const proposals = useProposals()
  console.log(proposals)
  return <div>Page content</div>
}
