import { isValidEmail } from "@/lib/utils";
import { addProjectMember } from "@/server/actions";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AutoComplete } from "antd";
import {
  Dispatch,
  FC,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { ErrorMessage } from "./error";

interface IModal extends IRefetch {
  members: IMember[];
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const ProjectMemberModal: FC<IModal> = ({
  members,
  setIsOpen,
  refetch,
}) => {
  // local state
  const [email, setEmail] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [anotherUsers, setAnotherUsers] = useState<{ value: string }[]>([]);
  const [isExistingMember, setIsExistingMember] = useState<boolean>();
  const [allMembers, setAllMembers] = useState(members);

  const users = [
    { value: "shahriyar@hosen.com" },
    { value: "salman@gmail.com" },
    { value: "saikot@gmail.com" },
    { value: "hello@world.com" },
  ];

  const getPanelValue = (searchText: string) =>
    !searchText ? [] : users.filter((user) => user.value.includes(searchText));

  useEffect(() => {
    const existingMember = allMembers.find(
      (member) => member.userEmail === email
    );

    setIsExistingMember(existingMember ? true : false);
  }, [email, allMembers]);

  useEffect(() => {
    setDisabled((isExistingMember && true) || email.length === 0);
  }, [email, isExistingMember]);

  const onSelect = (data: string) => {
    console.log("onSelect", data);
  };

  const onChange = (data: string) => {
    setEmail(data);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isValidEmail(email)) {
      await addProjectMember({ email, name: allMembers[0].projectName }).then(
        (res) => {
          if (res) {
            refetch();
            setAllMembers((prev) => [
              ...prev,
              { ...res, user: allMembers[0].user },
            ]);
            setEmail("");
          }
        }
      );
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full flex items-center justify-center bg-violet-500 h-full bg-opacity-60 z-10">
      <div className="absolute w-full h-full bg-slate-900 bg-opacity-60" />
      <div className="bg-[#F9FAFB] w-11/12 md:w-2/5 sm:w-3/5 rounded-lg p-8 z-10">
        <div className="flex justify-between border-b pb-4">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-center">
            Assign new member!
          </h3>
          <button
            onClick={() => setIsOpen(false)}
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
        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px relative">
            <div className="flex gap-3">
              <label htmlFor="email" className="sr-only">
                Team title
              </label>
              {/* <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                placeholder="Email"
                onChange={handleSearch}
              /> */}
              <AutoComplete
                value={email}
                options={anotherUsers}
                onSelect={onSelect}
                onSearch={(text) => setAnotherUsers(getPanelValue(text))}
                onChange={onChange}
                placeholder="Email"
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
              />
              <button
                type="submit"
                className="group flex items-center justify-center gap-3 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 disabled:bg-gray-300 disabled:hover:bg-gray-300"
                disabled={disabled}
              >
                <span>Add</span>
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </div>
          </div>

          {isExistingMember && (
            <ErrorMessage message={"Member already exist in the team!"} />
          )}

          {/* {user?.length === 0 && <ErrorMessage message={"No user founded!"} />} */}
        </form>
      </div>
    </div>
  );
};
