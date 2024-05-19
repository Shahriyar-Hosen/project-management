declare interface IChildren {
  children: React.ReactNode;
}

declare interface IClassName {
  className?: string;
}

declare interface IUser {
  id?: string;
  name: string;
  email: string;
  avatar: string;
  password?: string;
}

declare interface IMember {
  id?: string;
  projectName: string;
  userEmail: string;
  user: IUser;
}

declare interface IProject {
  id: string;
  name: string;
  email: string;
  description: string;
  color: IColors;
  date: Date;
  members: IMember[];
}

declare type IColors =
  | "red"
  | "green"
  | "yellow"
  | "violet"
  | "pink"
  | "orange"
  | "teal";

declare type IStatus =
  | "Backlog"
  | "Ready"
  | "Doing"
  | "Review"
  | "Blocked"
  | "Done";

declare type IRefetch = { refetch: () => void };

declare type NotificationType = "success" | "info" | "warning" | "error";

declare interface ITask {
  id: string;
  index: number;
  project: string;
  status: IStatus;
  color: IColors;
  title: string;
  description: string;
  email: string;
  avatar: string;
  date: Date;
  deadline: Date;
}

declare interface IBoardData {
  id: number;
  status: IStatus;
  tasks: ITask[];
}
