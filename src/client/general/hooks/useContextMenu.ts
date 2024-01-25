import { ContextMenuItem, useContextMenuStore } from '../stores/context-menu.store'

type UseContextMenuData = {
   show: (e: React.MouseEvent, items: ContextMenuItem[]) => void
}

export function useContextMenu(): UseContextMenuData {
   const showContextMenu = useContextMenuStore((x) => x.showContextMenu)

   const showMenu = (e: React.MouseEvent, items: ContextMenuItem[]) => {
      e.stopPropagation()

      showContextMenu({
         top: e.pageY,
         left: e.pageX,
         items,
      })
   }

   return {
      show: showMenu,
   }
}
