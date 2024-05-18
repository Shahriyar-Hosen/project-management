import { getAllProject } from "@/server/actions";
import { useStores } from "@/stores/provider";
import { useQuery } from "@tanstack/react-query";
import { ProjectHead, ProjectItems } from ".";

const fetchProjects = async (email: string) => await getAllProject({ email });

export const TeamsBody = () => {
  const { user } = useStores((state) => state);
  const { data, isError, isLoading, refetch } = useQuery({
    queryKey: ["projects"],
    queryFn: () => fetchProjects(user?.email || ""),
  });

  return (
    <>
      <ProjectHead refetch={refetch} />
      <ProjectItems
        projects={data}
        isError={isError}
        isLoading={isLoading}
        refetch={refetch}
      />
    </>
  );
};
