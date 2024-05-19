import { ProjectHead } from ".";
import { TaskBoard } from "./board";
import { boardDataDefault } from "./board/db";

export const ProjectBody = () => {
  return (
    <>
      <ProjectHead />
      <TaskBoard defaultDb={boardDataDefault} />
    </>
  );
};
