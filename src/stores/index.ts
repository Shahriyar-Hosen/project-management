import { createStore } from "zustand/vanilla";
import { IStores, ProjectState, defaultInitState } from "./store";

export const createStores = (initState: ProjectState = defaultInitState) =>
  createStore<IStores>()((set) => {
    const logout = () =>
      set(() => {
        localStorage.clear();
        return { user: null };
      });

    return {
      ...initState,
      login: (user) => set(() => ({ user: user })),
      logout: logout,
      decrementCount: () => set((state) => ({ count: state.count - 1 })),
      incrementCount: () => set((state) => ({ count: state.count + 1 })),
    };
  });
