"use client";

import { ProjectHead } from "@/components/projects";
import { getAllProject } from "@/server/actions";
import { useStores } from "@/stores/provider";
import { NextPage } from "next";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Home: NextPage = () => {
  const { user, logout, count, incrementCount, decrementCount } = useStores(
    (state) => state
  );
  const router = useRouter();

  useEffect(() => {
    !user && router.push("/login");
  }, [router, user]);

  const logoutFn = () => {
    localStorage.removeItem("user");
    logout();
    router.push("/login");
  };

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
      <div>
        Count: {count}
        <hr />
        <button type="button" onClick={() => incrementCount()}>
          Increment Count
        </button>
        <button type="button" onClick={() => decrementCount()}>
          Decrement Count
        </button>
      </div>
      <button onClick={logoutFn}>logout</button>
      <h1>Home</h1>
    </main>
  );
};

export default Home;
