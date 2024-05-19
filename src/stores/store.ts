export type ProjectState = {
  user: IUser | null;
  search: string;
};

export type ProjectActions = {
  login: (user: IUser) => void;
  logout: () => void;
  setSearch: (value: string) => void;
};

export type IStores = ProjectState & ProjectActions;

export const initStores = (): ProjectState => {
  const localUser =
    typeof window !== "undefined" && localStorage.getItem("user");
  const user = localUser ? (JSON.parse(localUser) as IUser) : null;

  return {
    search: "",
    user,
  };
};

export const defaultInitState: ProjectState = {
  search: "",
  user: null,
};
