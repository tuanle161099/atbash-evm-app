'use client'
import { Fragment, useCallback, useMemo, useState } from 'react'

import { usePushMessage } from '@/components/message/store'
import Modal from '@/components/modal'
import { PackageCheck } from 'lucide-react'

import { useCandidateData, useGetWinner, useProposalData } from '@/hooks/atbash'
import classNames from 'classnames'

type GetResultProps = {
  proposalId: number
}
export default function GetResult({ proposalId }: GetResultProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isGetResult, setIsGetResult] = useState(false)
  const pushMessage = usePushMessage()
  const getWinner = useGetWinner(proposalId)
  const proposal = useProposalData(proposalId)

  const [result, setResult] = useState<number[]>(
    Array(proposal.candidates.length).fill(0),
  )
  const maxResult = useMemo(() => Math.max(...result), [result])
  const onGetWinner = useCallback(async () => {
    try {
      setLoading(true)
      const result = await getWinner()
      setResult(result)
      setIsGetResult(true)
      pushMessage('alert-success', 'Get result successfully')
    } catch (er: any) {
      setIsGetResult(false)
      return pushMessage('alert-error', er.message)
    } finally {
      setLoading(false)
    }
  }, [getWinner, pushMessage])

  if (!proposal) return <Fragment />
  return (
    <Fragment>
      <button
        onClick={() => setOpen(true)}
        className="btn btn-primary btn-sm text-black"
      >
        <PackageCheck /> Get Result
      </button>
      <Modal className="max-w-4xl" open={open} onCancel={() => setOpen(false)}>
        <div className="flex flex-col w-full gap-6 items-center rounded-lg">
          <h5>{isGetResult ? 'Results' : 'Get Results'}</h5>
          <div className="flex flex-row flex-wrap w-full gap-4 max-h-80  justify-center overflow-y-auto">
            {proposal.candidates.map((address, i) => (
              <Candidate
                key={address}
                address={address}
                proposalId={Number(proposalId)}
                result={result[i]}
                active={!!result[i] && result[i] === maxResult}
              />
            ))}
          </div>
          {isGetResult ? (
            <button onClick={() => setOpen(false)} className="btn ">
              Close
            </button>
          ) : (
            <button
              onClick={onGetWinner}
              className="btn btn-primary text-black "
            >
              {loading && (
                <span className="loading loading-spinner loading-sm" />
              )}
              Get result
            </button>
          )}
        </div>
      </Modal>
    </Fragment>
  )
}

type CandidateProps = {
  address: string
  proposalId: number
  result: number
  active: boolean
}

const Candidate = ({
  address,
  proposalId,
  result = 0,
  active = false,
}: CandidateProps) => {
  const { avatar, name } = useCandidateData(proposalId, address)

  return (
    <div className="flex flex-col relative ">
      <p
        className={classNames(
          'p-2 font-semibold bg-[#ECEADD] rounded-t-2xl text-center',
          { 'bg-primary': active },
        )}
      >
        {name}
      </p>
      <div
        className={classNames(
          'card rounded-t-none h-64 w-64 bg-[#ECEADD] image-full',
        )}
      >
        <figure>
          <img src={avatar} alt="Candidate" />
        </figure>
        <div className="flex p-4">
          <h4
            className={classNames(
              'text-sm bg-base-200 p-2 rounded-lg w-full text-center self-end',
              { 'bg-primary': active },
            )}
          >
            {result}
          </h4>
        </div>
      </div>
    </div>
  )
}
