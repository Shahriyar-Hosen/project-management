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

export const isExistTask = async (
  task: string
): Promise<boolean | undefined> => {
  try {
    const isProjectExists = await db.task.findFirst({
      where: { title: task },
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
  color: IColors;
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

export const getAllProject = async ({ email }: { email: string }) => {
  try {
    const result = await db.project.findMany({
      where: {
        members: {
          some: {
            userEmail: email,
          },
        },
      },
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

type GetProject = { name: string; email: string };
export const getProject = async ({ email, name }: GetProject) => {
  try {
    const result = await db.project.findFirst({
      where: {
        name,
        members: {
          some: {
            userEmail: email,
          },
        },
      },
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

interface IAddTask {
  title: string;
  email: string;
  description: string;
  color: IColors;
  project: string;
  status: IStatus;
  avatar: string;
}
export const addTask = async (data: IAddTask) => {
  try {
    const result = await db.task.create({
      data: { ...data, date: new Date(), deadline: new Date() },
    });

    return result;
  } catch (error: any) {
    console.log("🚀 ~ line: 39 ~ login action error ~:-", error);
  }
};

export const getRecentActivities = async ({ project }: { project: string }) => {
  try {
    const result = await db.task.findMany({
      where: {
        project,
      },
      orderBy: {
        date: "desc",
      },
      take: 3,
    });

    return result;
  } catch (error: any) {
    console.log("🚀 ~ line: 39 ~ login action error ~:-", error);
  }
};

export const getAllBoardData = async ({ project }: { project: string }) => {
  try {
    interface Find {
      where: { project: string; status: IStatus };
      orderBy: { index: "desc" | "asc" };
    }
    const findMany = (status: IStatus): Find => ({
      where: { project, status },
      orderBy: { index: "desc" },
    });

    const backlog = await db.task.findMany(findMany("Backlog"));
    const ready = await db.task.findMany(findMany("Ready"));
    const doing = await db.task.findMany(findMany("Doing"));
    const review = await db.task.findMany(findMany("Review"));
    const blocked = await db.task.findMany(findMany("Blocked"));
    const done = await db.task.findMany(findMany("Done"));

    const result: IBoardData[] = [
      {
        id: 0,
        status: "Backlog",
        tasks: backlog,
      },
      {
        id: 1,
        status: "Ready",
        tasks: ready,
      },
      {
        id: 2,
        status: "Doing",
        tasks: doing,
      },
      {
        id: 3,
        status: "Review",
        tasks: review,
      },
      {
        id: 4,
        status: "Blocked",
        tasks: blocked,
      },
      {
        id: 5,
        status: "Done",
        tasks: done,
      },
    ];

    return result;
  } catch (error: any) {
    console.log("🚀 ~ line: 39 ~ All Board Data error ~:", error);
  }
};

interface IUpdateTask {
  id: string;
  title: string;
  email: string;
  description: string;
  // status: IStatus;
  // index: string;
  deadline: Date;
  avatar?: string;
}
export const updateTask = async ({ id, ...data }: IUpdateTask) => {
  try {
    let updateData: any = {};

    if (data.email) {
      const user = await db.user.findFirst({ where: { email: data.email } });
      if (user) {
        data.email = user.email;
        data.avatar = user.avatar;
      }
    }

    const result = await db.task.update({
      where: {
        id: id,
      },
      data: data,
    });
    console.log("🚀 ~ updateTask ~ result:", result);

    return result;
  } catch (error: any) {
    console.log("🚀 ~ line: 39 ~ login action error ~:-", error);
  }
};
