import * as React from 'react'
import { useDropzone } from 'react-dropzone'
import { Controller, useFormContext } from 'react-hook-form'
//
import { FileListItem } from './li'
import { UploadInput } from './input'
import { Button } from '../../../button'
import { FormLabel } from '../misc/label'

type FormUploadProps = FormUploadBasics & Partial<HTMLInputElement>

interface FormUploadBasics {
  name: string
  label: string
  onDeleteMutation: () => void
  // ideally return fileId?
  onUploadComplete: (...args: any[]) => Promise<{ fileId: string }>
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

      // const { fileId } = await props.uploadFile()

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

  return (
    <div>
      <FormLabel name={props.name} label={props.label} error={props.error} />
      <ExistingFiles
        name={name}
        value={value}
        onChange={onChange}
        uploadInputRef={inputRef}
        onDeleteMutation={onDeleteMutation}
        onUploadComplete={onUploadComplete}
        allowMultipleFiles={!!props.multiple}
      />
      <UploadInput
        hidden={!!props.value.length}
        getRootProps={getRootProps}
        getInputProps={getInputProps}
      />
    </div>
  )
}

function ExistingFiles(props: {
  name: any
  value: any
  onChange: any
  uploadInputRef: any
  onDeleteMutation: any
  onUploadComplete: any
  allowMultipleFiles: boolean
}) {
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
        {props.value.map((file: FileState) => (
          <FileListItem
            key={file.id}
            file={file.file}
            status={file.status}
            remoteFileId={file.id}
            fileName={file.fileName}
            variableName={props.name}
            onUploadComplete={props.onUploadComplete}
          />
        ))}
      </ul>
      {ctx.formState.isSubmitting || !props.allowMultipleFiles ? null : (
        <Button
          fluid
          color='light'
          label='Add another file'
          onClick={onClickAddImageButton}
        />
      )}
    </div>
  ) : null
}
