"use client"
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

const Nav = () => {
  const { data: session, status } = useSession();
  const [toggleDropdown, setToggleDropdown] = useState(false);

  return (
    <nav className="flex justify-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 items-center">
        <Image
          src="/assets/images/logo.svg"
          alt="logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">Prompt</p>
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex">
        {status === "authenticated" ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>
            <button type="button" onClick={signOut} className="outline_btn">
              Sign Out
            </button>
            <Link href="/profile">
              <Image
                src={session?.user.image}
                width={37}
                height={37}
                className="rounded-full"
                alt="profile"
              />
            </Link>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => signIn("google")}
            className={`btn-black ${status === "loading" ? "opacity-50 cursor-not-allowed black_btn" : "black_btn"}`}
            disabled={status === "loading"}
          >
            Sign in with Google
          </button>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="flex md:hidden relative">
        {status === "authenticated" ? (
          <div className="flex">
            <Image
              src={session?.user.image}
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"
              onClick={() => setToggleDropdown(!toggleDropdown)}
            />
            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className="mt-5 w-full black_btn"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            type="button"
            onClick={() => signIn("google")}
            className={`btn-black ${status === "loading" ? "opacity-50 cursor-not-allowed black_btn" : "black_btn"}`}
            disabled={status === "loading"}
          >
            Sign in with Google
          </button>
        )}
      </div>
    </nav>
  );
};

export default Nav;