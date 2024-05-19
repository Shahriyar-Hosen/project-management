import { cn } from "@/lib/utils";
import { deleteProject } from "@/server/actions";
import { faAdd, faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useStores } from "@/stores/provider";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { FC, useState } from "react";
import { ProjectMemberModal } from ".";
import { DeleteModal } from "../common";

export const ProjectItem: FC<IProject & IRefetch> = ({
  color,
  date,
  name,
  members,
  refetch,
  description,
}) => {
  const [memberModal, setMemberModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const { search } = useStores((state) => state);

  const deleteHandler = async () => {
    await deleteProject({ name }).then((res) => {
      setDeleteModal(false);
      refetch();
    });
  };

  return (
    <div
      className={cn(
        "relative flex flex-col items-start p-4 mt-3 bg-cyan-50/50 rounded-lg bg-opacity-90 group hover:bg-opacity-100",
        search &&
          name.toLowerCase().includes(search.toLowerCase()) &&
          "ring ring-violet-400"
      )}
    >
      <div className="absolute top-0 right-0 opacity-0 items-center mt-3 mr-2 group-hover:opacity-100 transition-all delay-150">
        <button
          className={
            "text-base transition delay-75 ease-in-out text-gray-700 px-2 py-1 rounded hover:bg-violet-100 hover:text-violet-600 scale-90"
          }
          onClick={() => setMemberModal(true)}
        >
          <FontAwesomeIcon icon={faAdd} />
        </button>
        <Link href={`/${name.split(" ").join("-")}~${color}`}>
          <button
            className={
              "text-base transition delay-75 ease-in-out text-gray-700 px-2 py-1 rounded hover:bg-violet-100 hover:text-violet-600 scale-90"
            }
          >
            <FontAwesomeIcon icon={faEye} />
          </button>
        </Link>
        <button
          className={
            "text-base transition delay-75 ease-in-out text-gray-700 px-2 py-1 rounded hover:bg-violet-100 hover:text-violet-600 scale-90"
          }
          onClick={() => setDeleteModal(true)}
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
      <Link href={`/${name.split(" ").join("-")}~${color}`}>
        <h2
          className={cn(
            "flex items-center h-6 px-3 text-xs font-semibold rounded-full w-fit",
            {
              "text-red-600 bg-red-100": color === "red",
              "text-green-600 bg-green-100": color === "green",
              "text-yellow-600 bg-yellow-100": color === "yellow",
              "text-violet-600 bg-violet-100": color === "violet",
              "text-pink-600 bg-pink-100": color === "pink",
              "text-orange-600 bg-orange-100": color === "orange",
              "text-teal-600 bg-teal-100": color === "teal",
            }
          )}
        >
          {name.toUpperCase()}
        </h2>
        <h4 className="mt-3 text-sm font-medium">{description}</h4>
      </Link>
      <div className="flex items-center justify-between w-full mt-3 text-xs font-medium text-gray-400">
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
            {moment(date).format("MMMM Do YYYY")}
          </span>
        </div>

        <div className="avatar-group -space-x-2 flex">
          {members.map(({ user }, i) => (
            <div key={i} className="avatar border-none">
              <div className="w-6">
                <Image
                  src={user.avatar}
                  width={24}
                  height={24}
                  alt={user.name}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {memberModal && (
        <ProjectMemberModal
          refetch={refetch}
          members={members}
          setIsOpen={setMemberModal}
        />
      )}
      {deleteModal && (
        <DeleteModal
          deleteHandler={deleteHandler}
          setDeleteModal={setDeleteModal}
          message="Are you sure you want to delete this Project?"
        />
      )}
    </div>
  );
};
