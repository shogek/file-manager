import {
  IpcCreateDirectoryArgs,
  IpcCreateDirectoryResult,
  IpcDeleteDirectoryArgs,
  IpcDeleteDirectoryResult,
  IpcReadDirectoryArgs,
  IpcReadDirectoryResult,
} from "../../shared/types";

export interface IIPcService {
  /** Create folder with given name at specified location */
  createDirectory(
    args: IpcCreateDirectoryArgs
  ): Promise<IpcCreateDirectoryResult>;

  /** Returns the contents of a folder */
  readDirectory(args: IpcReadDirectoryArgs): Promise<IpcReadDirectoryResult>;

  /** Delete directory or file */
  deleteDirent(args: IpcDeleteDirectoryArgs): Promise<IpcDeleteDirectoryResult>;
}
