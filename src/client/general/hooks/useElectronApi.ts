import { logService } from '../services/log.service'
import { useCurrentFolderStore } from '../stores/current-folder.store'

type UseElectronApiData = {
   loadWorkingFolder: (path: string | null) => Promise<void>
   createFolder: (folderName: string, path: string) => Promise<void>
   openFile: (path: string) => Promise<void>
   deleteDirent: (direntName: string, path: string) => Promise<void>
}

export function useElectronApi(): UseElectronApiData {
   const setCurrentFolder = useCurrentFolderStore((x) => x.setCurrentFolder)

   async function loadWorkingFolder(path: string | null) {
      const result = await window.electronAPI.readWorkingFolder({ path })
      if (!result.isSuccess) {
         logService.error(result.error)
         return
      }

      setCurrentFolder(result.data)
   }

   async function createFolder(folderName: string, path: string) {
      const result = await window.electronAPI.createFolder({ name: folderName, path })

      if (!result.isSuccess) {
         logService.error(result.error)
         return
      }

      await loadWorkingFolder(path)
   }

   async function openFile(path: string) {
      const result = await window.electronAPI.openFile({ path })

      if (!result.isSuccess) {
         logService.error(result.error)
         return
      }
   }

   async function deleteDirent(direntName: string, path: string) {
      const result = await window.electronAPI.deleteDirent({ path: `${path}/${direntName}` })

      if (!result.isSuccess) {
         logService.error(result.error)
         return
      }

      await loadWorkingFolder(path)
   }

   return {
      createFolder,
      loadWorkingFolder,
      openFile,
      deleteDirent,
   }
}
