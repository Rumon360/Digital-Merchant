import { Icons } from "@/components/Icons";
import VerifyEmail from "@/components/VerifyEmail";
import React from "react";

interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

function Page({ searchParams }: PageProps) {
  const token = searchParams.token;
  const toEmail = searchParams.to;

  return (
    <div className="container relative flex pt-20 flex-col justify-center items-center lg:px-0">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        {token && typeof token === "string" ? (
          <div className="grid gap-6">
            <VerifyEmail token={token} />
          </div>
        ) : (
          <div className="flex h-full flex-col items-center justify-center space-y-1">
            <div className="relative h-60 w-60 flex justify-center items-center text-muted-foreground">
              <Icons.emailSent />
            </div>
            <h3 className="font-semibold mb-1 text-2xl">Check your email</h3>
            {toEmail ? (
              <p className="text-center text-muted-foreground">
                We&apos;ve sent a verification link to{" "}
                <span className="font-semibold">{toEmail}</span>
              </p>
            ) : (
              <p className="text-center text-muted-foreground">
                We&apos;ve sent a verification link to your email
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Page;
