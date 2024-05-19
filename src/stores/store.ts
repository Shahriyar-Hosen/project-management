export type ProjectState = {
  count: number;
  user: IUser | null;
};

export type ProjectActions = {
  login: (user: IUser) => void;
  logout: () => void;
  decrementCount: () => void;
  incrementCount: () => void;
};

export type IStores = ProjectState & ProjectActions;

export const initStores = (): ProjectState => {
  const localUser =
    typeof window !== "undefined" && localStorage.getItem("user");
  const user = localUser ? (JSON.parse(localUser) as IUser) : null;

  return {
    count: new Date().getFullYear(),
    user,
  };
};

export const defaultInitState: ProjectState = {
  count: 0,
  user: null,
};
