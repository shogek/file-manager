import {
  IpcCreateDirectoryArgs,
  IpcCreateDirectoryResult,
  IpcDeleteDirectoryArgs,
  IpcDeleteDirectoryResult,
  IpcReadDirectoryArgs,
  IpcReadDirectoryResult,
} from "../../shared/types";
import { IIPcService } from "../types/ipc.types";
import { fileSystemService } from "./file-system.service";

class IpcService implements IIPcService {
  async createDirectory({
    path,
    name,
  }: IpcCreateDirectoryArgs): Promise<IpcCreateDirectoryResult> {
    try {
      await fileSystemService.createDirectory(path + "/" + name);

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

  async readDirectory({
    path,
  }: IpcReadDirectoryArgs): Promise<IpcReadDirectoryResult> {
    path ??= `${process.env["USERPROFILE"]}/Downloads`;

    try {
      const directory = await fileSystemService.readDirectory(path);

      return {
        isSuccess: true,
        data: directory,
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
  }: IpcDeleteDirectoryArgs): Promise<IpcDeleteDirectoryResult> {
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
}

export const ipcService = new IpcService();
