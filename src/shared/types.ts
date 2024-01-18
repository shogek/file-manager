export type Result<T> = ResultSuccess<T> | ResultFail;

type ResultSuccess<T> = {
  isSuccess: true;
  data: T;
};

type ResultFail = {
  isSuccess: false;
  error: string;
};

export type IpcCreateDirectoryArgs = {
  /** Example: `"C:\Users\john.doe/Downloads/"` */
  path: string;
  /** Example: `"Movies"` */
  name: string;
};
export type IpcCreateDirectoryResult = Result<null>;

export type IpcReadDirectoryArgs = {
  /** Example: `"C:\Users\john.doe/Downloads/"`, if `null` - a default value will be used */
  path: string | null;
};
export type IpcReadDirectoryResult = Result<OsFileWithMetadata[]>;

export type IpcDeleteDirectoryArgs = {
  /** Example: `"C:\Users\john.doe/Downloads/"` */
  path: string;
};
export type IpcDeleteDirectoryResult = Result<null>;

export type OsFile = {
  /** Example: `"my-image.png"` */
  name: string;
  /** Example: `"C:\\Users\\john.doe/Downloads"` */
  path: string;
  isDirectory: boolean;
};

export type OsFileWithMetadata = OsFile & { metadata: OsFileMetadata };

type OsFileMetadata = {
  /** Example: `2024-01-16T09:46:45.697Z` */
  dateCreated: string;
  /** Example: `2024-01-16T09:46:45.697Z` */
  dateAccessed: string;
  /** Example: `2024-01-16T09:46:45.697Z` */
  dateModified: string;
};
