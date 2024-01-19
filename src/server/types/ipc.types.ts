import {
  IpcCreateFolderArgs,
  IpcCreateFolderResult,
  IpcDeleteDirentArgs,
  IpcDeleteDirentResult,
  IpcReadWorkingFolderArgs,
  IpcReadWorkingFolderResult,
} from "../../shared/types";

export interface IIPcService {
  /** Create folder with given name at specified location */
  createFolder(args: IpcCreateFolderArgs): Promise<IpcCreateFolderResult>;

  /** Returns the contents of a folder */
  readWorkingFolder(
    args: IpcReadWorkingFolderArgs
  ): Promise<IpcReadWorkingFolderResult>;

  /** Delete directory or file */
  deleteDirent(args: IpcDeleteDirentArgs): Promise<IpcDeleteDirentResult>;
}
