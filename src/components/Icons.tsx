import { cn } from "../lib/utils";
import EmptyCartIcon from "./icons/EmptyCartIcon";
import EmailSentSVG from "./icons/EmailSentSVG";
import VSignSVG from "./icons/VSignSVG";
import NotFoundSVG from "./icons/NotFoundSVG";
import ThankYouPageSVG from "./icons/ThankYouPageSVG";
import React from "react";

export const Icons = {
  logo: () => {
    return (
      <h1 className={cn("font-bold text-xl xl:text-2xl")}>
        Digital <span className="text-primary">Merchant</span>
      </h1>
    );
  },
  emptyCart: () => {
    return <EmptyCartIcon />;
  },
  emailSent: () => {
    return <EmailSentSVG />;
  },
  vSign: () => {
    return <VSignSVG />;
  },
  notFound: () => {
    return <NotFoundSVG />;
  },
  thankYou: () => {
    return <ThankYouPageSVG />;
  },
};
