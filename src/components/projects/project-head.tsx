import { notification } from "antd";
import { FC, useState } from "react";
import { ProjectCardModal } from ".";

type NotificationType = "success" | "info" | "warning" | "error";
export interface Notification {
  type: NotificationType;
  message?: string;
  description?: string;
}
export const ProjectHead: FC<IRefetch> = ({ refetch }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [api, contextHolder] = notification.useNotification();

  const openNotification = ({ type, message, description }: Notification) => {
    api[type]({
      message: message,
      description: description,
      placement: "bottomRight",
    });
  };

  return (
    <div className="px-10 mt-6 flex justify-between">
      <h1 className="text-2xl font-bold">Projects</h1>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center justify-center w-6 h-6 ml-auto text-indigo-500 rounded hover:bg-indigo-500 hover:text-indigo-100"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          ></path>
        </svg>
      </button>

      {isOpen && (
        <ProjectCardModal
          refetch={refetch}
          setIsOpen={setIsOpen}
          openNotification={openNotification}
        />
      )}
      {contextHolder}
    </div>
  );
};
