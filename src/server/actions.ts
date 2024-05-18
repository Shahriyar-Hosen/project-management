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

interface IAddProject {
  name: string;
  email: string;
  description: string;
  color: IProjectColor;
}
export const addProject = async ({ email, ...others }: IAddProject) => {
  try {
    const result = await db.project.create({
      data: {
        email,
        ...others,
        date: new Date(),
        members: {
          create: [{ userEmail: email }],
        },
      },
    });

    return result;
  } catch (error: any) {
    console.log("🚀 ~ line: 39 ~ login action error ~:-", error);
  }
};
type IAddMember = { name: string; email: string };
export const addProjectMember = async ({ email, name }: IAddMember) => {
  try {
    const result = await db.projectMember.create({
      data: {
        projectName: name,
        userEmail: email,
      },
    });

    return result;
  } catch (error: any) {
    console.log("🚀 ~ line: 39 ~ login action error ~:-", error);
  }
};

export const getAllProject = async () => {
  try {
    const result = await db.project.findMany({
      include: {
        members: {
          include: {
            user: {
              select: {
                name: true,
                email: true,
                avatar: true,
                id: true,
              },
            },
          },
        },
      },
    });

    return result;
  } catch (error: any) {
    console.log("🚀 ~ line: 39 ~ login action error ~:-", error);
  }
};

export const deleteProject = async ({ name }: { name: string }) => {
  try {
    await db.projectMember.deleteMany({
      where: {
        projectName: name,
      },
    });
    await db.project.delete({
      where: {
        name,
      },
    });

    return { name };
  } catch (error: any) {
    console.log("🚀 ~ line: 39 ~ login action error ~:-", error);
  }
};
