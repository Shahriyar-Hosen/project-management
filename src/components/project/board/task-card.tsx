import moment from "moment";
import { FC, useState } from "react";
// import manageColor from '../../utils/manageColor';
import { faEllipsisVertical, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { useDrag } from "react-dnd";
import { DeleteModal } from "../../common";
// import { useDeleteProjectMutation } from '../../features/projects/projectsApi';
// import toast from 'react-hot-toast';
// import { useSelector } from 'react-redux';
// import DeleteModal from '../common/DeleteModal';

export const TaskCard: FC<ITask> = ({
  avatar,
  color,
  date,
  description,
  email,
  id,
  index,
  project,
  status,
  title,
}) => {
  // const { id, avatar, date, color, team, title, email } = project || {};
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [isNotUser, setIsNotUser] = useState(false);

  //   const [deleteProject, { isSuccess }] = useDeleteProjectMutation();
  //   const { user } = useSelector((state) => state.auth) || {};
  //   const { email: userEmail } = user || {};

  //   const [, dragRef] = useDrag({
  //     type: type,
  //     item: () => ({ ...project, index }),
  //     // collect: (monitor) => ({ isDragging: !!monitor.isDragging() }),
  //   });

  //   const { search } = useSelector((state) => state.search) || {};

  //   const teamColor = manageColor(color);

  const deleteHandler = () => {
    // deleteProject(id);
  };

  //   useEffect(() => {
  //     if (email !== userEmail) {
  //       setIsNotUser(true);
  //     }
  //   }, [email, userEmail]);

  //   useEffect(() => {
  //     if (isSuccess) {
  //       toast.success("Project deleted successfully!");
  //     }
  //   }, [isSuccess]);

  return (
    <>
      <div
        className={`relative flex flex-col items-start p-4 mt-3 bg-white rounded-lg cursor-pointer bg-opacity-90 group hover:bg-opacity-100`}
        // ${ search &&
        //     title.toLowerCase().includes(search.toLowerCase()) &&
        //     "ring ring-violet-400"
        //  }
        // ref={dragRef}
      >
        {/* {options && ( */}
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
        {/* )} */}
        <span
          className={`flex items-center h-6 px-3 text-xs font-semibold  rounded-full`} //${teamColor}
        >
          {/* {team.toUpperCase()} */}
          {title}
        </span>
        <h4 className="mt-3 text-sm font-medium">{title}</h4>
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
              {moment(date).format("MMM DD")}
            </span>
          </div>

          <img
            className="w-6 h-6 ml-auto rounded-full"
            src={avatar}
            alt="user"
          />
        </div>
      </div>
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
