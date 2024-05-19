import { cn, dynamicStatus } from "@/lib/utils";
import { Button, Drawer } from "antd";
import moment from "moment";
import Image from "next/image";
import { FC, useEffect, useState } from "react";

type IEditTask = { open: boolean; onClose: () => void } & ITask;
export const EditTask: FC<IEditTask> = ({ onClose, open, ...task }) => {
  const { avatar, project, status, ...updateAble } = task;

  const [deadline, setDeadline] = useState(updateAble.deadline);
  const [title, setTitle] = useState(updateAble.title);
  const [description, setDescription] = useState(updateAble.description);
  const [email, setEmail] = useState(updateAble.email);
  const [enable, setEnable] = useState(false);

  useEffect(() => {
    const condition =
      deadline !== updateAble.deadline ||
      title !== updateAble.title ||
      description !== updateAble.description ||
      email !== updateAble.email ||
      false;

    setEnable(condition);
  }, [deadline, title, description, email, updateAble]);

  return (
    <Drawer
      title={
        <h2 className="text-xl text-center font-bold capitalize text-slate-800">
          {project}
        </h2>
      }
      onClose={onClose}
      open={open}
    >
      <div className="flex justify-between items-center gap-2.5">
        <div className="flex items-center font-bold">
          <svg
            className="w-4 h-4 text-gray-300 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
              clipRule="evenodd"
            />
          </svg>
          <span className="ml-1 leading-none">
            {moment(deadline).format("dddd DD MMM YYYY")}
          </span>
        </div>
        <div>
          <span
            className={cn(
              "text-xs font-bold px-2.5 py-0.5 rounded-full",
              dynamicStatus(status)
            )}
          >
            {status}
          </span>
        </div>
      </div>
      <div className="mt-5 space-y-2.5">
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          defaultValue={title}
          className="font-semibold w-full focus:outline-none text-wrap h-fit"
        />

        <textarea
          rows={5}
          defaultValue={description}
          onChange={(e) => setDescription(e.target.value)}
          className="font-semibold w-full focus:outline-none text-wrap h-fit"
        />

        <div className="pt-10 space-y-1.5">
          <p className="text-start font-semibold text-base">Assigned member:</p>
          <div className="flex justify-center items-center gap-2.5">
            <Image src={avatar} width={24} height={24} alt="" />
            <input
              type="email"
              defaultValue={email}
              onChange={(e) => setEmail(e.target.value)}
              className="font-semibold w-full focus:outline-none text-wrap h-fit"
            />
          </div>

          <div className="py-5">
            <span className="font-semibold">Set Update:&nbsp;&nbsp;&nbsp;</span>
            <input
              type="date"
              onChange={(e) => setDeadline(new Date(e.target.value))}
              className="font-semibold w-fit focus:outline-none"
            />
          </div>
          <Button
            type="primary"
            className="w-full disabled:bg-opacity-90 disabled:cursor-not-allowed"
            disabled={!enable}
          >
            Update
          </Button>
        </div>
      </div>
    </Drawer>
  );
};