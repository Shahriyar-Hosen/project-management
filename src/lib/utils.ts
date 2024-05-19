import { clsx, type ClassValue } from "clsx";
import { FormEvent } from "react";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const debounce = (fn: (value: string) => void, delay: number) => {
  let timeoutId: NodeJS.Timeout | number | undefined;

  return (e: FormEvent) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      fn((e.target as HTMLInputElement).value);
    }, delay);
  };
};

export const isValidEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const dynamicColor = (color: IColors) => ({
  "text-red-600 bg-red-100": color === "red",
  "text-green-600 bg-green-100": color === "green",
  "text-yellow-600 bg-yellow-100": color === "yellow",
  "text-violet-600 bg-violet-100": color === "violet",
  "text-pink-600 bg-pink-100": color === "pink",
  "text-orange-600 bg-orange-100": color === "orange",
  "text-teal-600 bg-teal-100": color === "teal",
});
