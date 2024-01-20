import { useEffect, useRef, useState } from 'react'
import { IpcCreateFolderResult, IpcReadWorkingFolderResult, OsDirent } from '../../../shared/types'
import { isOsFolder } from '../../../shared/type.helpers'
import { useEffectOnce } from '../../general/hooks/useEffectOnce'
import { DirentList } from '../dirent-list/dirent-list.component'
import { useCurrentFolderStore } from '../../general/stores/current-directory.store'
import '../../general/styles/reset.css'
import './root.scss'

type ContextMenu = {
   xCoord: number
   yCoord: number
   options: string[]
}

export function Root() {
   const currentFolder = useCurrentFolderStore((x) => x.currentFolder)
   const setCurrentFolder = useCurrentFolderStore((x) => x.setCurrentFolder)

   const contextMenuRef = useRef<HTMLUListElement | null>(null)
   const [contextMenu, setContextMenu] = useState<ContextMenu | null>(null)

   // const handleMouseDown = (e: MouseEvent) => {
   //   // TODO: This works, but after the context menu closes, the event listener is still active and firing events
   //   console.log(" ");
   //   console.log("handleMouseDown | e", e);
   //   console.log("handleMouseDown | contextMenu", contextMenu);
   //   console.log("handleMouseDown | contextMenuRef", contextMenuRef);
   //   console.log("handleMouseDown | e.target", e.target);
   //   if (!contextMenu || !contextMenuRef.current) {
   //     return;
   //   }

   //   if (!contextMenuRef.current.contains(e.target as Node)) {
   //     setContextMenu(null);
   //   }
   // };

   // useEffect(() => {
   //   document.addEventListener("mousedown", handleMouseDown);

   //   return () => document.removeEventListener("mousedown", handleMouseDown);
   // }, [contextMenu]);

   const onDirectoryRead = (result: IpcReadWorkingFolderResult) => {
      if (!result.isSuccess) {
         alert(result.error)
         return
      }

      setCurrentFolder(result.data)
   }

   const handleClickCreateFolder = () => {
      if (!currentFolder) {
         return
      }

      const currentPath = `${currentFolder.path}/${currentFolder.name}`
      window.electronAPI
         .createFolder({ path: currentPath, name: 'my-new-folder-2' })
         .then((result: IpcCreateFolderResult) => {
            if (!result.isSuccess) {
               alert(result.error)
               return
            }

            window.electronAPI.readWorkingFolder({ path: currentPath }).then(onDirectoryRead)
         })
   }

   const handleDoubleClick = (dirent: OsDirent) => {
      const fullPath = `${dirent.path}/${dirent.name}`

      if (!isOsFolder(dirent)) {
         window.electronAPI.openFile({ path: fullPath }).then((result) => {
            if (!result.isSuccess) {
               alert(result.error)
               return
            }
         })
         return
      }

      window.electronAPI.readWorkingFolder({ path: fullPath }).then(onDirectoryRead)
   }

   const handleClickBack = () => {
      if (!currentFolder) {
         return
      }

      window.electronAPI.readWorkingFolder({ path: currentFolder.path }).then(onDirectoryRead)
   }

   // const handleContextMenuItemClick = (option: string) => {
   //   setContextMenu(null);

   //   if (!selectedFile) {
   //     return;
   //   }

   //   if (option !== "Delete") {
   //     return;
   //   }

   //   window.electronAPI
   //     .deleteDirent({ path: `${selectedFile.path}/${selectedFile.name}` })
   //     .then((result) => {
   //       if (!result.isSuccess) {
   //         console.log(result.error);
   //         return;
   //       }

   //       setSelectedFile(null);

   //       window.electronAPI
   //         .readDirectory({ path: selectedFile.path })
   //         .then(onDirectoryRead);
   //     });
   // };

   // const handleContextMenuClick = (
   //   e: React.MouseEvent,
   //   fileClicked: OsFileWithMetadata
   // ) => {
   //   setSelectedFile(fileClicked);
   //   const xCoord = e.pageX;
   //   const yCoord = e.pageY;
   //   setContextMenu({
   //     xCoord,
   //     yCoord,
   //     options: ["Rename", "Delete"],
   //   });
   // };

   useEffectOnce(() => {
      window.electronAPI.readWorkingFolder({ path: null }).then(onDirectoryRead)
   })

   return (
      <div className="root">
         <button type="button" onClick={handleClickBack}>
            Go back
         </button>

         <button type="button" onClick={handleClickCreateFolder}>
            Create new folder
         </button>

         <DirentList onEntryDoubleClick={handleDoubleClick} />

         {/* {contextMenu && (
        <ul
          ref={contextMenuRef}
          className="root__context-menu"
          style={{ top: contextMenu.yCoord, left: contextMenu.xCoord }}
        >
          {contextMenu.options.map((option) => (
            <li
              key={option}
              className="root__context-menu-item"
              onClick={() => handleContextMenuItemClick(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )} */}
      </div>
   )
}
