import { useCallback, useEffect, useRef } from 'react'
import { ContextMenuItem, useContextMenuStore } from '../../general/stores/context-menu.store'
import './context-menu.scss'

export function ContextMenu() {
   const {
      isVisible,
      contextMenu: { items, top, left },
      hideContextMenu,
   } = useContextMenuStore((x) => x)

   const contextMenuRef = useRef<HTMLElement | null>(null)

   const handleMouseUp = useCallback((e: MouseEvent) => {
      if (contextMenuRef.current && !contextMenuRef.current.contains(e.target as Node)) {
         hideContextMenu()
      }
   }, [])

   useEffect(() => {
      if (isVisible) {
         document.addEventListener('mouseup', handleMouseUp)
      } else {
         document.removeEventListener('mouseup', handleMouseUp)
      }
   }, [isVisible])

   if (!isVisible) {
      return null
   }

   const handleClick = (item: ContextMenuItem) => {
      hideContextMenu()
      item.onClick()
   }

   return (
      <menu
         className="context-menu"
         ref={contextMenuRef}
         style={{
            top,
            left,
         }}
      >
         <ul className="context-menu__item-list">
            {items.map((item) => (
               <li key={item.label}>
                  <button type="button" className="context-menu__item-button" onClick={() => handleClick(item)}>
                     {item.label}
                  </button>
               </li>
            ))}
         </ul>
      </menu>
   )
}
