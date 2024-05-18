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

declare interface IProject {
  id?: string;
  name: string;
  email: string;
  description: string;
  color: IProjectColor;
  date: Date;
  members: IUser[];
}

declare type IProjectColor =
  | "red"
  | "green"
  | "yellow"
  | "violet"
  | "pink"
  | "orange"
  | "teal";
