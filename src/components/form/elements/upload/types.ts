export interface FileStateObject extends RemoteFile {
    file?: File
    status: 'COMPLETE' | 'PENDING_REMOVAL' | 'UPLOADING' | 'ERROR'
    progress: number
}

interface RemoteFile {
    id: string
    fileName: string
}

export type PresignedUpload = (
    file: FileStateObject
) => Promise<{
    data: {
        presignedUpload: {
            url: string
            fileId: string
            fields: Array<{ [key: string]: string }>
        }
    }
}>

export type OnUploadCompleteFunction = (fileId: string) => any