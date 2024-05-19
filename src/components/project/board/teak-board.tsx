"use client";

import { FC, useEffect, useState } from "react";
import { Draggable, DropResult, Droppable } from "react-beautiful-dnd";

import { cn } from "@/lib/utils";
import { getAllBoardData } from "@/server/actions";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { DndContext } from "./dnd-context";
import { TaskStatus } from "./task-status";
import { TaskCards } from "./tesx-cards";
import { TaskCard } from "./task-card";

const fetchBoardData = async (project: string) => {
  return await getAllBoardData({ project });
};

export const TaskBoard: FC<{ defaultDb: IBoardData[] }> = ({ defaultDb }) => {
  const [data, setData] = useState<IBoardData[]>([]);

  useEffect(() => setData(defaultDb), [defaultDb]);

  const pathname = usePathname();
  const mainPath = pathname.slice(1).split("~");
  const projectName = mainPath[0].split("-").join(" ");
  const {
    data: dbData,
    isLoading: dbLoading,
    refetch: dbRefetch,
  } = useQuery({
    queryKey: ["tasks board"],
    queryFn: () => fetchBoardData(projectName),
  });

  useEffect(() => {
    console.log({ dbData });
    if (dbData) {
      setData(dbData);
    }
  }, [dbData]);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    if (source.droppableId !== destination.droppableId) {
      console.log("🚀 ~ onDragEnd ~ :", { source, destination });
      // Update Status
      const newData: IBoardData[] = [...JSON.parse(JSON.stringify(data))]; //shallow copy concept

      const oldDroppableIndex = newData.findIndex(
        (x) => String(x.id) === source.droppableId.split("-")[1]
      );
      const newDroppableIndex = newData.findIndex(
        (x) => String(x.id) == destination.droppableId.split("-")[1]
      );
      console.log("🚀 ~ onDragEnd ~ Index:", {
        newDroppableIndex,
        oldDroppableIndex,
      });

      const [item] = newData[oldDroppableIndex].tasks.splice(source.index, 1);

      item.status = newData[newDroppableIndex].status;
      item.index = destination.index;
      newData[newDroppableIndex].tasks.splice(destination.index, 0, item);
      console.log("🚀 ~ onDragEnd ~ item:", {
        item,
        newDroppable: newData[newDroppableIndex],
      });

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
      console.log("🚀 ~ onDragEnd ~ item:", {
        item,
        newDroppable: newData[droppableIndex],
      });

      setData([...newData]);
    }
  };

  return (
    <DndContext onDragEnd={onDragEnd}>
      <div className="pt-20 h-screen">
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
                    <TaskStatus title={val.status} item={val.tasks.length} />
                    <TaskCards>
                      {val.tasks?.map((task, i) => (
                        <Draggable
                          key={i}
                          draggableId={task.id.toString()}
                          index={i}
                        >
                          {(provided) => (
                            <div
                              // className="bg-gray-200 mx-1 px-4 py-3 my-3 w-full"
                              {...provided.dragHandleProps}
                              {...provided.draggableProps}
                              ref={provided.innerRef}
                            >
                              <TaskCard {...task} />
                              {/* <h3>{task.status}</h3>
                            <h2>{task.title}</h2>
                            <h2 className="max-w-full">{task.description}</h2>
                            <h2>{task.index}</h2> */}
                            </div>
                          )}
                        </Draggable>
                      ))}
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
