import { OsFileWithMetadata } from "../../shared/types";

export interface IFileSystemService {
  /** Example: `"C:\Users\john.doe/Downloads/"` */
  createDirectory(path: string): Promise<void>;

  /** Example: `"C:\Users\john.doe/Downloads/"` */
  readDirectory(path: string): Promise<OsFileWithMetadata[]>;

  /** Example: `"C:\Users\john.doe/Downloads/"` */
  deleteDirent(path: string): Promise<void>;
}
