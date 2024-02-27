"use client";

import { PRODUCT_CATEGORIES } from "@/config";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { ScrollArea } from "./ui/scroll-area";
import { buttonVariants } from "./ui/button";
import SearchBar from "./SearchBar";

const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="h-6 w-6" aria-hidden="true" />
      </SheetTrigger>
      <SheetContent className="flex flex-col justify-center pr-0 sm:max-w-lg">
        <ScrollArea className="pr-4">
          <div className="pt-6">
            <SearchBar />
          </div>

          <ul>
            {PRODUCT_CATEGORIES.map((category) => (
              <li key={category.label} className="space-y-6 px-4 pb-8 pt-6">
                <div className="border-b border-gray-200">
                  <div className="-mb-px flex">
                    <p className="border-transparent text-gray-900 flex-1 whitespace-nowrap border-b-2 py-2 text-base font-medium">
                      {category.label}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-y-10 gap-x-4">
                  {category.featured.map((item) => (
                    <div key={item.name} className="group relative text-sm">
                      <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                        <Image
                          fill
                          src={item.imageSrc}
                          alt="product category image"
                          className="object-cover object-center"
                        />
                      </div>
                      <Link
                        href={item.href}
                        className="mt-6 block font-medium text-gray-900"
                      >
                        {item.name}
                      </Link>
                    </div>
                  ))}
                </div>
              </li>
            ))}
          </ul>
          <div className="space-y-2 border-t border-gray-200 px-4 py-6">
            <div className="flow-root">
              <Link
                href="/sign-in"
                className={buttonVariants({
                  variant: "link",
                  className: '"-m-2 block p-2 font-medium text-gray-900"',
                })}
              >
                Sign in
              </Link>
            </div>
            <div className="flow-root">
              <Link
                href="/sign-up"
                className={buttonVariants({
                  variant: "link",
                  className: '"-m-2 block p-2 font-medium text-gray-900"',
                })}
              >
                Sign up
              </Link>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
