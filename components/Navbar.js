import React from "react";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/client";

const Navbar = () => {
  const [session] = useSession();

  return (
    <div className="flex flex-col">
      <div className="w-full h-14 bg-blue-800 flex justify-start items-center">
        <h1 className="text-xl md:text-3xl">Micro-Blog</h1>
      </div>
      {/* button */}
      <div className="flex flex-row justify-center items-center w-full h-9 my-3">
        {session ? (
          //   display the details along with logout button
          <div className="flex flex-row w-full bg-jet h-14 justify-center items-center p-3">
            {/*user image */}
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            {/*user name */}
            <div>
              <h3 className="ml-2 text-lg md:text-xl">{session?.user.name}</h3>
            </div>
            {/*log out */}
            <div className="ml-auto w-1/4 ">
              <Link href="/api/auth/signout" passHref>
                <button
                  className="w-full h-7 bg-red-600 rounded focus:ring-4 focus:ring-red-500 focus:ring-opacity-50 md:text-lg md:h-10"
                  onClick={() => signOut()}
                >
                  LOGOUT
                </button>
              </Link>
            </div>
          </div>
        ) : (
          //sign in
          <div className="w-full">
            <Link href="/api/auth/signin" passHref>
              <button
                onClick={() => signIn()}
                className="w-full h-9 bg-blue-600 rounded focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 md:text-xl md:h-11"
              >
                SIGN IN
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
