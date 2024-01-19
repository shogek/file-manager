import fs from "fs/promises";
import { shell } from "electron";
import { execFile } from "node:child_process";
import { Dirent } from "node:original-fs";
import { OsMetadata } from "../../shared/types";
import { IFileSystemService } from "../types/file-system.types";

class FileSystemService implements IFileSystemService {
  createFolder(path: string): Promise<void> {
    return fs.mkdir(path);
  }

  readFolder(path: string): Promise<Dirent[]> {
    return fs.readdir(path, { withFileTypes: true });
  }

  async readMetadata(path: string): Promise<OsMetadata> {
    const stats = await fs.stat(path);

    return {
      dateCreated: stats.birthtime.toISOString(),
      dateAccessed: stats.atime.toISOString(),
      dateModified: stats.mtime.toISOString(),
      sizeInBytes: stats.size,
    };
  }

  deleteDirent(path: string): Promise<void> {
    return fs.rm(path, { recursive: true });
  }

  async openFile(path: string): Promise<any> {
    const error = await shell.openPath(path);

    if (error) {
      const title = `An error ocurred while opening (${path})!`;
      throw { title, reason: error };
    }

    return;
  }
}

export const fileSystemService: IFileSystemService = new FileSystemService();
