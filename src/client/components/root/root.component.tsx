import { useCallback, useEffect, useRef, useState } from "react";
import cn from "classnames";
import {
  IpcCreateDirectoryResult,
  IpcReadDirectoryResult,
  OsFileWithMetadata,
} from "../../../shared/types";
import { useEffectOnce } from "../../general/hooks/useEffectOnce";
import { IconDirectory } from "../icons/icon-directory.component";
import { IconFile } from "../icons/icon-file.component";
import "../../general/styles/reset.css";
import "./root.scss";

type ContextMenu = {
  xCoord: number;
  yCoord: number;
  options: string[];
};

export function Root() {
  const [files, setFiles] = useState<OsFileWithMetadata[]>([]);
  const [selectedFile, setSelectedFile] = useState<OsFileWithMetadata | null>(
    null
  );
  const contextMenuRef = useRef<HTMLUListElement | null>(null);
  const [contextMenu, setContextMenu] = useState<ContextMenu | null>(null);

  const handleMouseDown = (e: MouseEvent) => {
    // TODO: This works, but after the context menu closes, the event listener is still active and firing events
    console.log(" ");
    console.log("handleMouseDown | e", e);
    console.log("handleMouseDown | contextMenu", contextMenu);
    console.log("handleMouseDown | contextMenuRef", contextMenuRef);
    console.log("handleMouseDown | e.target", e.target);
    if (!contextMenu || !contextMenuRef.current) {
      return;
    }

    if (!contextMenuRef.current.contains(e.target as Node)) {
      setContextMenu(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleMouseDown);

    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, [contextMenu]);

  const onDirectoryRead = (result: IpcReadDirectoryResult) => {
    if (!result.isSuccess) {
      alert(result.error);
      return;
    }

    setFiles(result.data);
  };

  const handleClickCreateFolder = () => {
    const anyFile = files[0];
    if (!anyFile) {
      return;
    }

    const currentPath = anyFile.path;
    window.electronAPI
      .createDirectory({ path: currentPath, name: "my-new-folder-2" })
      .then((result: IpcCreateDirectoryResult) => {
        if (!result.isSuccess) {
          alert(result.error);
          return;
        }

        window.electronAPI
          .readDirectory({ path: currentPath })
          .then(onDirectoryRead);
      });
  };

  const onDoubleClick = (file: OsFileWithMetadata) => {
    if (!file.isDirectory) {
      return;
    }

    const newPath = `${file.path}/${file.name}`;
    window.electronAPI.readDirectory({ path: newPath }).then(onDirectoryRead);
  };

  const handleClickBack = () => {
    let parentFolder = "";

    const anyFile = files[0];
    if (anyFile) {
      // Folder we entered could be empty
      parentFolder = anyFile.path.split("/").slice(0, -1).join("/");
    }

    if (selectedFile) {
      parentFolder = selectedFile.path;
    }

    if (!parentFolder) {
      return;
    }

    window.electronAPI
      .readDirectory({ path: parentFolder })
      .then(onDirectoryRead);
  };

  const handleClick = (fileClicked: OsFileWithMetadata) => {
    if (fileClicked.name === selectedFile?.name) {
      setSelectedFile(fileClicked);
      onDoubleClick(fileClicked);
      return;
    }

    setSelectedFile(fileClicked);
  };

  const handleContextMenuItemClick = (option: string) => {
    setContextMenu(null);

    if (!selectedFile) {
      return;
    }

    if (option !== "Delete") {
      return;
    }

    window.electronAPI
      .deleteDirent({ path: `${selectedFile.path}/${selectedFile.name}` })
      .then((result) => {
        if (!result.isSuccess) {
          console.log(result.error);
          return;
        }

        setSelectedFile(null);

        window.electronAPI
          .readDirectory({ path: selectedFile.path })
          .then(onDirectoryRead);
      });
  };

  const handleContextMenuClick = (
    e: React.MouseEvent,
    fileClicked: OsFileWithMetadata
  ) => {
    setSelectedFile(fileClicked);
    const xCoord = e.pageX;
    const yCoord = e.pageY;
    setContextMenu({
      xCoord,
      yCoord,
      options: ["Rename", "Delete"],
    });
  };

  useEffectOnce(() => {
    window.electronAPI.readDirectory({ path: null }).then(onDirectoryRead);
  });

  return (
    <div className="root">
      <button type="button" onClick={handleClickBack}>
        Go back
      </button>

      <button type="button" onClick={handleClickCreateFolder}>
        Create new folder
      </button>

      <ul className="root__file-list">
        {files.map((file) => (
          <li
            key={file.name}
            className={cn("root__file-list-item", {
              ["_selected"]: file.name === selectedFile?.name,
            })}
            onClick={() => handleClick(file)}
            onContextMenu={(e) => handleContextMenuClick(e, file)}
          >
            <p>
              {file.isDirectory ? (
                <IconDirectory width={10} height={10} />
              ) : (
                <IconFile width={10} height={15} />
              )}
            </p>
            <p>
              {file.name} | {file.metadata.dateModified} |{" "}
              {file.metadata.dateCreated}
            </p>
          </li>
        ))}
      </ul>

      {contextMenu && (
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
      )}
    </div>
  );
}
