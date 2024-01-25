import { useState } from 'react'
import { OsDirent } from '../../../shared/types'
import { DirentItem } from '../dirent-item/dirent-item.component'
import { useCurrentFolderStore } from '../../general/stores/current-directory.store'
import { useContextMenu } from '../../general/hooks/useContextMenu'
import { useElectronApi } from '../../general/hooks/useElectronApi'
import { logService } from '../../general/services/log.service'
import './dirent-list.scss'

type DirentListProps = {
   onEntryDoubleClick: (dirent: OsDirent) => void
}

export function DirentList({ onEntryDoubleClick }: DirentListProps) {
   const electronApi = useElectronApi()
   const contextMenu = useContextMenu()
   const currentFolder = useCurrentFolderStore((x) => x.currentFolder)

   const [selected, setSelected] = useState<OsDirent | null>(null)

   if (!currentFolder?.dirents.length) {
      return null
   }

   const handleDirentClick = (dirent: OsDirent) => {
      if (dirent.name === selected?.name) {
         setSelected(null)
         onEntryDoubleClick(dirent)
         return
      }

      setSelected(dirent)
   }

   const handleDelete = (dirent: OsDirent) => {
      setSelected(null)
      electronApi.deleteDirent(dirent.name, dirent.path)
   }

   const handleDirentContextMenu = (e: React.MouseEvent, dirent: OsDirent) => {
      const items = [
         {
            label: '[TODO] Rename',
            onClick: () => logService.error('Not implemented!'),
         },
         {
            label: 'Delete',
            onClick: () => handleDelete(dirent),
         },
      ]

      contextMenu.show(e, items)
   }

   const handleClickCreateFolder = async () => {
      electronApi.createFolder('my-new-folder-5', `${currentFolder.path}/${currentFolder.name}`)
   }

   const handleBackgroundContextMenu = (e: React.MouseEvent) => {
      const items = [
         {
            label: 'New folder',
            onClick: handleClickCreateFolder,
         },
      ]

      contextMenu.show(e, items)
   }

   return (
      <ul className="dirent-list" onContextMenu={(e) => handleBackgroundContextMenu(e)}>
         {currentFolder.dirents.map((dirent) => (
            <li
               key={dirent.path + dirent.name}
               onClick={() => handleDirentClick(dirent)}
               onContextMenu={(e) => handleDirentContextMenu(e, dirent)}
            >
               <DirentItem dirent={dirent} isSelected={dirent.name === selected?.name} />
            </li>
         ))}
      </ul>
   )
}
