import { shell } from 'electron'
import { IShellService } from '../types/shell.types'

class ShellService implements IShellService {
   async openFile(path: string): Promise<void> {
      const error = await shell.openPath(path)

      if (error) {
         const title = `An error ocurred while opening (${path})!`
         throw { title, reason: error }
      }
   }
}

export const shellService: IShellService = new ShellService()
