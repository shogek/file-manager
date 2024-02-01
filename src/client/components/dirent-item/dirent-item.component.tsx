import cn from 'classnames'
import { OsDirent } from '../../../shared/types'
import { isOsFolder } from '../../../shared/type.helpers'
import { getHumanReadableDate } from '../../general/helpers/date-time.helpers'
import { getHumanReadableSize } from '../../general/helpers/size.helpers'
import { IconFolder } from '../icons/icon-folder.component'
import { IconFile } from '../icons/icon-file.component'
import './dirent-item.scss'

type DirentItemProps = {
   dirent: OsDirent
   isSelected: boolean
}

export function DirentItem({ dirent, isSelected }: DirentItemProps) {
   const isFolder = isOsFolder(dirent)

   return (
      <div
         className={cn('dirent-item', { ['dirent-item--selected']: isSelected })}
         title={`${dirent.path}/${dirent.name}`}
      >
         {isFolder ? (
            <IconFolder className="dirent-item__icon" height={20} width={20} />
         ) : (
            <IconFile className="dirent-item__icon" height={20} width={20} />
         )}

         <span>{dirent.name}</span>

         <span>{getHumanReadableDate(dirent.metadata.dateModified)}</span>

         <span>{isFolder ? `${dirent.direntCount} items` : getHumanReadableSize(dirent.metadata.sizeInBytes)}</span>
      </div>
   )
}
