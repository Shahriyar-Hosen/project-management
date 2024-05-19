"use client";

import { From, UserList } from "@/components/login";
import { useStores } from "@/stores/provider";
import { NextPage } from "next";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const LoginPage: NextPage = () => {
  const { user } = useStores((state) => state);

  const router = useRouter();
  useEffect(() => {
    user && router.push("/");
  }, [user, router]);

  return (
    <main className="flex flex-col sm:flex-row-reverse items-center justify-center gap-5  min-h-screen">
      <From />
      <UserList />
    </main>
  );
};

export default LoginPage;
