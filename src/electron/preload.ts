// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { contextBridge, ipcRenderer } = require("electron/renderer");
import {
  IpcCreateDirectoryArgs,
  IpcCreateDirectoryResult,
  IpcDeleteDirectoryArgs,
  IpcDeleteDirectoryResult,
  IpcReadDirectoryArgs,
  IpcReadDirectoryResult,
} from "../shared/types";

export interface IElectronAPI {
  createDirectory: (
    args: IpcCreateDirectoryArgs
  ) => Promise<IpcCreateDirectoryResult>;

  readDirectory: (
    args: IpcReadDirectoryArgs
  ) => Promise<IpcReadDirectoryResult>;

  deleteDirent: (
    args: IpcDeleteDirectoryArgs
  ) => Promise<IpcDeleteDirectoryResult>;
}

contextBridge.exposeInMainWorld("electronAPI", {
  createDirectory: (args: IpcCreateDirectoryArgs): IpcCreateDirectoryResult =>
    ipcRenderer.invoke(
      "app-create-directory",
      args
    ) as unknown as IpcCreateDirectoryResult,

  readDirectory: (args: IpcReadDirectoryArgs): IpcReadDirectoryResult =>
    ipcRenderer.invoke(
      "app-read-directory",
      args
    ) as unknown as IpcReadDirectoryResult,

  deleteDirent: (args: IpcDeleteDirectoryArgs): IpcDeleteDirectoryResult =>
    ipcRenderer.invoke(
      "app-delete-dirent",
      args
    ) as unknown as IpcDeleteDirectoryResult,
});

declare global {
  interface Window {
    electronAPI: IElectronAPI;
  }
}
