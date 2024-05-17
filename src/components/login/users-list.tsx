"use client";

import { cn } from "@/lib/utils";
import { faInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, useState } from "react";

export const UserList = () => {
  const [coppedText, setCoppedText] = useState("");

  const userEmails = [
    "shahriyar@hosen.com",
    "salman@gmail.com",
    "saikot@gmail.com",
  ];

  const copyToClipboard = (text: string) => {
    try {
      navigator.clipboard.writeText(text);
      setCoppedText(text);
    } catch (err) {
      setCoppedText("");
      console.error("Failed to copy: ", err);
    }
  };

  const EmailBox: FC<{ email: string }> = ({ email }) => (
    <li
      onClick={() => copyToClipboard(email)}
      className={cn(
        "flex items-center gap-1 py-1 px-2 rounded-lg hover:bg-gray-100 cursor-pointer",
        coppedText === email && "bg-green-300/50 hover:bg-green-300/80"
      )}
    >
      <span className="font-semibold">Email:</span>
      <span>{email}</span>
    </li>
  );

  return (
    <section className="sm:min-h-[450px] min-w-[325px] bg-white/80 flex items-center justify-center rounded-lg shadow-lg py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-left space-y-8">
        <div className="rounded-md -space-y-px">
          <div className="flex justify-between items-center px-2">
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
          <h5 className="text-center text-sm text-green-500 pt-2 pb-3">
            Click to add to clipboard
          </h5>
          <ul>
            {userEmails.map((userEmail) => (
              <EmailBox key={userEmail} email={userEmail} />
            ))}

            <li
              onClick={() => copyToClipboard("123456")}
              className={cn(
                "flex items-center gap-1 py-1 px-2 rounded-lg hover:bg-gray-100 cursor-pointer",
                coppedText === "123456" &&
                  "bg-green-300/50 hover:bg-green-300/80"
              )}
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
