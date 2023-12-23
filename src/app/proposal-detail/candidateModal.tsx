'use client'
import { Fragment, useState } from 'react'

import Modal from '@/components/modal'

type CandidateCardProps = {
  name: string
  avatar: string
  description: string
}

export default function CandidateModal({
  name,
  avatar,
  description,
}: CandidateCardProps) {
  const [open, setOpen] = useState(false)
  return (
    <Fragment>
      <button
        onClick={() => setOpen(true)}
        className="btn btn-sm btn-primary text-black font-medium"
      >
        Vote now
      </button>
      <Modal open={open} onCancel={() => setOpen(false)}>
        <div className="flex flex-col items-center gap-6">
          <h5 className="text-center">Candidate Details</h5>
          <div className="flex flex-col gap-1 items-center">
            <div className="avatar">
              <div className="w-24 rounded">
                <img src={avatar} />
              </div>
            </div>
            <h5>{name}</h5>
            <p>{description}</p>
          </div>
          <div className="card-actions justify-end">
            <button onClick={() => setOpen(false)} className="btn btn-sm">
              Close
            </button>
            <button className="btn btn-sm btn-primary text-black">Vote</button>
          </div>
        </div>
      </Modal>
    </Fragment>
  )
}
