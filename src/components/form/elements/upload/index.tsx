import * as React from 'react'
import { useDropzone } from 'react-dropzone'
import { Controller } from 'react-hook-form'
//
import { FileList } from './items/list'

import { UploadInput } from './input'
import { FormLabel } from '../misc/label'
// import contentDisposition from 'content-disposition'

type FormUploadProps = FormUploadBasics &
  Partial<Omit<HTMLInputElement, 'value'>>
export type ImageUploadUrl = (file: File) => Promise<string> //| string

interface FormUploadBasics {
  name: string
  label: string
  onDeleteMutation: () => void
  // ideally return fileId?
  imageUploadUrl: ImageUploadUrl
  onUploadComplete: (file: File) => Promise<any>
}

export interface FileContextData {
  id: string
  file?: File
  fileName: string
  status: 'IDLE' | 'PENDING_REMOVAL'
  progress: number
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

function FormUploadComponent(
  props: FormUploadProps & {
    value: FileContextData[]
    onChange: (...event: any[]) => void
  }
) {
  const onDrop = React.useCallback(
    async (acceptedFiles) => {
      const currentFiles = props.value
      const newFiles = acceptedFiles.map((file: File) => ({
        id: Math.random().toString(), // TODO: update,
        file: file,
        fileName: file.name,
        status: 'IDLE'
      }))

      props.onChange([...currentFiles, ...newFiles])

      // const uploadUrls = await Promise.all(
      //   acceptedFiles.map(async (file: any) => {
      //     const url = await props.imageUploadUrl(file)
      //     // upload to S3
      //     if (file) {
      //       // dispatch({ type: 'START_UPLOAD' })

      //       const fileForm = new FormData()
      //       fileForm.append('file', file)

      //       const response = await fetch({
      //         url: url,
      //         formData: async () => fileForm,
      //         onUploadProgress: (progressEvent: number) => {
      //           // dispatch({
      //           //   type: 'INCREASE_PROGRESS',
      //           //   payload: (progressEvent.loaded / progressEvent.total) * 100
      //           // })
      //         },
      //         headers: {
      //           // @ts-ignore
      //           'Content-Type': 'multipart/form-data',
      //           // @ts-ignore
      //           'Content-Disposition': contentDisposition(file.name)
      //         }
      //       })
      //         .then(() => {
      //           // dispatch({ type: 'UPLOAD_COMPLETE' })
      //           onUploadComplete(file)
      //         })
      //         .catch((err) => {
      //           // dispatch({ type: 'ERROR', payload: err })
      //         })

      //       return response
      //     }
      //   })
      // )
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
    imageUploadUrl,
    ...inputProps
  } = props

  const { getRootProps, getInputProps, inputRef } = useDropzone({
    onDrop,
    ...inputProps,
    multiple: !!inputProps.multiple
  })

  return (
    <div>
      {/* TODO: FIX ERROR */}
      <FormLabel name={name} label={label} error={false} />
      <FileList
        name={name}
        value={value}
        onChange={onChange}
        uploadInputRef={inputRef}
        imageUploadUrl={imageUploadUrl}
        onDeleteMutation={onDeleteMutation}
        onUploadComplete={onUploadComplete}
        allowMultipleFiles={!!props.multiple}
      />
      <UploadInput
        id={id || 'todo: fix me'}
        name={name}
        hidden={!!props.value.length}
        getRootProps={getRootProps}
        getInputProps={getInputProps}
      />
    </div>
  )
}
