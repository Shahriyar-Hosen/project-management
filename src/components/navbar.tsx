"use client";

import { useStores } from "@/stores/provider";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

export const Navbar = () => {
  const { user, logout } = useStores((state) => state);
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<IUser>();
  const { name = "User Name", avatar = "/logo.png" } = userInfo || {};

  useEffect(() => {
    user && setUserInfo(user);
  }, [user]);

  const filterBySearch = (value: string) => {
    console.log(value);
  };

  const debounce = (fn: (value: string) => void, delay: number) => {
    let timeoutId: NodeJS.Timeout | number | undefined;

    return (e: FormEvent) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        fn((e.target as HTMLInputElement).value);
      }, delay);
    };
  };

  const handleSearch = debounce((value) => filterBySearch(value), 500);

  const handleLogout = () => {
    logout();
    router.push("/login");
    localStorage.clear();
  };

  return (
    <div className="flex items-center justify-between py-3 px-10 bg-white bg-opacity-75">
      <div className="flex items-center">
        <Image
          src="/logo.png"
          width={40}
          height={40}
          alt="logo"
          className="h-10 w-10"
        />

        <input
          className={
            "flex items-center h-10 px-4 ml-10 text-sm bg-gray-200 transition delay-75  ease-in-out translate-x-0 rounded-full focus:outline-none focus:ring focus:ring-violet-300"
          }
          type="search"
          placeholder="Search for anything…"
          onChange={handleSearch}
        />
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={handleLogout}
          className="flex gap-3 items-center py-2 px-4 transition delay-75 ease-in-out hover:bg-violet-200 font-semibold hover:text-violet-800 rounded-lg"
        >
          <FontAwesomeIcon icon={faRightToBracket} />
          <span>Logout</span>
        </button>

        <div className="flex items-center gap-3 py-1 px-3 transition delay-75 ease-in-out rounded-lg hover:bg-violet-200 hover:text-violet-800 cursor-pointer">
          <span className="font-semibold text-gray-600 normal-case">
            {name}
          </span>

          <Image
            className="w-8 rounded-full"
            width={30}
            height={30}
            src={avatar}
            alt={name}
          />
        </div>
      </div>
    </div>
  );
};
