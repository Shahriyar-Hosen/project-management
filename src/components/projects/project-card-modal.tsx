"use client";

import { useCurrentUser } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";
import { addProject, isExistProject } from "@/server/actions";
import { ProjectColor } from "@prisma/client";
import {
  Dispatch,
  FC,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { ErrorMessage, Notification } from ".";

type IProjectCardModal = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  openNotification: (props: Notification) => void;
};

export const ProjectCardModal: FC<IProjectCardModal> = ({
  setIsOpen,
  openNotification,
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState<ProjectColor>("red");
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [projectExist, setProjectExist] = useState<boolean | undefined>(false);

  useEffect(() => {
    const checkProject = async () => {
      const isExist = await isExistProject(name);
      setProjectExist(isExist);
    };
    checkProject();
  }, [name]);

  const user = useCurrentUser();

  useEffect(() => {
    const isDisabled =
      loading ||
      (projectExist ? true : false) ||
      description?.length === 0 ||
      false;
    setDisabled(isDisabled);
  }, [projectExist, description, loading]);

  const filterBySearch = (value: string) => {
    console.log(value);
    setName(value.toLocaleLowerCase());
  };

  const debounce = (fn: (value: string) => void, delay: number) => {
    let timeoutId: NodeJS.Timeout | number | undefined;

    return (e: FormEvent) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        fn((e.target as HTMLInputElement).value);
      }, delay);
    };
  };

  const handleSearch = debounce((value) => filterBySearch(value), 500);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (user)
      await addProject({
        name: name.toLowerCase(),
        description,
        color,
        email: user.email,
      })
        .then((res) => {
          setIsOpen(false);
          setLoading(false);
          openNotification({
            type: "success",
            message: "Project Successfully Add!",
            description: `
            ${name} project is added now.
            This is a project description (" ${description} ").  
            and ${color} is a project color `,
          });
        })
        .catch((err: Error) => {
          setLoading(false);
          openNotification({
            type: "error",
            message: "Something went wrong!",
            description: err.message || "backend error",
          });
        });
  };

  const projectColor: ProjectColor[] = [
    "red",
    "green",
    "yellow",
    "violet",
    "pink",
    "orange",
    "teal",
  ];

  return (
    <div className="fixed top-0 left-0 w-full flex items-center justify-center bg-violet-500 h-full bg-opacity-60 z-10">
      <div className="absolute w-full h-full bg-slate-900 bg-opacity-60" />
      <div className="relative bg-[#F9FAFB] w-11/12 md:w-2/5 sm:w-3/5 rounded-lg p-8 z-10">
        <div className="flex justify-between border-b pb-4">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-center">
            Add new project!
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
        <form className="mt-4 space-y-6" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-3">
            <div>
              <input
                id="project-name"
                name="project"
                type="text"
                autoComplete="project-name"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                placeholder="Project name"
                onChange={handleSearch}
              />
            </div>
            <div>
              <textarea
                id="project-description"
                name="description"
                autoComplete="project-description"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                placeholder="Project description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            {/* color */}
            <div className="flex justify-center py-4">
              <div className="flex gap-2">
                {projectColor.map((colorName, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setColor(colorName)}
                    className={cn(
                      "h-8 w-8 rounded-full ring ring-transparent",
                      {
                        "bg-red-300": colorName === "red",
                        "bg-green-300": colorName === "green",
                        "bg-yellow-300": colorName === "yellow",
                        "bg-violet-300": colorName === "violet",
                        "bg-pink-300": colorName === "pink",
                        "bg-orange-300": colorName === "orange",
                        "bg-teal-300": colorName === "teal",
                      },
                      {
                        "ring-red-600/80":
                          color === "red" && color === colorName,
                        "ring-green-600/80":
                          color === "green" && color === colorName,
                        "ring-yellow-600/80":
                          color === "yellow" && color === colorName,
                        "ring-violet-600/80":
                          color === "violet" && color === colorName,
                        "ring-pink-600/80":
                          color === "pink" && color === colorName,
                        "ring-orange-600/80":
                          color === "orange" && color === colorName,
                        "ring-teal-600/80":
                          color === "teal" && color === colorName,
                      }
                    )}
                  />
                ))}
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 disabled:bg-gray-300 disabled:hover:bg-gray-300"
              disabled={disabled}
            >
              {!loading ? "Add team" : "loading..."}
            </button>
          </div>

          {projectExist && (
            <ErrorMessage message={"Team already exist! Try another name."} />
          )}
        </form>
      </div>
    </div>
  );
};
