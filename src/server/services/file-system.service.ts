import fs from "fs/promises";
import { OsFile, OsFileWithMetadata } from "../../shared/types";
import { IFileSystemService } from "../types/file-system.types";

class FileSystemService implements IFileSystemService {
  createDirectory(path: string): Promise<void> {
    return fs.mkdir(path);
  }

  async readDirectory(path: string): Promise<OsFileWithMetadata[]> {
    const rawFiles = await fs.readdir(path, {
      withFileTypes: true,
    });

    const osFiles = rawFiles.map(
      (rawFile): OsFile => ({
        name: rawFile.name,
        path: rawFile.path,
        isDirectory: rawFile.isDirectory(),
      })
    );

    const metadataPromises = osFiles.map(
      async (osFile): Promise<OsFileWithMetadata> => {
        const metadata = await fs.stat(osFile.path + "/" + osFile.name);

        return {
          ...osFile,
          metadata: {
            dateCreated: metadata.birthtime.toISOString(),
            dateAccessed: metadata.atime.toISOString(),
            dateModified: metadata.mtime.toISOString(),
          },
        };
      }
    );

    return Promise.all(metadataPromises);
  }

  deleteDirent(path: string): Promise<void> {
    return fs.rm(path, { recursive: true });
  }
}

export const fileSystemService = new FileSystemService();
