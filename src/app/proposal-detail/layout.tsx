import { ReactNode } from 'react'

export default function ProposalDetailsLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="p-6 w-full flex flex-col items-center">
      <div className="max-w-[1040px] w-full">{children}</div>
    </div>
  )
}
