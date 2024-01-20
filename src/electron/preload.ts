// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { contextBridge, ipcRenderer } = require('electron/renderer')
import {
   IpcCreateFolderArgs,
   IpcCreateFolderResult,
   IpcDeleteDirentArgs,
   IpcDeleteDirentResult,
   IpcOpenFileArgs,
   IpcOpenFileResult,
   IpcReadWorkingFolderArgs,
   IpcReadWorkingFolderResult,
} from '../shared/types'

export interface IElectronAPI {
   createFolder: (args: IpcCreateFolderArgs) => Promise<IpcCreateFolderResult>

   readWorkingFolder: (args: IpcReadWorkingFolderArgs) => Promise<IpcReadWorkingFolderResult>

   deleteDirent: (args: IpcDeleteDirentArgs) => Promise<IpcDeleteDirentResult>

   openFile: (args: IpcOpenFileArgs) => Promise<IpcOpenFileResult>
}

contextBridge.exposeInMainWorld('electronAPI', {
   createFolder: (args: IpcCreateFolderArgs): IpcCreateFolderResult =>
      ipcRenderer.invoke('app-create-folder', args) as unknown as IpcCreateFolderResult,

   readWorkingFolder: (args: IpcDeleteDirentArgs): IpcReadWorkingFolderResult =>
      ipcRenderer.invoke('app-read-working-folder', args) as unknown as IpcReadWorkingFolderResult,

   deleteDirent: (args: IpcDeleteDirentArgs): IpcDeleteDirentResult =>
      ipcRenderer.invoke('app-delete-dirent', args) as unknown as IpcDeleteDirentResult,

   openFile: (args: IpcOpenFileArgs): IpcDeleteDirentResult =>
      ipcRenderer.invoke('app-open-file', args) as unknown as IpcOpenFileResult,
})

declare global {
   interface Window {
      electronAPI: IElectronAPI
   }
}
