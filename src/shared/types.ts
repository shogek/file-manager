import { Dirent } from "node:original-fs";

export type Result<T> = ResultSuccess<T> | ResultFail;

type ResultSuccess<T> = {
  isSuccess: true;
  data: T;
};

type ResultFail = {
  isSuccess: false;
  error: string;
};

export type IpcCreateFolderArgs = {
  /** Example: `"C:\Users\john.doe/Downloads/"` */
  path: string;
  /** Example: `"Movies"` */
  name: string;
};
export type IpcCreateFolderResult = Result<null>;

export type IpcDeleteDirentArgs = {
  /** Example: `"C:\Users\john.doe/Downloads/"` */
  path: string;
};
export type IpcDeleteDirentResult = Result<null>;

export type IpcReadWorkingFolderArgs = {
  /** Example: `"C:\Users\john.doe/Downloads/"` */
  path: string | null;
};
export type IpcReadWorkingFolderResult = Result<WorkingFolder>;

export type OsDirentMetadata = {
  /** Example: `2024-01-16T09:46:45.697Z` */
  dateCreated: string;
  /** Example: `2024-01-16T09:46:45.697Z` */
  dateAccessed: string;
  /** Example: `2024-01-16T09:46:45.697Z` */
  dateModified: string;
  sizeInBytes: number;
};

export type OsDirent = OsFile | OsFolder;

export type OsFile = {
  /** Example: `"my-image.png"` */
  name: string;
  /** Example: `"C:\\Users\\john.doe/Downloads"` */
  path: string;
  metadata: OsDirentMetadata;
};

export type OsFolder = {
  /** Example: `"Downloads"` */
  name: string;
  /** Example: `"C:\\Users\\john.doe"` */
  path: string;
  direntCount: number;
  metadata: OsDirentMetadata;
};

export type OsMetadata = {
  /** Example: `2024-01-16T09:46:45.697Z` */
  dateCreated: string;
  /** Example: `2024-01-16T09:46:45.697Z` */
  dateAccessed: string;
  /** Example: `2024-01-16T09:46:45.697Z` */
  dateModified: string;
  sizeInBytes: number;
};

export type WorkingFolder = {
  name: string;
  path: string;
  dirents: OsDirent[];
};
