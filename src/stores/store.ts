export type CounterState = {
  count: number;
};

export type CounterActions = {
  decrementCount: () => void;
  incrementCount: () => void;
};

export type IStores = CounterState & CounterActions;

export const initStores = (): CounterState => {
  return { count: new Date().getFullYear() };
};

export const defaultInitState: CounterState = {
  count: 0,
};
