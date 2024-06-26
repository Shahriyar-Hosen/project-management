"use client";

import { cn } from "@/lib/utils";
import { getProject, getRecentActivities } from "@/server/actions";
import { useStores } from "@/stores/provider";
import { useQuery } from "@tanstack/react-query";
import { notification } from "antd";
import moment from "moment";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { TaskCardModal } from ".";
import { ProjectMemberModal } from "../projects";

const fetchProject = async (email = "", name: string) =>
  await getProject({ email, name });
const fetchRecentActivities = async (project: string) =>
  await getRecentActivities({ project });

export interface INotification {
  type: NotificationType;
  message?: string;
  description?: string;
}

const RecentSkeleton = () => (
  <div className="animate-pulse space-y-2.5 flex justify-between items-center gap-2.5 bg-white/40 p-2 rounded-lg">
    <div className="space-y-2.5 w-full">
      <div className="h-4 bg-slate-700/50 rounded-full w-36" />
      <div className="h-3 bg-slate-700/50 rounded-full w-10/12" />
    </div>
    <div className="space-y-2.5 flex flex-col justify-center items-end">
      <div className="h-3 bg-slate-700/50 rounded-full w-16" />
      <div className="h-3 bg-slate-700/50 rounded-full w-28" />
    </div>
  </div>
);

export const ProjectHead = () => {
  const [memberModal, setMemberModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const mainPath = pathname.slice(1).split("~");
  const projectName = mainPath[0].split("-").join(" ");
  const projectColor = mainPath[1] as IColors;

  const { user } = useStores((state) => state);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["project"],
    queryFn: () => fetchProject(user?.email, projectName),
  });

  const {
    data: recentData,
    isLoading: recentLoading,
    refetch: recentRefetch,
  } = useQuery({
    queryKey: ["tasks", "recent tasks activities"],
    queryFn: () => fetchRecentActivities(projectName),
  });

  useEffect(() => {
    user && refetch();
  }, [refetch, user]);

  const [api, contextHolder] = notification.useNotification();
  const openNotification = ({ type, message, description }: INotification) => {
    api[type]({
      message: message,
      description: description,
      placement: "bottomRight",
    });
  };

  const { description, date, email, members } = data || {};

  return (
    <section className="px-10 space-y-5 max-w-screen-2xl mx-auto">
      <h1
        className={cn(
          "text-3xl font-bold capitalize rounded-full px-5 py-1 mt-6 bg-cyan-100 w-fit text-center mx-auto",
          {
            "text-red-600 bg-red-100": projectColor === "red",
            "text-green-600 bg-green-100": projectColor === "green",
            "text-yellow-600 bg-yellow-100": projectColor === "yellow",
            "text-violet-600 bg-violet-100": projectColor === "violet",
            "text-pink-600 bg-pink-100": projectColor === "pink",
            "text-orange-600 bg-orange-100": projectColor === "orange",
            "text-teal-600 bg-teal-100": projectColor === "teal",
          }
        )}
      >
        {projectName}
      </h1>

      <div className="flex justify-between items-start gap-5 pt-5">
        <div>
          {/* Project Details */}
          {isLoading ? (
            <div className="animate-pulse space-y-2.5 pb-3.5">
              <div className="h-4 bg-slate-700/50 rounded-full w-36" />
              <div>
                <div className="space-y-2.5 min-w-[640px]">
                  <div className="h-3 bg-slate-700/50 rounded-full w-full" />
                  <div className="h-3 bg-slate-700/50 rounded-full w-10/12" />
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-2.5">
              <div className="flex items-center text-slate-800 font-medium">
                <svg
                  className="w-4 h-4 fill-current"
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
              <p className="max-w-screen-sm">{description}</p>
            </div>
          )}

          {/* recent activities */}
          <div className="pt-10">
            <div className="flex justify-center items-center gap-5 pb-5 w-fit">
              <h4 className="text-xl font-semibold capitalize w-fit">
                recent activities
              </h4>
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
                  />
                </svg>
              </button>
            </div>

            {/* activities */}
            <div className="space-y-2.5">
              {recentData && !recentLoading ? (
                recentData?.map(({ title, description, status, date }, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center gap-2.5 bg-white/40 p-2 rounded-lg"
                  >
                    <div className="space-y-1">
                      <h1 className="font-semibold capitalize">{title}</h1>
                      <p className="text-sm max-w-sm">
                        {description.length > 50
                          ? description.slice(0, 50) + "..."
                          : description}{" "}
                      </p>
                    </div>
                    <div className="flex flex-col justify-center items-end gap-1">
                      <button
                        className={cn(
                          "rounded-full px-2.5 text-sm font-semibold",
                          {
                            "text-pink-600 bg-pink-100": status === "Backlog",
                            "text-orange-600 bg-orange-100": status === "Ready",
                            "text-yellow-600 bg-yellow-100": status === "Doing",
                            "text-violet-600 bg-violet-100":
                              status === "Review",
                            "text-red-600 bg-red-100": status === "Blocked",
                            "text-green-600 bg-green-100": status === "Done",
                          }
                        )}
                      >
                        {status}
                      </button>
                      <p className="text-sm">
                        {moment(date, "YYYYMMDD").fromNow()}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <>
                  <RecentSkeleton />
                  <RecentSkeleton />
                  <RecentSkeleton />
                </>
              )}
            </div>
          </div>
        </div>

        {/* Team Member */}
        <div>
          <div className="flex justify-center items-center gap-5  pb-5">
            <h4 className="text-xl font-semibold capitalize">Team Member</h4>
            <button
              onClick={() => setMemberModal(true)}
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
                />
              </svg>
            </button>
          </div>
          <div className="space-y-2.5">
            {!isLoading && members ? (
              members?.map((member, i) => (
                <div
                  key={i}
                  className="p-4 bg-cyan-100/40 rounded-lg min-w-[300px]"
                >
                  <div className="flex gap-2.5 items-center">
                    <div className="avatar border-none">
                      <Image
                        src={member?.user?.avatar}
                        width={30}
                        height={30}
                        alt={member?.user?.name}
                        className="w-10"
                      />
                    </div>
                    <div>
                      <h2 className="leading-4 text-sm font-semibold">
                        {member?.user?.name}
                      </h2>
                      <p className="text-xs">{member.userEmail}</p>
                    </div>
                  </div>
                  {member.userEmail === email && (
                    <button className="mt-2.5 w-full rounded-full p-0.5 px-2 text-sm font-semibold bg-green-300/50 text-green-700">
                      Author
                    </button>
                  )}
                </div>
              ))
            ) : (
              <div className="animate-pulse p-4 bg-cyan-50/50 rounded-lg min-w-[300px]">
                <div className="flex gap-2.5 justify-center items-center w-full">
                  <div className="h-10 w-12 bg-slate-700/50 rounded-full" />
                  <div className="space-y-1 w-full">
                    <div className="h-3 bg-slate-800/50 rounded-full w-8/12" />
                    <div className="h-2.5 bg-slate-600/50 rounded-full w-10/12" />
                  </div>
                </div>
                <div className="h-6 bg-slate-600/50 rounded-full w-full mt-2.5" />
              </div>
            )}
          </div>
        </div>
      </div>

      {isOpen && (
        <TaskCardModal
          refetch={recentRefetch}
          project={projectName}
          setIsOpen={setIsOpen}
          openNotification={openNotification}
        />
      )}
      {memberModal && members && (
        <ProjectMemberModal
          refetch={refetch}
          members={members}
          setIsOpen={setMemberModal}
        />
      )}
      {contextHolder}
    </section>
  );
};
