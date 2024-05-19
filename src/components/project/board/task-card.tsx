import { DeleteModal } from "@/components/common";
import { cn, dynamicColor } from "@/lib/utils";
import { faEllipsisVertical, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import Image from "next/image";
import { FC, useState } from "react";
import { EditTask } from "./edit-task";

export const TaskCard: FC<ITask> = (task) => {
  const [open, setOpen] = useState(false);

  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [isNotUser, setIsNotUser] = useState(false);
  const { avatar, color, deadline, description, email, title } = task;

  //   const { search } = useSelector((state) => state.search) || {};

  //   const teamColor = manageColor(color);

  const showDrawer = () => setOpen(true);
  const onClose = () => setOpen(false);

  const deleteHandler = () => {
    // deleteProject(id);
  };

  return (
    <>
      <div
        onClick={showDrawer}
        className={`relative flex flex-col items-start p-4 mt-3 bg-white rounded-lg cursor-pointer bg-opacity-90 group hover:bg-opacity-100`}
        // ${ search &&
        //     title.toLowerCase().includes(search.toLowerCase()) &&
        //     "ring ring-violet-400"
        //  }
        // ref={dragRef}
      >
        <div className="absolute top-0 right-0 hidden items-center mt-3 mr-2 group-hover:flex">
          <button
            className={`text-base transition delay-75 ease-in-out scale-0 text-gray-700 px-2 py-1 rounded hover:bg-violet-100 hover:text-violet-600 ${
              isOptionsOpen && "scale-90"
            }`}
            onClick={() => setDeleteModal(true)}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
          <button
            onClick={() => setIsOptionsOpen(!isOptionsOpen)}
            className="text-base text-gray-500 px-2 py-1 ml-1 rounded hover:bg-gray-200 hover:text-gray-700"
          >
            <FontAwesomeIcon icon={faEllipsisVertical} />
          </button>
        </div>
        <span
          className={cn(
            "flex items-center h-6 px-3 text-xs font-semibold rounded-full capitalize",
            dynamicColor(color)
          )}
        >
          {title}
        </span>
        <p className="mt-3 text-sm font-medium text-wrap">{description}</p>
        <div className="flex items-center w-full mt-3 text-xs font-medium text-gray-400">
          <div className="flex items-center">
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
              {moment(deadline).format("MMM DD")}
            </span>
          </div>

          <Image
            className="w-6 h-6 ml-auto rounded-full"
            src={avatar}
            alt={email}
            width={24}
            height={24}
          />
        </div>
      </div>

      <EditTask open={open} onClose={onClose} {...task} />
      {deleteModal && (
        <DeleteModal
          deleteHandler={deleteHandler}
          setDeleteModal={setDeleteModal}
          message="Are you sure you want to delete this project?"
          isNotUser={isNotUser}
        />
      )}
    </>
  );
};
