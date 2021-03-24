import * as React from 'react'
import { useFormContext } from 'react-hook-form'
//
import { FileListItem } from './li'
import { Button } from '../../../../button'
import { FileContextData, PresignedUpload } from '../'

interface FileListProps {
  name: any
  value: any
  onChange: any
  uploadInputRef: any
  onDeleteMutation: any
  onUploadComplete: any
  allowMultipleFiles: boolean
  // imageUploadUrl: ImageUploadUrl
  presignedUpload: PresignedUpload
}

export function FileList(props: FileListProps) {
  const ctx = useFormContext()

  if (ctx === undefined) {
    throw new Error('FormToggle must be rendered inside a Form component')
  }

  const onClickAddImageButton = React.useCallback(
    () => props.uploadInputRef.current?.click(),
    [props.uploadInputRef]
  )

  const ulClasses = ['space-y-4']

  if (!props.allowMultipleFiles || ctx.formState.isSubmitting) {
    ulClasses.push('mb-1')
  } else {
    ulClasses.push('mb-5')
  }

  const wrapperClasses = ['w-full px-6 py-4 border rounded-lg shadow-sm']
  if (ctx.formState.isSubmitting) {
    wrapperClasses.push('bg-gray-200')
  }

  return props.value.length ? (
    <div className={wrapperClasses.join(' ')}>
      <ul className={ulClasses.join(' ')}>
        {props.value.map((file: FileContextData) => (
          <FileListItem
            key={file.id}
            file={file.file}
            status={file.status}
            remoteFileKey={file.id + '/' + file.fileName}
            fileName={file.fileName}
            variableName={props.name}
            presignedUpload={props.presignedUpload}
            onUploadComplete={props.onUploadComplete}
          />
        ))}
      </ul>
      {ctx.formState.isSubmitting || !props.allowMultipleFiles ? null : (
        <Button fluid buttonStyle='secondary' onClick={onClickAddImageButton}>
          Add another file
        </Button>
      )}
    </div>
  ) : null
}
