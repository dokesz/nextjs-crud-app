"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  const { data: session, status } = useSession();
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [providers, setProviders] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const cachedProviders = JSON.parse(localStorage.getItem("provider"));
      if (cachedProviders) {
        setProviders(cachedProviders);
        setLoading(false);
      } else {
        getProviders().then((res) => {
          localStorage.setItem("provider", JSON.stringify(res));
          setProviders(res);
          setLoading(false);
        });
      }
    }
  }, []);

  if (status === "loading" || loading) return <p>Loading...</p>;

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">Prompt</p>
      </Link>

      <div className="md:flex hidden">
        {status === "authenticated" && (
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
        )}
        {status === "unauthenticated" && providers && (
          <button
            type="button"
            onClick={() => {
              signIn(providers?.google.id);
            }}
            className="black_btn"
          >
            Sign in with Google
          </button>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden flex relative">
        {status === "authenticated" && (
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
        )}
        {status === "unauthenticated" && providers && (
          <button
            type="button"
            onClick={() => {
              signIn(providers?.google.id);
            }}
            className="black_btn"
          >
            Sign in with Google
          </button>
        )}
      </div>
    </nav>
  );
};

export default Nav;
