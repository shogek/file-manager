export interface IShellService {
   /**
    * Example: `"C:\Users\john.doe/Downloads/test.png"`
    * Read more: https://www.electronjs.org/docs/latest/api/shell#shellopenpathpath
    */
   openFile(path: string): Promise<void>
}
