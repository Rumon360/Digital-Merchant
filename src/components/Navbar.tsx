import Link from "next/link";
import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Icons } from "./Icons";
import NavItems from "./NavItems";
import SearchBar from "./SearchBar";
import { buttonVariants } from "./ui/button";
import Cart from "./Cart";
import { getServerSideUser } from "../lib/payload-utils";
import { cookies } from "next/headers";
import UserAccountNav from "./UserAccountNav";
import MobileNav from "./MobileNav";

const Navbar = async () => {
  const nextCookies = cookies();
  const { user } = await getServerSideUser(nextCookies);

  return (
    <div className="bg-white sticky z-50 top-0 inset-x-0 h-16">
      <header className="relative bg-white w-full">
        <MaxWidthWrapper>
          <div className="border-b border-gray-200">
            <div className="flex justify-between w-full h-16 items-center">
              <div className="ml-4 flex lg:ml-0 text-nowrap">
                <Link href="/">
                  <Icons.logo />
                </Link>
              </div>

              <div className="relative flex flex-1 justify-end mr-auto items-center gap-4 z-40 lg:hidden">
                <MobileNav />
                <Cart />
              </div>

              <div className="hidden z-50 lg:ml-2 xl:ml-8 lg:flex lg:self-stretch">
                <NavItems />
              </div>

              <div className="ml-auto">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-2">
                  <SearchBar />
                  {user ? null : (
                    <Link
                      href={"/sign-in"}
                      className={buttonVariants({
                        variant: "ghost",
                        className: "text-sm",
                      })}
                    >
                      Sign In
                    </Link>
                  )}
                  {user ? null : (
                    <span
                      className="h-6 w-px bg-zinc-200"
                      aria-hidden="true"
                    ></span>
                  )}
                  {user ? (
                    <UserAccountNav user={user} />
                  ) : (
                    <Link
                      href={"/sign-up"}
                      className={buttonVariants({
                        variant: "ghost",
                        className: "text-sm",
                      })}
                    >
                      Create account
                    </Link>
                  )}
                  {user ? (
                    <span
                      className="h-6 w-px bg-zinc-200"
                      aria-hidden="true"
                    ></span>
                  ) : null}
                  {user ? null : (
                    <div className="flex lg:ml-6">
                      <span
                        className="h-6 w-px bg-zinc-200"
                        aria-hidden="true"
                      ></span>
                    </div>
                  )}
                  <div className="ml-4 flow-root lg:ml-6">
                    <Cart />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </header>
    </div>
  );
};

export default Navbar;
