import { create } from 'zustand'

export type ContextMenuItem = {
   label: string
   onClick: () => void
}

type ContextMenu = {
   top: number
   left: number
   items: ContextMenuItem[]
}

type ContextMenuStoreState = {
   isVisible: boolean
   contextMenu: ContextMenu
   showContextMenu: (menu: ContextMenu) => void
   hideContextMenu: () => void
}

export const useContextMenuStore = create<ContextMenuStoreState>()((set) => ({
   isVisible: false,
   contextMenu: {
      items: [],
      left: 0,
      top: 0,
   },
   showContextMenu: (contextMenu: ContextMenu) => set((state) => ({ ...state, isVisible: true, contextMenu })),
   hideContextMenu: () => set((state) => ({ ...state, isVisible: false })),
}))
