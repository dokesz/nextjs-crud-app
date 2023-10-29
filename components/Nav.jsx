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

      {(status === "loading" || loading) ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="md:flex hidden">
            {status === "authenticated" && (
              <div className="flex gap-3 md:gap-5">
                {/* Authenticated user options here... */}
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
                {/* Mobile authenticated user options here... */}
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
        </>
      )}
    </nav>
  );
};

export default Nav;
