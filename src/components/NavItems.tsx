"use client";

import { PRODUCT_CATEGORIES } from "@/config";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const NavItems = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {PRODUCT_CATEGORIES.map((cat, index) => (
          <NavigationMenuItem key={index}>
            <NavigationMenuTrigger className="text-sm">
              {cat.label}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="w-[60vw] text-sm text-muted-foreground">
                <div className="relative bg-white">
                  <div className="mx-auto max-w-7xl px-8">
                    <div className="grid grid-cols-4 gap-x-8 gap-y-10 py-8">
                      <div className="col-span-4 col-start-1 grid grid-cols-3 gap-x-8">
                        {cat.featured.map((item) => (
                          <div
                            key={item.name}
                            className="group relative text-base sm:text-sm"
                          >
                            <div className="relative aspect-video overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                              <Image
                                src={item.imageSrc}
                                alt="product category image"
                                fill
                                className="object-cover object-center"
                              />
                            </div>

                            <Link
                              href={item.href}
                              className="mt-6 block font-medium text-gray-900"
                            >
                              {item.name}
                            </Link>
                            <p className="mt-1" aria-hidden="true">
                              Shop now
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default NavItems;
