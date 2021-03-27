export const k = 1
// // TODO: check args
// export function useUploadReducer2(
//     file: File | null,
//     // variable name in rhf
//     variableName: string,
//     // id in database
//     remoteFileId: string,
//     // function to update a record with newly uploaded s3 id
//     onUploadComplete: OnUploadCompleteFunction
//   ): UploadReducerState {
//     const [state, dispatch] = React.useReducer(uploadReducer, {
//       loading: false,
//       progress: 0,
//       error: undefined
//     })

//     React.useEffect(() => {
//       async function uploadFileToS3() {
//         if (file) {
//           dispatch({ type: 'START_UPLOAD' })

//           // TODO: ERROR handling here...
//           const res = { signedUploadUrl: '' } //await getSignedUrl(file, remoteFileId)

//           const fileForm = new FormData()
//           fileForm.append('file', file)

//           const response = await axios
//             .put(res.signedUploadUrl, fileForm, {
//               onUploadProgress: (progressEvent) => {
//                 dispatch({
//                   type: 'INCREASE_PROGRESS',
//                   payload: (progressEvent.loaded / progressEvent.total) * 100
//                 })
//               },
//               // TOOD: FIX TYPE in s3
//               headers: {
//                 'Content-Type': 'multipart/form-data',
//                 'Content-Disposition': contentDisposition(file.name)
//               }
//             })
//             .then(() => {
//               dispatch({ type: 'UPLOAD_COMPLETE' })
//               onUploadComplete(remoteFileId)
//             })
//             .catch((err) => dispatch({ type: 'ERROR', payload: err }))

//           return response
//         }
//       }

//       if (file) {
//         uploadFileToS3()
//       }
//     }, [file, variableName, remoteFileId])

//     return state
//   }
