"use client";

import { login } from "@/server/actions";
import { useCallback, useEffect, useState } from "react";

export const useLogin = () => {
  const [email, setEmail] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [user, setUser] = useState<IUser>();

  const errorStatus = (message: string) => {
    setIsLoading(false);
    setIsSuccess(false);
    setUser(undefined);
    setError(message);
  };

  const userLogin = useCallback(async () => {
    if (email) {
      setIsLoading(true);
      try {
        const user = await login(email);
        if (user) {
          setIsLoading(false);
          setIsSuccess(true);
          setError("");
          setUser(user);
        } else {
          errorStatus("User not found");
        }
      } catch (error: any) {
        errorStatus(error);
      }
    }
  }, [email]);

  useEffect(() => {
    userLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email]);

  return { user, isSuccess, isLoading, error, setEmail };
};
