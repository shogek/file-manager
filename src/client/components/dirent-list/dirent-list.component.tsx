import { useState } from "react";
import { OsDirent } from "../../../shared/types";
import { DirentItem } from "../dirent-item/dirent-item.component";
import { useCurrentFolderStore } from "../../general/stores/current-directory.store";
import "./dirent-list.scss";

type DirentListProps = {
  onEntryDoubleClick: (dirent: OsDirent) => void;
};

export function DirentList({ onEntryDoubleClick }: DirentListProps) {
  const currentFolder = useCurrentFolderStore((x) => x.currentFolder);
  const { dirents } = currentFolder ?? {};

  const [selected, setSelected] = useState<OsDirent | null>(null);

  if (!dirents?.length) {
    return null;
  }

  const handleClick = (dirent: OsDirent) => {
    if (dirent.name === selected?.name) {
      setSelected(null);
      onEntryDoubleClick(dirent);
      return;
    }

    setSelected(dirent);
  };

  return (
    <ul className="dirent-list">
      {dirents.map((dirent) => (
        <li key={dirent.path + dirent.name} onClick={() => handleClick(dirent)}>
          <DirentItem
            dirent={dirent}
            isSelected={dirent.name === selected?.name}
          />
        </li>
      ))}
    </ul>
  );
}
