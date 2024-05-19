import { ProjectHead } from ".";
import { TaskBoard } from "./board";
import { boardData } from "./board/db";

export const ProjectBody = () => {
  return (
    <>
      <ProjectHead />
      <TaskBoard defaultDb={boardData} />
    </>
  );
};
