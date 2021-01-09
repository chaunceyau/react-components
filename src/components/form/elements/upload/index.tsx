import * as React from 'react'
import { useDropzone } from 'react-dropzone'
import { Controller, useFormContext } from 'react-hook-form'
//
import { FileListItem } from './li'
import { Button } from '../../../button'
import { FieldLabel } from '../misc/label'
import { UploadInput } from './input'

type FormUploadProps = FormUploadBasics & Partial<HTMLInputElement>

interface FormUploadBasics {
  name: string
  label: string
  onDeleteMutation: () => void
  onUploadComplete: (...args: any[]) => any | Promise<any>
}

interface FileState {
  id: string
  file?: File
  fileName: string
  status: 'IDLE' | 'PENDING_REMOVAL'
}

export function FormUpload(props: FormUploadProps) {
  return (
    <Controller
      name={props.name}
      render={({ onChange, value }) => (
        <FormUploadComponent {...props} value={value} onChange={onChange} />
      )}
    />
  )
}

function FormUploadComponent(props: any) {
  const onDrop = React.useCallback(
    (acceptedFiles) => {
      const currentFiles = props.value
      const newFiles = acceptedFiles.map((file: File) => ({
        id: Math.random().toString(), // TODO: update,
        file: file,
        fileName: file.name,
        status: 'IDLE'
      }))

      props.onChange([...currentFiles, ...newFiles])
    },
    [props]
  )

  // should destructure all props of FormUploadProps
  const {
    id,
    name,
    label,
    value,
    onChange,
    onUploadComplete,
    onDeleteMutation,
    ...inputProps
  } = props

  const { getRootProps, getInputProps, inputRef } = useDropzone({
    onDrop,
    ...inputProps,
    multiple: !!inputProps.multiple
  })

  const onClickAddImageButton = React.useCallback(
    () => inputRef?.current?.click(),
    [inputRef]
  )

  const { formState } = useFormContext()

  const ulClasses = ['space-y-4']

  if (!inputProps.multiple || formState.isSubmitting) {
    ulClasses.push('mb-1')
  } else {
    ulClasses.push('mb-5')
  }

  const wrapperClasses = ['w-full px-6 py-4 border rounded-lg']
  if (formState.isSubmitting) {
    wrapperClasses.push('bg-gray-200')
  }

  return (
    <div>
      <FieldLabel name={props.name} label={props.label} error={props.error} />

      {props.value.length ? (
        <div className={wrapperClasses.join(' ')}>
          <ul className={ulClasses.join(' ')}>
            {props.value.map((file: FileState) => (
              <FileListItem
                key={file.id}
                file={file.file}
                status={file.status}
                remoteFileId={file.id}
                fileName={file.fileName}
                variableName={props.name}
                onUploadComplete={onUploadComplete}
              />
            ))}
          </ul>
          {formState.isSubmitting || !inputProps.multiple ? null : (
            <Button
              fluid
              type='button'
              color='light'
              content='Add another file'
              onClick={onClickAddImageButton}
            />
          )}
        </div>
      ) : null}
      <UploadInput
        hidden={!!props.value.length}
        getRootProps={getRootProps}
        getInputProps={getInputProps}
      />
    </div>
  )
}
