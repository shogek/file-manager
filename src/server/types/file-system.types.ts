import { Dirent } from 'node:original-fs'
import { OsMetadata } from '../../shared/types'

export interface IFileSystemService {
   /** Example: `"C:\Users\john.doe/Downloads/"` */
   createFolder(path: string): Promise<void>

   /** Example: `"C:\Users\john.doe/Downloads/"` */
   readFolder(path: string): Promise<Dirent[]>

   /** Example: `"C:\Users\john.doe/Downloads/"` */
   readMetadata(path: string): Promise<OsMetadata>

   /** Example: `"C:\Users\john.doe/Downloads/test.png"` */
   deleteDirent(path: string): Promise<void>
}
