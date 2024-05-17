export type UserState = {
  count: number;
  user: IUser | null;
};

export type CounterActions = {
  login: (user: IUser) => void;
  logout: () => void;
  decrementCount: () => void;
  incrementCount: () => void;
};

export type IStores = UserState & CounterActions;

export const initStores = (): UserState => {
  const localUser =
    typeof window !== "undefined" && localStorage.getItem("user");
  const user = localUser ? (JSON.parse(localUser) as IUser) : null;

  return {
    count: new Date().getFullYear(),
    user,
  };
};

export const defaultInitState: UserState = {
  count: 0,
  user: null,
};
