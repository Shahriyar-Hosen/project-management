import { FC } from "react";

export const ErrorMessage: FC<{ message: string }> = ({ message }) => (
  <div className="flex items-center">
    <div className="relative bg-red-200 max-w-xl px-4 py-2 text-red-800 rounded shadow w-full">
      <span className="block text-sm">{message}</span>
    </div>
  </div>
);
