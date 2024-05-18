import { getAllProject } from "@/server/actions";
import { useQuery } from "@tanstack/react-query";
import { Oval } from "react-loader-spinner";
import { ProjectHead, ProjectItems } from ".";

const fetchProjects = async () => await getAllProject();

export const TeamsBody = () => {
  const { data, isError, isLoading, refetch } = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });

  return (
    <>
      <ProjectHead refetch={refetch} />
      {data ? (
        <ProjectItems
          projects={data}
          isError={isError}
          isLoading={isLoading}
          refetch={refetch}
        />
      ) : (
        <div className="px-10 mt-4 h-full flex items-center justify-center">
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
      )}
    </>
  );
};
