"use client";

import { createContext, useContext, useRef, type ReactNode } from "react";
import { useStore, type StoreApi } from "zustand";

import {
  createMainStore,
  initCounterStore,
  type CounterStore,
} from "@/stores/store";

export const StoreContext = createContext<StoreApi<CounterStore> | null>(null);

export interface StoreProviderProps {
  children: ReactNode;
}

export const StoreProvider = ({ children }: StoreProviderProps) => {
  const storeRef = useRef<StoreApi<CounterStore>>();
  if (!storeRef.current) {
    storeRef.current = createMainStore(initCounterStore());
  }

  return (
    <StoreContext.Provider value={storeRef.current}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStores = <T,>(selector: (store: CounterStore) => T): T => {
  const counterStoreContext = useContext(StoreContext);

  if (!counterStoreContext) {
    throw new Error(`useStores must be use within StoreProvider`);
  }

  return useStore(counterStoreContext, selector);
};
