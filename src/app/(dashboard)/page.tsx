"use client";

import { TeamsBody } from "@/components/projects";
import { useStores } from "@/stores/provider";
import { NextPage } from "next";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Home: NextPage = () => {
  const user = useStores((state) => state);
  const router = useRouter();

  useEffect(() => {
    !user && router.push("/login");
  }, [router, user]);

  console.log("Home Page render count");

  return (
    <main>
      <TeamsBody />
    </main>
  );
};

export default Home;
