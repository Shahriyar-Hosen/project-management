import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Oval } from 'react-loader-spinner';
import { useGetTeamInfoQuery } from '../../features/teams/teamsApi';

const TeamInfoModal = ({ id, setIsInfoOpen }) => {
    const { data, isLoading, isError } = useGetTeamInfoQuery(id, {refetchOnMountOrArgChange: true}) || {};

    let content;
    if (isLoading) {
        content = (
            <div className="relative bg-[#F9FAFB] w-11/12 md:w-2/5 sm:w-3/5 rounded-lg p-8 z-10">
                <div className="flex justify-center items-center">
                    <Oval
                        height={70}
                        width={70}
                        color="#5b21b6"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                        ariaLabel="oval-loading"
                        secondaryColor="#ddd6fe"
                        strokeWidth={4}
                        strokeWidthSecondary={3}
                    />
                </div>
            </div>
        );
    } else if (!isLoading && isError) {
        content = (
            <div className="relative bg-[#F9FAFB] w-11/12 md:w-2/5 sm:w-3/5 rounded-lg p-8 z-10">
                <div className="flex flex-col justify-center items-center">
                    <FontAwesomeIcon className='text-2xl mb-2' icon={faCircleExclamation} />
                    <p className='text-xl'>Something went wrong!</p>
                </div>
            </div>
        );
    } else if (!isLoading && !isError && data.id) {
        const { team, email, members } = data || {};

        const teamCreator = members.find((member) => member.email === email);
        const {
            avatar: creatorAvatar,
            name: creatorName,
            email: creatorEmail,
        } = teamCreator || {};

        content = (
            <div className="relative bg-[#F9FAFB] w-11/12 md:w-2/5 sm:w-3/5 rounded-lg p-8 z-10">
                <div className="flex justify-between border-b pb-4">
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold">
                        <span className="capitalize">{team}</span> team info
                    </h3>
                    <button
                        onClick={() => setIsInfoOpen(false)}
                        className="p-2 transition-all hover:bg-gray-200 rounded-lg"
                    >
                        <svg
                            aria-hidden="true"
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                    </button>
                </div>

                <div className="py-5">
                    <div>
                        <h4 className="text-lg sm:text-xl md:text-2xl font-extrabold mb-4 text-center">
                            Team creator
                        </h4>
                        <div className="flex justify-center">
                            <div className="flex items-center gap-3 transition-all ease-in-out hover:bg-violet-200 rounded-lg py-1 px-2">
                                <img
                                    className="w-14"
                                    src={creatorAvatar}
                                    alt={creatorName}
                                />
                                <div className="flex flex-col">
                                    <span className="font-bold">
                                        {creatorName}
                                    </span>
                                    <span>{creatorEmail}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="py-5">
                    <div>
                        <h4 className="text-lg sm:text-xl md:text-2xl font-extrabold mb-4">
                            Team members:
                        </h4>
                        <div className="grid gap-2 lg:grid-cols-2 sm:grid-cols-1">
                            {members.map((member) => (
                                <div
                                    key={member.id}
                                    className="flex items-center gap-3 transition-all ease-in-out hover:bg-violet-200 rounded-lg py-1 px-2"
                                >
                                    <img
                                        className="w-12"
                                        src={member.avatar}
                                        alt={member.name}
                                    />
                                    <div className="flex flex-col">
                                        <span className="font-bold">
                                            {member.name}
                                        </span>
                                        <span>{member.email}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed top-0 left-0 w-full flex items-center justify-center bg-violet-500 h-full bg-opacity-60 z-10">
            <div className="absolute w-full h-full bg-slate-900 bg-opacity-60"></div>
            {content}
        </div>
    );
};

export default TeamInfoModal;
