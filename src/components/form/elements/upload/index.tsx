import * as React from 'react'
import { useDropzone } from 'react-dropzone'
import { useController } from 'react-hook-form'
// import { Controller, useController, useFormContext } from 'react-hook-form'
import { nanoid } from 'nanoid'
//
import { FileList } from './files/file-list'

import { UploadInput } from './input'
import { FormLabel } from '../misc/label'
import { FileStateObject, PresignedUpload } from './types'
// import contentDisposition from 'content-disposition'

type FormUploadProps = FormUploadBasics &
  Partial<Omit<HTMLInputElement, 'value'>>

interface FormUploadBasics {
  name: string
  label: string
  required: boolean
  onDeleteMutation: () => void
  presignedUpload: PresignedUpload
  onUploadComplete: (key: string) => Promise<any>
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
    defaultValue: [
      //   {
      //   file: undefined,
      //   fileName: 'string',
      //   remoteFileKey: 'f2o4',
      //   status: 'UPLOAD_COMPLETE',
      //   progress: 100
      // }
    ]
  })

  // const ctx = useFormContext()

  const onDrop = async (acceptedFiles: File[]) => {
    const currentFiles = inputProps.value
    const mapFilesToState: FileStateObject[] = acceptedFiles.map((file) => ({
      id: nanoid(),
      file: file,
      fileName: file.name,
      status: 'UPLOADING',
      progress: 0
    }))
    // ctx.setValue('files', [...currentFiles, ...mapFilesToState])
    inputProps.onChange([...currentFiles, ...mapFilesToState])
    // TODO: remove next line
    // props.onChange([...currentFiles, ...mapFilesToState])
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
// export type ImageUploadUrl = (file: File) => Promise<string> //| string
