import React, { useEffect, useState } from 'react';
import { useAddTeamMemberMutation } from '../../features/teams/teamsApi';
import { useGetUserQuery } from '../../features/users/usersApi';
import toast from 'react-hot-toast';
import isValidEmail from '../../utils/isValidEmail';
import Error from '../common/Error';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const TeamCardModal = ({ id, members, setIsOpen, setIsOptionsOpen }) => {
    // local state
    const [email, setEmail] = useState('');
    const [skipReq, setSkipReq] = useState(true);
    const [disabled, setDisabled] = useState(true);

    const { data: user } = useGetUserQuery(email, { skip: skipReq });
    const [addTeamMember, { isLoading, isSuccess }] =
        useAddTeamMemberMutation();

        const existingMember = members.filter((member) => member.email === email);
        
        useEffect(() => {
        if (user?.length > 0 && existingMember?.length === 0) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [user, existingMember]);

    const debounceHandler = (fn, delay) => {
        let timeoutId;
        return (...arg) => {
            clearTimeout(timeoutId);

            timeoutId = setTimeout(() => {
                fn(...arg);
            }, delay);
        };
    };

    const doSearch = (value) => {
        if (isValidEmail(value)) {
            setEmail(value);
            setSkipReq(false);
        }
    };

    const handleSearch = debounceHandler(doSearch, 500);

    const handleSubmit = (e) => {
        e.preventDefault();

        addTeamMember({ id, data: { members: [...members, ...user] } });
    };

    const handleModalClose = () => {
        setIsOpen(false);
        setIsOptionsOpen(false);
    };

    useEffect(() => {
        if (isSuccess) {
            setIsOpen(false);
            setIsOptionsOpen(false);
            toast.success('Member added successfully!');
        }
    }, [isSuccess, setIsOpen, setIsOptionsOpen]);

    return (
        <div className="fixed top-0 left-0 w-full flex items-center justify-center bg-violet-500 h-full bg-opacity-60 z-10">
            <div className="absolute w-full h-full bg-slate-900 bg-opacity-60"></div>
            <div className="bg-[#F9FAFB] w-11/12 md:w-2/5 sm:w-3/5 rounded-lg p-8 z-10">
                <div className="flex justify-between border-b pb-4">
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-center">
                        Assign new team member!
                    </h3>
                    <button
                        onClick={handleModalClose}
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
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div className="flex gap-3">
                            <label htmlFor="email" className="sr-only">
                                Team title
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                                placeholder="Email"
                                onChange={(e) => handleSearch(e.target.value)}
                            />
                            <button
                                type="submit"
                                className="group flex items-center justify-center gap-3 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 disabled:bg-gray-300 disabled:hover:bg-gray-300"
                                disabled={disabled || isLoading}
                            >
                                <span>Add</span>
                                <FontAwesomeIcon icon={faArrowRight} />
                            </button>
                        </div>
                    </div>

                    {existingMember?.length > 0 && (
                        <Error message={'Member already exist in the team!'} />
                    )}

                    {user?.length === 0 && (
                        <Error message={'No user founded!'} />
                    )}
                </form>
            </div>
        </div>
    );
};

export default TeamCardModal;
