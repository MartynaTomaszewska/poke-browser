import { createLocalStorageStateHook } from "use-local-storage-state";
import { PersistedState } from "../types";

export const usePersistedState = createLocalStorageStateHook<PersistedState>(
  "poke-browser",
  null
);
