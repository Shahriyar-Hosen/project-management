"use server";

import { db } from "./db";

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
