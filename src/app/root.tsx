import { useState } from "react";

export function Root() {
  const [fileNames, setFileNames] = useState<string[]>([]);

  const handleClick = async () => {
    const fileNames = await (window as any).electronAPI.getFileNames();
    setFileNames(fileNames as string[]);
  };

  return (
    <div>
      <button type="button" onClick={handleClick}>
        Load Download folder
      </button>

      <ul>
        {fileNames.map((fileName) => (
          <li key={fileName}>{fileName}</li>
        ))}
      </ul>
    </div>
  );
}
