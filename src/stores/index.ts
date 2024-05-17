import { createStore } from "zustand/vanilla";
import { IStores, UserState, defaultInitState } from "./store";

export const createStores = (initState: UserState = defaultInitState) =>
  createStore<IStores>()((set) => ({
    ...initState,
    login: (user) => set(() => ({ user: user })),
    logout: () => set(() => ({ user: null })),
    decrementCount: () => set((state) => ({ count: state.count - 1 })),
    incrementCount: () => set((state) => ({ count: state.count + 1 })),
  }));
