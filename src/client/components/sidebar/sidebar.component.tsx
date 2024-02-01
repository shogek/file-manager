import cn from 'classnames'
import { IconBookmark } from '../icons/icon-bookmark.component'
import { IconFolder } from '../icons/icon-folder.component'
import { IconSettings } from '../icons/icon-settings.component'
import './sidebar.scss'

export function Sidebar() {
   return (
      <ul className="sidebar">
         <li className="sidebar__item">
            <IconFolder width={30} height={30} />
         </li>

         <li className={cn('sidebar__item', { ['sidebar__item--active']: true })}>
            <IconBookmark width={30} height={30} />
         </li>

         <li className="sidebar__item">
            <IconSettings width={30} height={30} />
         </li>
      </ul>
   )
}
