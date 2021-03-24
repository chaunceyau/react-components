import * as React from 'react'
import { useDropzone } from 'react-dropzone'
import { useController } from 'react-hook-form'
// import { Controller, useController, useFormContext } from 'react-hook-form'
import { nanoid } from 'nanoid'
//
import { FileList } from './items/list'

import { UploadInput } from './input'
import { FormLabel } from '../misc/label'
// import contentDisposition from 'content-disposition'

type FormUploadProps = FormUploadBasics &
  Partial<Omit<HTMLInputElement, 'value'>>
export type ImageUploadUrl = (file: File) => Promise<string> //| string
export type PresignedUpload = (
  file: File
) => Promise<{
  data: {
    presignedUpload: {
      url: string
      fileId: string
      fields: Array<{ [key: string]: string }>
    }
  }
}>

interface FormUploadBasics {
  name: string
  label: string
  required: boolean
  onDeleteMutation: () => void
  // ideally return fileId?
  // imageUploadUrl: ImageUploadUrl
  presignedUpload: PresignedUpload
  onUploadComplete: (key: string) => Promise<any>
}

export interface FileContextData {
  id: string
  file?: File
  fileName: string
  status: 'IDLE' | 'PENDING_REMOVAL'
  progress: number
}

// 1. add file to state
// 2. run query for signed url (include client-side generated id?)
// 3. upload files to s3
// 4. run callback post-upload with file id
// 5. show upload complete

// opt.
// . 2 files exist, add one new one

export function FormUpload(props: FormUploadProps) {
  const {
    field: { ref, ...inputProps }
  } = useController({
    name: props.name,
    rules: { required: props.required },
    defaultValue: []
  })

  // const ctx = useFormContext()

  const onDrop = async (acceptedFiles: File[]) => {
    const currentFiles = inputProps.value
    const newFiles = acceptedFiles.map((file) => ({
      id: nanoid(),
      file: file,
      fileName: file.name,
      status: 'IDLE'
    }))

    // ctx.setValue('files', [...currentFiles, ...newFiles])
    inputProps.onChange([...currentFiles, ...newFiles])

    // TODO: remove next line
    // props.onChange([...currentFiles, ...newFiles])

    // removed from here
  }

  // should destructure all props of FormUploadProps
  const {
    id,
    name,
    label,
    onUploadComplete,
    onDeleteMutation,
    presignedUpload
  } = props

  const { getRootProps, getInputProps, inputRef } = useDropzone({
    onDrop,
    ...inputProps,
    multiple: !!props.multiple
  })

  return (
    <div>
      {/* TODO: FIX ERROR */}
      <FormLabel name={name} label={label} error={false} />
      <FileList
        name={props.name}
        value={inputProps.value}
        onChange={inputProps.onChange}
        uploadInputRef={inputRef}
        // imageUploadUrl={async () => await presignedUpload(inputProps.value).then(data => data.url)}
        presignedUpload={presignedUpload}
        onDeleteMutation={onDeleteMutation}
        onUploadComplete={onUploadComplete}
        allowMultipleFiles={!!props.multiple}
      />
      <UploadInput
        id={id || 'todo: fix me'}
        name={name}
        hidden={!!inputProps.value.length}
        getRootProps={getRootProps}
        getInputProps={getInputProps}
      />
    </div>
  )
}
