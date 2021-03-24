import axios from 'axios'
import * as React from 'react'
import contentDisposition from 'content-disposition'
import { PresignedUpload } from '.'

interface UploadReducerState {
  error: any
  loading: boolean
  progress: number
}

interface UploadFileAction {
  type: 'START_UPLOAD' | 'UPLOAD_COMPLETE' | 'INCREASE_PROGRESS' | 'ERROR'
  payload?: any
}

export type OnUploadCompleteFunction = (fileId: string) => any

function uploadReducer(
  state: UploadReducerState,
  action: UploadFileAction
): UploadReducerState {
  switch (action.type) {
    case 'START_UPLOAD': {
      return Object.assign({}, state, { loading: true })
    }
    case 'UPLOAD_COMPLETE': {
      return Object.assign({}, state, { loading: false, progress: 100 })
    }
    case 'INCREASE_PROGRESS': {
      return Object.assign({}, state, { progress: action.payload })
    }
    case 'ERROR': {
      return Object.assign({}, state, {
        progress: 0,
        loading: false,
        error: action.payload
      })
    }
    default: {
      throw new Error('unhandled action in uploadReducer')
    }
  }
}

// TODO: check args
export function useUploadReducer(
  file: File | null,
  // variable name in rhf
  variableName: string,
  // id in database
  awsFileKey: string,
  // function to update a record with newly uploaded s3 id
  onUploadComplete: OnUploadCompleteFunction,
  // imageUploadUrl: ImageUploadUrl
  presignedUpload: PresignedUpload
): UploadReducerState {
  const [state, dispatch] = React.useReducer(uploadReducer, {
    loading: false,
    progress: 0,
    error: undefined
  })

  React.useEffect(() => {
    async function uploadFileToS3() {
      if (file) {
        dispatch({ type: 'START_UPLOAD' })

        // TODO: ERROR handling here...
        // const res = await getSignedUrl(file, awsFileKey)
        const res = await presignedUpload(file)

        const fileForm = new FormData()

        res.data.presignedUpload.fields.forEach(({ key, value }) =>
          fileForm.append(key, value)
        )

        fileForm.append('file', file)

        console.log({ res })

        const response = await axios
          .post(res.data.presignedUpload.url, fileForm, {
            onUploadProgress: (progressEvent) => {
              dispatch({
                type: 'INCREASE_PROGRESS',
                payload: (progressEvent.loaded / progressEvent.total) * 100
              })
            },
            headers: {
              'Content-Type': 'multipart/form-data',
              'Content-Disposition': contentDisposition(file.name)
            }
          })
          .then(() => {
            dispatch({ type: 'UPLOAD_COMPLETE' })
            onUploadComplete(awsFileKey)
          })
          .catch((err) => dispatch({ type: 'ERROR', payload: err }))

        return response
      }
    }

    if (file) {
      uploadFileToS3()
    }
  }, [file, variableName, awsFileKey])

  return state
}
// TODO: check args
export function useUploadReducer2(
  file: File | null,
  // variable name in rhf
  variableName: string,
  // id in database
  remoteFileId: string,
  // function to update a record with newly uploaded s3 id
  onUploadComplete: OnUploadCompleteFunction
): UploadReducerState {
  const [state, dispatch] = React.useReducer(uploadReducer, {
    loading: false,
    progress: 0,
    error: undefined
  })

  React.useEffect(() => {
    async function uploadFileToS3() {
      if (file) {
        dispatch({ type: 'START_UPLOAD' })

        // TODO: ERROR handling here...
        const res = { signedUploadUrl: '' } //await getSignedUrl(file, remoteFileId)

        const fileForm = new FormData()
        fileForm.append('file', file)

        const response = await axios
          .put(res.signedUploadUrl, fileForm, {
            onUploadProgress: (progressEvent) => {
              dispatch({
                type: 'INCREASE_PROGRESS',
                payload: (progressEvent.loaded / progressEvent.total) * 100
              })
            },
            // TOOD: FIX TYPE in s3
            headers: {
              'Content-Type': 'multipart/form-data',
              'Content-Disposition': contentDisposition(file.name)
            }
          })
          .then(() => {
            dispatch({ type: 'UPLOAD_COMPLETE' })
            onUploadComplete(remoteFileId)
          })
          .catch((err) => dispatch({ type: 'ERROR', payload: err }))

        return response
      }
    }

    if (file) {
      uploadFileToS3()
    }
  }, [file, variableName, remoteFileId])

  return state
}
