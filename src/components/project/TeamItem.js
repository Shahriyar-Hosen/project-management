import React, { useState } from 'react';
import moment from 'moment';
import TeamMemberModal from './TeamMemberModal';
import manageColor from '../../utils/manageColor';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faAdd,
    faEllipsisVertical,
    faEye,
    faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { useDeleteTeamMutation } from '../../features/teams/teamsApi';
import TeamInfoModal from './TeamInfoModal';
import DeleteModal from '../common/DeleteModal';

const TeamItem = ({ team }) => {
    // local states
    const [isOpen, setIsOpen] = useState(false);
    const [isOptionsOpen, setIsOptionsOpen] = useState(false);
    const [isInfoOpen, setIsInfoOpen] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);

    // delete api
    const [deleteTeam] = useDeleteTeamMutation();

    const { user } = useSelector((state) => state.auth) || {};
    const { email } = user || {};
    const { id, team: teamName, title, color, date, members } = team || {};

    // manage colors
    const teamColor = manageColor(color);

    const deleteHandler = () => {
        deleteTeam({ id, email });
    };

    return (
        <div className="relative flex flex-col items-start p-4 mt-3 bg-white rounded-lg cursor-pointer bg-opacity-90 group hover:bg-opacity-100">
            <div className="absolute top-0 right-0 hidden items-center mt-3 mr-2 group-hover:flex">
                <button
                    className={`text-base transition delay-75 ease-in-out scale-0 text-gray-700 px-2 py-1 rounded hover:bg-violet-100 hover:text-violet-600 ${
                        isOptionsOpen && 'scale-90'
                    }`}
                    onClick={() => setIsInfoOpen(true)}
                >
                    <FontAwesomeIcon icon={faEye} />
                </button>
                <button
                    className={`text-base transition delay-75 ease-in-out scale-0 text-gray-700 px-2 py-1 rounded hover:bg-violet-100 hover:text-violet-600 ${
                        isOptionsOpen && 'scale-90'
                    }`}
                    onClick={() => setDeleteModal(true)}
                >
                    <FontAwesomeIcon icon={faTrash} />
                </button>
                <button
                    className={`text-base transition delay-75 ease-in-out scale-0 text-gray-700 px-2 py-1 rounded hover:bg-violet-100 hover:text-violet-600 ${
                        isOptionsOpen && 'scale-90'
                    }`}
                    onClick={() => setIsOpen(true)}
                >
                    <FontAwesomeIcon icon={faAdd} />
                </button>
                <button
                    onClick={() => setIsOptionsOpen(!isOptionsOpen)}
                    className="text-base text-gray-500 px-2 py-1 ml-1 rounded hover:bg-gray-200 hover:text-gray-700"
                >
                    <FontAwesomeIcon icon={faEllipsisVertical} />
                </button>
            </div>
            <span
                className={`flex items-center h-6 px-3 text-xs font-semibold ${teamColor} rounded-full`}
            >
                {teamName.toUpperCase()}
            </span>
            <h4 className="mt-3 text-sm font-medium">{title}</h4>
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
                        {moment(date).format('MMM DD')}
                    </span>
                </div>

                <div className="avatar-group -space-x-2">
                    {members.map((member) => (
                        <div key={member.id} className="avatar border-none">
                            <div className="w-6">
                                <img src={member.avatar} alt={member.name} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {isOpen && (
                <TeamMemberModal
                    id={id}
                    members={members}
                    setIsOpen={setIsOpen}
                    setIsOptionsOpen={setIsOptionsOpen}
                />
            )}
            {isInfoOpen && (
                <TeamInfoModal id={id} setIsInfoOpen={setIsInfoOpen} />
            )}
            {deleteModal && (
                <DeleteModal
                    deleteHandler={deleteHandler}
                    setDeleteModal={setDeleteModal}
                    message="Are you sure you want to delete this team?"
                />
            )}
        </div>
    );
};

export default TeamItem;
