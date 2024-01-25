import { OsDirent } from '../../../shared/types'
import { isOsFolder } from '../../../shared/type.helpers'
import { useEffectOnce } from '../../general/hooks/useEffectOnce'
import { DirentList } from '../dirent-list/dirent-list.component'
import { ContextMenu } from '../context-menu/context-menu.component'
import { useElectronApi } from '../../general/hooks/useElectronApi'
import { AddressBar } from '../address-bar/address-bar.component'
import '../../general/styles/reset.css'
import './root.scss'

export function Root() {
   const electronApi = useElectronApi()

   useEffectOnce(() => {
      electronApi.loadWorkingFolder(null)
   })

   const handleDoubleClick = (dirent: OsDirent) => {
      const fullPath = `${dirent.path}/${dirent.name}`

      if (!isOsFolder(dirent)) {
         electronApi.openFile(fullPath)
         return
      }

      electronApi.loadWorkingFolder(fullPath)
   }

   return (
      <div className="root">
         <AddressBar />

         <DirentList onEntryDoubleClick={handleDoubleClick} />

         <ContextMenu />
      </div>
   )
}
