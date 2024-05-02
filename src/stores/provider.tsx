"use client";

import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useRef,
} from "react";
import { useStore, type StoreApi } from "zustand";

import { initStores, type IStores } from "@/stores/store";
import { createStores } from ".";

export const StoreContext = createContext<StoreApi<IStores> | null>(null);

export const StoreProvider: FC<PropsWithChildren> = ({ children }) => {
  const storeRef = useRef<StoreApi<IStores>>();
  if (!storeRef.current) {
    storeRef.current = createStores(initStores());
  }

  return (
    <StoreContext.Provider value={storeRef.current}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStores = <T,>(selector: (store: IStores) => T): T => {
  const counterStoreContext = useContext(StoreContext);

  if (!counterStoreContext) {
    throw new Error(`useStores must be use within StoreProvider`);
  }

  return useStore(counterStoreContext, selector);
};
