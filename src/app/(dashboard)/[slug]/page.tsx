"use client";

import { ProjectBody } from "@/components/project";
import { useStores } from "@/stores/provider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ProjectDetailsPage = () => {
  const { user } = useStores((state) => state);
  const router = useRouter();

  useEffect(() => {
    !user && router.push("/login");
  }, [router, user]);

  return (
    <div>
      <ProjectBody />
    </div>
  );
};

export default ProjectDetailsPage;
