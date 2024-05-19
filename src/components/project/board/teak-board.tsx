"use client";

import { FC, useEffect, useState } from "react";
import { Draggable, DropResult, Droppable } from "react-beautiful-dnd";

import { IDB } from "./db";
import { DndContext } from "./dnd-context";

export const TaskBoard: FC<{ defaultDb: IDB[] }> = ({ defaultDb }) => {
  const [data, setData] = useState<IDB[]>([]);

  useEffect(() => setData(defaultDb), [defaultDb]);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    if (source.droppableId !== destination.droppableId) {
      console.log("🚀 ~ onDragEnd ~ :", { source, destination });
      // Update Status
      const newData: IDB[] = [...JSON.parse(JSON.stringify(data))]; //shallow copy concept

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
      <h1 className="text-center mt-8 mb-3 font-bold text-[25px] ">
        Drag and Drop Application
      </h1>
      <div className="flex gap-4 justify-between my-20 mx-4 flex-col lg:flex-row">
        {data.map((val, index) => {
          return (
            <Droppable
              key={index}
              droppableId={`droppable-${val.id}-${val.status}`}
            >
              {(provided) => (
                <div
                  className="p-5 lg:w-1/3 w-full bg-white  border-gray-400 border border-dashed"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  <h2 className="text-center font-bold mb-6 text-black">
                    {val.status}
                  </h2>
                  {val.tasks?.map((task, i) => (
                    <Draggable
                      key={i}
                      draggableId={task.id.toString()}
                      index={i}
                    >
                      {(provided) => (
                        <div
                          className="bg-gray-200 mx-1 px-4 py-3 my-3"
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                          ref={provided.innerRef}
                        >
                          <h3>{task.status}</h3>
                          <p>{task.name}</p>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          );
        })}
      </div>
    </DndContext>
  );
};
