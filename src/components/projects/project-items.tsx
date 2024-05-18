// "use client";

import {
  faCircleExclamation,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";
import { ProjectItem } from "./project-item";

export const ProjectItems: FC<
  {
    projects: IProject[];
    isLoading: boolean;
    isError: boolean;
  } & IRefetch
> = ({ projects, isError, isLoading, refetch }) => {
  let content;
  if (!isLoading && isError) {
    content = (
      <div className="px-10 mt-4 h-full flex flex-col items-center justify-center">
        <FontAwesomeIcon className="text-3xl" icon={faCircleExclamation} />
        <p className="mt-2 text-lg">Something went wrong!</p>
      </div>
    );
  } else if (!isLoading && !isError && projects.length === 0) {
    content = (
      <div className="px-10 mt-4 h-full flex flex-col items-center justify-center">
        <FontAwesomeIcon className="text-3xl" icon={faTriangleExclamation} />
        <p className="mt-2 text-lg">No team founded!</p>
      </div>
    );
  } else if (!isLoading && !isError && projects.length > 0) {
    content = (
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 px-10 mt-4 gap-6 overflow-auto">
        {projects.map((team) => (
          <ProjectItem key={team.id} {...team} refetch={refetch} />
        ))}
      </div>
    );
  }

  return content;
};
