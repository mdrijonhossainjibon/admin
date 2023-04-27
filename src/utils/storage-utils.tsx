import { useState, useEffect } from "react";

type StoreType = string | undefined;

export function getFromStorage(storage: Storage, key: string): StoreType {
  const result = storage.getItem(key);
  return result === null ? undefined : result;
}

export function setToStorage(storage: Storage, key: string, value: StoreType): void {
  if (value === undefined) {
    storage.clear();
  } else {
    storage.setItem(key, value);
  }
}

// TODO: This can be deprecated in favor of type-utils function (no high-order functions are required here)
function getOrElse<T>(get: () => T, def: () => T): T {
  const result = get();
  return result === undefined ? def() : result;
}

export function useStorageState(
  storage: Storage,
  key: string,
  initialState?: () => StoreType
): [StoreType, React.Dispatch<React.SetStateAction<StoreType>>] {
  const initialValue: () => StoreType = () =>
    getOrElse<StoreType>(
      () => getFromStorage(storage, key),
      initialState === undefined ? () => undefined : initialState
    );
  const [value, setValue] = useState<StoreType>(initialValue);

  useEffect(() => {
    setToStorage(storage, key, value);
  });

  return [value, setValue];
}
