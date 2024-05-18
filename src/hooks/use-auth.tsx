"use client";

import { findSingleUser } from "@/server/actions";
import { useStores } from "@/stores/provider";
import { useCallback, useEffect, useState } from "react";

export const useLogin = () => {
  const { login } = useStores((state) => state);
  const [email, setEmail] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const errorStatus = (message: string) => {
    setIsLoading(false);
    setIsSuccess(false);
    setError(message);
  };

  const userLogin = useCallback(async () => {
    if (email) {
      setIsLoading(true);
      try {
        const user = await findSingleUser(email);
        if (user) {
          setIsLoading(false);
          setIsSuccess(true);
          setError("");

          localStorage.setItem("user", JSON.stringify(user));
          login(user);
        } else {
          errorStatus("User not found");
        }
      } catch (error: any) {
        errorStatus(error);
      }
    }
  }, [email, login]);

  useEffect(() => {
    userLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email]);

  return { isSuccess, isLoading, error, setEmail };
};

export const useCurrentUser = () => {
  const { user } = useStores((state) => state);
  const [userInfo, setUserInfo] = useState<IUser>();

  useEffect(() => {
    user && setUserInfo(user);
  }, [user]);

  return userInfo;
};
