import { FC } from "react";

export const TaskCards: FC<IChildren> = ({ children }) => {
  // bg-opacity-70
  return (
    <div
      className={
        "flex flex-col pb-2 overflow-x-hidden bg-white bg-opacity-30 px-2 rounded-lg min-h-[450px] scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-transparent scrollbar-thumb-rounded-full "
      }
    >
      {children}
    </div>
  );
};
