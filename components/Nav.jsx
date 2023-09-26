import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

// Desktop Navigation Component
const DesktopNav = ({ session, providers }) => {
  return (
    <div className="flex gap-3 md:gap-5">
      <Link href="/create-prompt">
        <a className="black_btn">Create Post</a>
      </Link>

      <button type="button" onClick={signOut} className="outline_btn">
        Sign Out
      </button>

      <Link href="/profile">
        <a>
          <Image
            src={session?.user?.image}
            width={37}
            height={37}
            className="rounded-full"
            alt="profile"
          />
        </a>
      </Link>
    </div>
  );
};

// Mobile Navigation Component
const MobileNav = ({ session, providers, toggleDropdown, setToggleDropdown }) => {
  return (
    <div className="flex">
      <Image
        src={session?.user?.image}
        width={37}
        height={37}
        className="rounded-full cursor-pointer"
        alt="profile"
        onClick={() => setToggleDropdown((prev) => !prev)}
      />

      {toggleDropdown && (
        <div className="dropdown">
          <Link href="/profile" className="dropdown_link">
            My Profile
          </Link>
          <Link href="/create-prompt" className="dropdown_link">
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
  );
};

const Nav = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    setUpProviders();
  }, []);

  const isAuthenticated = !!session?.user;

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="Prompt logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">Prompts</p>
      </Link>

      {/* Desktop navigation */}
      <div className="sm:flex hidden">
        {isAuthenticated ? (
          <DesktopNav session={session} providers={providers} />
        ) : (
          providers &&
          Object.values(providers).map((provider) => (
            <button
              key={provider.name}
              type="button"
              onClick={() => signIn(provider.id)}
              className="black_btn"
            >
              Sign In
            </button>
          ))
        )}
      </div>

      {/* Mobile navigation */}
      <div className="sm:hidden flex relative">
        {isAuthenticated ? (
          <MobileNav
            session={session}
            providers={providers}
            toggleDropdown={toggleDropdown}
            setToggleDropdown={setToggleDropdown}
          />
        ) : (
          providers &&
          Object.values(providers).map((provider) => (
            <button
              key={provider.name}
              type="button"
              onClick={() => signIn(provider.id)}
              className="black_btn"
            >
              Sign In
            </button>
          ))
        )}
      </div>
    </nav>
  );
};

export default Nav;
