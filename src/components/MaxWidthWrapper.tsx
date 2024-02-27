import { cn } from "@/lib/utils";
import { FC, ReactNode } from "react";
import React from "react";

interface MaxWidthWrapperProps {
  className?: string;
  children: ReactNode;
}

const MaxWidthWrapper: FC<MaxWidthWrapperProps> = ({ className, children }) => {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-screen-xl px-2.5 lg:px-8 xl:px-16",
        className
      )}
    >
      {children}
    </div>
  );
};

export default MaxWidthWrapper;
