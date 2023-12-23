import { Fragment, useCallback, useState } from 'react'

import { usePushMessage } from '@/components/message/store'
import Modal from '@/components/modal'

import { useGetWinner, useProposalData } from '@/hooks/atbash'

type GetResultProps = {
  proposalId: number
}
export default function GetResult({ proposalId }: GetResultProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const getWinner = useGetWinner(proposalId)
  const proposal = useProposalData(proposalId)
  const pushMessage = usePushMessage()
  const [result, setResult] = useState<number[]>(
    Array(proposal.candidates.length).fill(0),
  )
  const onGetWinner = useCallback(async () => {
    try {
      setLoading(true)
      const result = await getWinner()
      setResult(result)
      pushMessage('alert-success', 'Get result successfully')
    } catch (er: any) {
      return pushMessage('alert-error', er.message)
    } finally {
      setLoading(false)
    }
  }, [getWinner, pushMessage])
  return (
    <Fragment>
      <button
        className="btn btn-primary text-black"
        onClick={() => setOpen(true)}
      >
        Get result
      </button>
      <Modal open={open} onCancel={() => setOpen(false)}>
        <div className="flex flex-col gap-6 items-center rounded-lg">
          {proposal.candidates.map((address, i) => (
            <p key={address}>
              {address} === result: {result[i]}
            </p>
          ))}
          <button
            onClick={onGetWinner}
            className="btn btn-primary text-black w-full "
          >
            {loading && <span className="loading loading-spinner loading-sm" />}
            Get result
          </button>
        </div>
      </Modal>
    </Fragment>
  )
}
