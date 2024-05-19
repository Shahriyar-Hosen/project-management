"use client";

import { FC } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

interface IDndContext extends IChildren {
  onDragEnd: (result: DropResult) => void;
}

export const DndContext: FC<IDndContext> = ({ children, onDragEnd }) => (
  <DragDropContext onDragEnd={onDragEnd}>{children}</DragDropContext>
);
