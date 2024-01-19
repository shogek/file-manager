import { OsDirent, OsFolder } from "./types";

export function isOsFolder(dirent: OsDirent): dirent is OsFolder {
  return "direntCount" in dirent;
}
