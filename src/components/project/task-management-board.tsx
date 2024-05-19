import { BACKLOG, BLOCKED, DOING, DONE, READY, REVIEW } from "@/lib/constent";
// import { useDrop } from "react-dnd";
import { ProjectsHead } from "./task-head";
import { TaskCards } from "./tesx-cards";
// import { BACKLOG, BLOCKED, DOING, DONE, READY, REVIEW } from '../../data/types';
// import {
//     useEditProjectMutation,
//     useGetProjectsQuery,
// } from '../../features/projects/projectsApi';
// import ProjectCard from './ProjectCard';
// import ProjectCards from './ProjectCards';
// import ProjectsHead from './ProjectsHead';
// import ProjectStatus from './ProjectStatus';

export const TaskManagementBoard = () => {
  //   const { data: projects } = useGetProjectsQuery(undefined, {
  //     refetchOnMountOrArgChange: true,
  //   });
  //   const [editProject] = useEditProjectMutation();

  //   const filterByStatus = (status) => (project) => project.status === status;

  //   const [{ isOver: isBacklogOver }, moveFromBacklogRef] = useDrop({
  //     accept: [BACKLOG, READY, DOING, REVIEW, BLOCKED, DONE],
  //     collect: (monitor: any) => ({ isOver: !!monitor.isOver() }),
  //     drop: (item: any) => {
  //       const { id } = item || {};
  //       //   editProject({ id, data: { status: "backlog" } });
  //     },
  //   });

  //   const [{ isOver: isReadyOver }, moveFromReadyRef] = useDrop({
  //     accept: [BACKLOG, READY, DOING, REVIEW, BLOCKED, DONE],
  //     collect: (monitor: any) => ({ isOver: !!monitor.isOver() }),
  //     drop: (item: any) => {
  //       const { id } = item || {};
  //       //   editProject({ id, data: { status: "ready" } });
  //     },
  //   });

  //   const [{ isOver: isDoingOver }, moveFromDoingRef] = useDrop({
  //     accept: [BACKLOG, READY, DOING, REVIEW, BLOCKED, DONE],
  //     collect: (monitor: any) => ({ isOver: !!monitor.isOver() }),
  //     drop: (item: any) => {
  //       const { id } = item || {};
  //       //   editProject({ id, data: { status: "doing" } });
  //     },
  //   });

  //   const [{ isOver: isReviewOver }, moveFromReviewRef] = useDrop({
  //     accept: [BACKLOG, READY, DOING, REVIEW, BLOCKED, DONE],
  //     collect: (monitor: any) => ({ isOver: !!monitor.isOver() }),
  //     drop: (item: any) => {
  //       const { id } = item || {};
  //       //   editProject({ id, data: { status: "review" } });
  //     },
  //   });

  //   const [{ isOver: isBlockedOver }, moveFromBlockedRef] = useDrop({
  //     accept: [BACKLOG, READY, DOING, REVIEW, BLOCKED, DONE],
  //     collect: (monitor: any) => ({ isOver: !!monitor.isOver() }),
  //     drop: (item: any) => {
  //       const { id } = item || {};
  //       //   editProject({ id, data: { status: "blocked" } });
  //     },
  //   });

  //   const [{ isOver: isDoneOver }, moveFromDoneRef] = useDrop({
  //     accept: [BACKLOG, READY, DOING, REVIEW, BLOCKED, DONE],
  //     collect: (monitor: any) => ({ isOver: !!monitor.isOver() }),
  //     drop: (item: any) => {
  //       const { id } = item || {};
  //       //   editProject({ id, data: { status: "done" } });
  //     },
  //   });

  return (
    <>
      <ProjectsHead />

      <div className="flex flex-grow px-10 mt-4 space-x-6 overflow-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-transparent scrollbar-thumb-rounded-full z-10">
        <div className="flex flex-col flex-shrink-0 w-72">
          {/* <ProjectStatus
            title="Backlog"
            item={projects?.filter(filterByStatus("backlog")).length}
            addBtn={true}
          /> */}

          {/* <TaskCards isOver={isBacklogOver} reference={moveFromBacklogRef}> */}
          {/* {projects?.length > 0 &&
              projects
                .slice()
                .reverse()
                .filter(filterByStatus("backlog"))
                .map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    type={BACKLOG}
                    index={project.id}
                    options={true}
                  />
                ))} */}
          {/* </TaskCards> */}
        </div>

        <div className="flex flex-col flex-shrink-0 w-72">
          {/* <ProjectStatus
            title="Ready"
            item={projects?.filter(filterByStatus("ready")).length}
            addBtn={false}
          /> */}

          {/* <TaskCards isOver={isReadyOver} reference={moveFromReadyRef}> */}
          {/* {projects?.length > 0 &&
              projects
                .slice()
                .reverse()
                .filter(filterByStatus("ready"))
                .map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    type={READY}
                    index={project.id}
                    options={false}
                  />
                ))} */}
          {/* </TaskCards> */}
        </div>

        <div className="flex flex-col flex-shrink-0 w-72">
          {/* <ProjectStatus
            title="Doing"
            item={projects?.filter(filterByStatus("doing")).length}
            addBtn={false}
          /> */}

          {/* <TaskCards isOver={isDoingOver} reference={moveFromDoingRef}> */}
          {/* {projects?.length > 0 &&
              projects
                .slice()
                .reverse()
                .filter(filterByStatus("doing"))
                .map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    type={DOING}
                    index={project.id}
                    options={false}
                  />
                ))} */}
          {/* </TaskCards> */}
        </div>

        <div className="flex flex-col flex-shrink-0 w-72">
          {/* <ProjectStatus
            title="Review"
            item={projects?.filter(filterByStatus("review")).length}
            addBtn={false}
          /> */}

          {/* <TaskCards isOver={isReviewOver} reference={moveFromReviewRef}> */}
          {/* {projects?.length > 0 &&
              projects
                .slice()
                .reverse()
                .filter(filterByStatus("review"))
                .map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    type={REVIEW}
                    index={project.id}
                    options={false}
                  />
                ))} */}
          {/* </TaskCards> */}
        </div>

        <div className="flex flex-col flex-shrink-0 w-72">
          {/* <ProjectStatus
            title="Blocked"
            item={projects?.filter(filterByStatus("blocked")).length}
            addBtn={false}
          /> */}

          {/* <TaskCards isOver={isBlockedOver} reference={moveFromBlockedRef}> */}
          {/* {projects?.length > 0 &&
              projects
                .slice()
                .reverse()
                .filter(filterByStatus("blocked"))
                .map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    type={BLOCKED}
                    index={project.id}
                    options={false}
                  />
                ))} */}
          {/* </TaskCards> */}
        </div>

        <div className="flex flex-col flex-shrink-0 w-72">
          {/* <ProjectStatus
            title="Done"
            item={projects?.filter(filterByStatus("done")).length}
            addBtn={false}
          /> */}

          {/* <TaskCards isOver={isDoneOver} reference={moveFromDoneRef}> */}
          {/* {projects?.length > 0 &&
              projects
                .slice()
                .reverse()
                .filter(filterByStatus("done"))
                .map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    type={DONE}
                    index={project.id}
                    options={false}
                  />
                ))} */}
          {/* </TaskCards> */}
        </div>

        <div className="flex-shrink-0 w-6"></div>
      </div>
    </>
  );
};
