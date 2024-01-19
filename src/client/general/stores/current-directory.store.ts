import { create } from "zustand";
import { WorkingFolder } from "../../../shared/types";

type CurrentFolderStoreState = {
  currentFolder: WorkingFolder | null;
  setCurrentFolder: (workingFolder: WorkingFolder) => void;
};

export const useCurrentFolderStore = create<CurrentFolderStoreState>()(
  (set) => ({
    currentFolder: null,
    setCurrentFolder: (workingFolder: WorkingFolder) =>
      set(() => ({ currentFolder: workingFolder })),
  })
);
