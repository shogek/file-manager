import { logService } from '../../general/services/log.service'
import { useElectronApi } from '../../general/hooks/useElectronApi'
import { useCurrentFolderStore } from '../../general/stores/current-folder.store'
import { IconArrow } from '../icons/icon-arrow.component'
import './address-bar.scss'

export function AddressBar() {
   const electronApi = useElectronApi()
   const currentFolder = useCurrentFolderStore((x) => x.currentFolder)

   const handleClickBack = async () => {
      if (!currentFolder) {
         return
      }

      await electronApi.loadWorkingFolder(currentFolder.path)
   }

   const handleClickForward = () => {
      logService.error('Not implemented')
   }

   if (!currentFolder) {
      return null
   }

   // TODO: Perform a navigation if the address value is changed
   // TODO: It displays a leading slash if we're in the USERPROFILE folder
   return (
      <div className="address-bar">
         <button type="button" className="address-bar__arrow address-bar__arrow--backward" onClick={handleClickBack}>
            <IconArrow width={20} height={20} />
         </button>

         <button type="button" className="address-bar__arrow address-bar__arrow--forward" onClick={handleClickForward}>
            <IconArrow width={20} height={20} />
         </button>

         <input type="text" className="address-bar__input" value={`${currentFolder.path}/${currentFolder.name}`} />
      </div>
   )
}
