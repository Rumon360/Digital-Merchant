import { Icons } from "@/components/Icons";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
      <div className="flex w-full h-full flex-col justify-center items-center">
        <div className="relative mb-4 h-80 w-80 text-muted-foreground">
          <Icons.notFound />
        </div>
        <h2 className="font-semibold text-xl">Not Found</h2>
        <p className="text-muted-foreground text-sm">
          Could not find requested resource
        </p>
        <Link href="/" className={buttonVariants({ variant: "link" })}>
          Return Home
        </Link>
      </div>
    </div>
  );
}
