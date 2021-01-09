import React from 'react'
import { useFormContext } from 'react-hook-form'
//
import { ProgressBar } from './progress'
import { CheckIcon } from '../../../icons/check'
import { ArchiveSvg } from '../../../icons/archive'
import { useUploadReducer } from './useUploadReducer'
import { LoadingSpinner } from '../../../misc/spinner'

interface FileListItemProps {
  remoteFileId: string
  file?: File
  fileName: string
  status: string
  variableName: string
  onUploadComplete: (fileId: string) => any
}

export function FileListItem(props: FileListItemProps) {
  const { formState, setValue, getValues } = useFormContext()

  const pendingRemoval = props.status === 'PENDING_REMOVAL'

  const state = useUploadReducer(
    props.file || null,
    props.variableName,
    props.remoteFileId
  )

  const liClasses = ['flex items-center']

  if (pendingRemoval || formState.isSubmitting) {
    liClasses.push('line-through text-gray-300')
  } else if (state.error) {
    liClasses.push('text-red-500')
  } else {
    liClasses.push(
      !props.file || state.progress === 100 ? 'text-green-500' : 'text-gray-400'
    )
  }
  // TODO: error on liClasses... i.e. progress not 100 and error

  const showLoading = !state.error && props.file && state.progress !== 100

  return (
    <li key={props.remoteFileId} className={liClasses.join(' ')}>
      {showLoading ? <LoadingSpinner /> : <CheckIcon />}

      <p className='flex-shrink-0 flex-grow mr-8 ml-3 overflow-hidden text-sm'>
        {props.fileName.slice(0, 15)}
        {props.fileName.length > 15 ? '...' : null}
      </p>

      {showLoading ? (
        <div className='flex-grow mr-6'>
          <ProgressBar percent={state.progress} />
        </div>
      ) : null}

      {pendingRemoval ? (
        <button
          type='button'
          disabled={formState.isSubmitting}
          onClick={() => {
            // map through existing and update statuss

            setValue(
              props.variableName,
              getValues()[props.variableName].map((val: any) =>
                val.id === props.remoteFileId
                  ? Object.assign({}, val, { status: 'IDLE' })
                  : val
              )
            )
          }}
        >
          <svg
            aria-hidden='true'
            focusable='false'
            data-prefix='fas'
            data-icon='undo-alt'
            className='w-3 h-auto'
            role='img'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 512 512'
          >
            <path
              fill='currentColor'
              d='M255.545 8c-66.269.119-126.438 26.233-170.86 68.685L48.971 40.971C33.851 25.851 8 36.559 8 57.941V192c0 13.255 10.745 24 24 24h134.059c21.382 0 32.09-25.851 16.971-40.971l-41.75-41.75c30.864-28.899 70.801-44.907 113.23-45.273 92.398-.798 170.283 73.977 169.484 169.442C423.236 348.009 349.816 424 256 424c-41.127 0-79.997-14.678-110.63-41.556-4.743-4.161-11.906-3.908-16.368.553L89.34 422.659c-4.872 4.872-4.631 12.815.482 17.433C133.798 479.813 192.074 504 256 504c136.966 0 247.999-111.033 248-247.998C504.001 119.193 392.354 7.755 255.545 8z'
            ></path>
          </svg>
        </button>
      ) : null}
      {!pendingRemoval ? (
        <button
          type='button'
          className='ml-4'
          disabled={formState.isSubmitting}
          onClick={() => {
            setValue(
              props.variableName,
              // map through existing and update statuss
              getValues()[props.variableName].map((val: any) =>
                val.id === props.remoteFileId
                  ? Object.assign({}, val, { status: 'PENDING_REMOVAL' })
                  : val
              )
            )
          }}
        >
          <ArchiveSvg />
        </button>
      ) : null}
    </li>
  )
}
