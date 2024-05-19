"use client";

import { FC, useEffect, useState } from "react";
import { Draggable, DropResult, Droppable } from "react-beautiful-dnd";

import { getAllBoardData, updateTaskStatus } from "@/server/actions";
import { useQuery } from "@tanstack/react-query";
import { notification } from "antd";
import { usePathname } from "next/navigation";
import { INotification } from "../project-head";
import { boardDataDefault } from "./db";
import { DndContext } from "./dnd-context";
import { TaskCard } from "./task-card";
import { TaskStatus } from "./task-status";
import { TaskCards } from "./tesx-cards";

const fetchBoardData = async (project: string) => {
  return await getAllBoardData({ project });
};

export const TaskBoard: FC = () => {
  const [data, setData] = useState<IBoardData[]>(boardDataDefault);
  const [statusAndIndex, setStatusAndIndex] = useState<ITask>();

  useEffect(() => setData(boardDataDefault), []);
  useEffect(() => {
    if (statusAndIndex) {
      const updateDb = async () => {
        updateTaskStatus({
          id: statusAndIndex.id,
          status: statusAndIndex.status,
          index: statusAndIndex.index,
        });
      };
      updateDb();
    }
  }, [statusAndIndex]);

  const pathname = usePathname();
  const mainPath = pathname.slice(1).split("~");
  const projectName = mainPath[0].split("-").join(" ");
  const {
    data: dbData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => fetchBoardData(projectName),
  });

  useEffect(() => {
    if (dbData) {
      setData(dbData);
    }
  }, [dbData]);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    if (source.droppableId !== destination.droppableId) {
      // Update Status
      const newData: IBoardData[] = [...JSON.parse(JSON.stringify(data))]; //shallow copy concept

      const oldDroppableIndex = newData.findIndex(
        (x) => String(x.id) === source.droppableId.split("-")[1]
      );
      const newDroppableIndex = newData.findIndex(
        (x) => String(x.id) == destination.droppableId.split("-")[1]
      );

      const [item] = newData[oldDroppableIndex].tasks.splice(source.index, 1);

      item.status = newData[newDroppableIndex].status;
      item.index = destination.index;
      newData[newDroppableIndex].tasks.splice(destination.index, 0, item);

      setStatusAndIndex(item);
      setData([...newData]);
    } else {
      // Update Index
      const newData = [...JSON.parse(JSON.stringify(data))]; //shallow copy concept
      const droppableIndex = newData.findIndex(
        (x) => x.id == source.droppableId.split("-")[1]
      );
      const [item] = newData[droppableIndex].tasks.splice(source.index, 1);
      item.index = destination.index;
      newData[droppableIndex].tasks.splice(destination.index, 0, item);

      setStatusAndIndex(item);
      setData([...newData]);
    }
  };

  const [api, contextHolder] = notification.useNotification();
  const openNotification = ({ type, message, description }: INotification) => {
    api[type]({
      message: message,
      description: description,
      placement: "bottomRight",
    });
  };

  return (
    <DndContext onDragEnd={onDragEnd}>
      <div className="pt-20 h-screen">
        {contextHolder}
        <h1 className="text-center font-bold text-2xl">
          Task Management Board
        </h1>

        <div className="flex flex-grow px-10 space-x-6 overflow-auto scrollbar-thin scrollbar-thumb-slate-800/80 scrollbar-track-transparent scrollbar-thumb-rounded-full z-10 h-full mt-5">
          {data.map((val, index) => {
            return (
              <Droppable
                key={index}
                droppableId={`droppable-${val.id}-${val.status}`}
              >
                {(provided) => (
                  <div
                    className="flex flex-col flex-shrink-0 w-72"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    <TaskStatus
                      title={val.status}
                      item={val.tasks.length}
                      openNotification={openNotification}
                      project={projectName}
                      refetch={refetch}
                      addTaskBtn={val.status === "Backlog"}
                    />
                    <TaskCards>
                      {!isLoading ? (
                        val.tasks?.map((task, i) => (
                          <Draggable
                            key={i}
                            draggableId={task.id.toString()}
                            index={i}
                          >
                            {(provided) => (
                              <div
                                {...provided.dragHandleProps}
                                {...provided.draggableProps}
                                ref={provided.innerRef}
                              >
                                <TaskCard {...task} refetch={refetch} />
                              </div>
                            )}
                          </Draggable>
                        ))
                      ) : (
                        <div className="animate-pulse bg-white/40 p-2 rounded-lg mt-2">
                          <div className="space-y-2.5 w-full">
                            <div className="h-4 w-10 bg-slate-700/50 rounded-full" />
                            <div className="h-3 bg-slate-700/50 rounded-full w-44" />
                            <div className="h-3 bg-slate-700/50 rounded-full w-36" />
                          </div>
                          <div className="space-y-2.5 flex justify-between items-end">
                            <div className="h-3 bg-slate-700/50 rounded-full w-20" />
                            <div className="h-5  w-5 bg-slate-700/50 rounded-full" />
                          </div>
                        </div>
                      )}
                      {provided.placeholder}
                    </TaskCards>
                  </div>
                )}
              </Droppable>
            );
          })}
        </div>
      </div>
    </DndContext>
  );
};
