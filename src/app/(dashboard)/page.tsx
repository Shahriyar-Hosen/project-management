"use client";

import { ProjectHead } from "@/components/projects";
import { useCurrentUser } from "@/hooks/use-auth";
import { getAllProject } from "@/server/actions";
import { NextPage } from "next";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Home: NextPage = () => {
  const user = useCurrentUser();
  const router = useRouter();

  useEffect(() => {
    !user && router.push("/login");
  }, [router, user]);

  useEffect(() => {
    const projects = async () => {
      const res = await getAllProject();
      console.log("🚀 ~ projects ~ res:", res);
    };
    projects();
  }, []);

  return (
    <main>
      <ProjectHead />
    </main>
  );
};

export default Home;
