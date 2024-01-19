import {
  IpcCreateFolderArgs,
  IpcCreateFolderResult,
  IpcDeleteDirentArgs,
  IpcDeleteDirentResult,
  IpcOpenFileArgs,
  IpcOpenFileResult,
  IpcReadWorkingFolderArgs,
  IpcReadWorkingFolderResult,
  OsFile,
  OsFolder,
  WorkingFolder,
} from "../../shared/types";
import { IIPcService } from "../types/ipc.types";
import { fileSystemService } from "./file-system.service";

class IpcService implements IIPcService {
  async readWorkingFolder({
    path,
  }: IpcReadWorkingFolderArgs): Promise<IpcReadWorkingFolderResult> {
    try {
      path ??= `${process.env["USERPROFILE"]}/Downloads`;
      const workingFolder = await this.readWorkingFolderInternal(path);

      return {
        isSuccess: true,
        data: workingFolder,
      };
    } catch (e: unknown) {
      return {
        isSuccess: false,
        error: JSON.stringify(e),
      };
    }
  }

  async createFolder({
    path,
    name,
  }: IpcCreateFolderArgs): Promise<IpcCreateFolderResult> {
    try {
      await fileSystemService.createFolder(path + "/" + name);

      return {
        isSuccess: true,
        data: null,
      };
    } catch (e: unknown) {
      return {
        isSuccess: false,
        error: JSON.stringify(e),
      };
    }
  }

  async deleteDirent({
    path,
  }: IpcDeleteDirentArgs): Promise<IpcDeleteDirentResult> {
    try {
      await fileSystemService.deleteDirent(path);

      return {
        isSuccess: true,
        data: null,
      };
    } catch (e: unknown) {
      return {
        isSuccess: false,
        error: JSON.stringify(e),
      };
    }
  }

  async openFile({ path }: IpcOpenFileArgs): Promise<IpcOpenFileResult> {
    try {
      await fileSystemService.openFile(path);

      return {
        isSuccess: true,
        data: null,
      };
    } catch (e: unknown) {
      return {
        isSuccess: false,
        error: JSON.stringify(e),
      };
    }
  }

  private async readWorkingFolderInternal(
    path: string
  ): Promise<WorkingFolder> {
    const dirents = await fileSystemService.readFolder(path);

    const osDirents = dirents.map(
      async (dirent): Promise<OsFile | OsFolder> => {
        const path = `${dirent.path}/${dirent.name}`;

        const metadataPromise = fileSystemService.readMetadata(path);
        const childDirentsPromise = dirent.isDirectory()
          ? fileSystemService.readFolder(path)
          : null;

        const [metadata, childDirents] = await Promise.all([
          metadataPromise,
          childDirentsPromise,
        ]);

        if (dirent.isDirectory()) {
          const folder: OsFolder = {
            name: dirent.name,
            path: dirent.path,
            metadata,
            direntCount: childDirents?.length ?? 0,
          };
          return folder;
        }

        const file: OsFile = {
          name: dirent.name,
          path: dirent.path,
          metadata,
        };
        return file;
      }
    );

    const folderItems = await Promise.all(osDirents);

    return {
      name: path.split("/").slice(-1)[0],
      path: path.split("/").slice(0, -1).join("/"),
      dirents: folderItems,
    };
  }
}

export const ipcService = new IpcService();
