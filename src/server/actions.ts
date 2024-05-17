"use server";

import { db } from "./db";

export const getUsers = async () => {
  try {
    const data = await db.user.findMany();

    const login = (users: IUser[], email: string, password: string) => {
      const test = users.find((user: IUser) => {
        if (user.email !== email) {
          console.log("🚀 ~ user not found  ~", email, user);
          return false;
        } else if (user.email === email && user.password !== password) {
          console.log("🚀 ~ Password dos't match!  ~");
          return false;
        }
        if (user.email === email && user.password === password) {
          return true;
        }
        return false;
      });
    };

    return { data };
  } catch (error) {
    console.log("🚀 ~ getUsers ~ error:", error);
    return { error: error };
  }
};

export const login = async (email: string): Promise<IUser | undefined> => {
  try {
    const user = await db.user.findUnique({
      where: { email },
    });
    if (user) return user;
  } catch (error: any) {
    console.log("🚀 ~ line: 39 ~ login action error ~ :- ", error);
  }
};
