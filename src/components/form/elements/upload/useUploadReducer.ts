import axios from 'axios'
import * as React from 'react'
import contentDisposition from 'content-disposition'

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

async function getSignedUrl(file: File, remoteFileId: string) {
  const res = await new Promise<any>((resolve) =>
    setTimeout(
      () =>
        resolve({
          data: {
            fileName: file.name,
            remoteFileId: remoteFileId,
            // TODO: update this url
            signedUploadUrl: `https://quicktestbucket1234.s3.us-east-1.amazonaws.com/${remoteFileId}/${file.name}`
          }
        }),
      500
    )
  )

  return res.data
}

// TODO: check args
export function useUploadReducer(
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
        const res = await getSignedUrl(file, remoteFileId)

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
