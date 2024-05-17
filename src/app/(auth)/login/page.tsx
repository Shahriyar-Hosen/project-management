"use client";

import { faInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NextPage } from "next";
import Image from "next/image";
import { FC, useState } from "react";

import { Loading } from "@/components/common";

const LoginPage: NextPage = () => {
  // local states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // auth api
  //  const [login, { isLoading }] = useLoginMutation();

  const isLoading = false;

  const handleSubmit = (e: any) => {
    e.preventDefault();
    //  login({ email, password });
  };

  if (isLoading) return <Loading />;

  const From = () => (
    <section className="sm:min-h-[400px] min-w-[325px] bg-white/80 flex items-center justify-center rounded-lg shadow-lg py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <Image
            className="mx-auto h-14 w-auto"
            src="/logo.png"
            alt="site logo"
            width={50}
            height={50}
          />
          <h2 className="mt-6 text-center text-2xl sm:text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </section>
  );

  const UserList = () => {
    const userEmails = [
      "shahriyar@hosen.com",
      "salman@gmail.com",
      "saikot@gmail.com",
    ];

    const EmailBox: FC<{ email: string }> = ({ email }) => (
      <li
        onClick={() => setEmail(email)}
        className="flex items-center gap-1 py-1 px-2 rounded-lg hover:bg-gray-100 cursor-pointer"
      >
        <span className="font-semibold">Email:</span>
        <span>{email}</span>
      </li>
    );

    return (
      <section className="sm:min-h-[400px] min-w-[325px] bg-white/80 flex items-center justify-center rounded-lg shadow-lg py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full text-left space-y-8">
          <div className="rounded-md -space-y-px">
            <div className="flex justify-between items-center mb-3 px-2">
              <h3 className="text-xl font-bold">Some available users!</h3>
              <div
                className="tooltip tooltip-left cursor-pointer flex"
                data-tip="You can click on any email or password to skip typing!"
              >
                <FontAwesomeIcon
                  className="bg-violet-300 text-violet-800 py-1 px-2 rounded"
                  icon={faInfo}
                />
              </div>
            </div>
            <ul>
              {userEmails.map((userEmail) => (
                <EmailBox key={userEmail} email={userEmail} />
              ))}

              <li
                onClick={() => setPassword("123456")}
                className="flex items-center gap-1 py-1 px-2 rounded-lg hover:bg-gray-100 cursor-pointer"
              >
                <span className="font-semibold">Password:</span>
                <span className="text-blue-600 font-medium">123456</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    );
  };

  return (
    <main className="flex flex-col sm:flex-row-reverse items-center justify-center gap-5  min-h-screen">
      <From />
      <UserList />
    </main>
  );
};

export default LoginPage;
