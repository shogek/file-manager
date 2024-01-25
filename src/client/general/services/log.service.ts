import { ILogService } from '../types/log.types'

class LogService implements ILogService {
   error(message: string): void {
      alert(message)
      console.error(message)
   }
}

export const logService: ILogService = new LogService()
