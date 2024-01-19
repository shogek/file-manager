import fs from "fs/promises";
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
}

export const fileSystemService: IFileSystemService = new FileSystemService();
