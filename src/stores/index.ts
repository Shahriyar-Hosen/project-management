import { createStore } from "zustand/vanilla";
import { CounterState, IStores, defaultInitState } from "./store";

export const createStores = (initState: CounterState = defaultInitState) => {
  return createStore<IStores>()((set) => ({
    ...initState,
    decrementCount: () => set((state) => ({ count: state.count - 1 })),
    incrementCount: () => set((state) => ({ count: state.count + 1 })),
  }));
};
