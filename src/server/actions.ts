"use server";

import { db } from "./db";

export const findSingleUser = async (
  email: string
): Promise<IUser | undefined> => {
  try {
    const user = await db.user.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
      },
    });
    if (user) return user;
  } catch (error: any) {
    console.log("🚀 ~ line: 39 ~ login action error ~ :- ", error);
  }
};

export const isExistProject = async (
  projectName: string
): Promise<boolean | undefined> => {
  try {
    const isProjectExists = await db.project.findFirst({
      where: { name: projectName },
    });

    return isProjectExists ? true : false;
  } catch (error: any) {
    console.log("🚀 ~ line: 39 ~ login action error ~ :-", error);
  }
};

// addTeams({
//   team: team.toLowerCase(),
//   title,
//   color,
//   email,
//   date: new Date().getTime(),
//   members: [user],

// name: string;
// description: string;
// color: string;
// date: Date;
// email: string;
// members: IUser[];
// });

export const addProject = async ({
  name,
  description,
  date,
  email,
  members,
  color,
}: IProject) => {
  try {
    const newProject = await db.project.create({
      data: {
        name,
        description,
        color,
        email,
        date,
        members: {
          create: [{ userEmail: email }],
        },
      },
    });

    console.log("Project created:", newProject);

    return newProject;
  } catch (error: any) {
    console.log("🚀 ~ line: 39 ~ login action error ~:-", error);
  }
};
