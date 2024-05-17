import { From, UserList } from "@/components/login";
import { NextPage } from "next";

const LoginPage: NextPage = () => {
  return (
    <main className="flex flex-col sm:flex-row-reverse items-center justify-center gap-5  min-h-screen">
      <From />
      <UserList />
    </main>
  );
};

export default LoginPage;
