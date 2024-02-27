import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProductReel from "@/components/ProductReel";
import { Button } from "@/components/ui/button";
import { ArrowDownToLine, CheckCircle, Leaf } from "lucide-react";
import Link from "next/link";
import React from "react";

const perks = [
  {
    name: "Instant Access",
    Icon: ArrowDownToLine,
    description:
      "Receive your assets directly to your inbox within seconds for instant download.",
  },
  {
    name: "Quality Assurance",
    Icon: CheckCircle,
    description:
      "Every asset on our platform undergoes rigorous verification by our team to meet our highest standards. Not satisfied? Enjoy a 30-day refund guarantee.",
  },
  {
    name: "Eco-Friendly Initiative",
    Icon: Leaf,
    description:
      "Join us in our commitment to the planet – we pledge 1% of our sales towards environmental preservation and restoration efforts.",
  },
];

export default function Home() {
  return (
    <>
      <MaxWidthWrapper>
        <div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Your Destination for Premium Quality{" "}
            <span className="text-primary">Digital Assets</span>
          </h1>
          <p className="mt-6 text-lg max-w-prose text-muted-foreground">
            Welcome to Digi Merchant: Where every asset is varified by our team
            to ensure the best quality.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Link href={"/products"}>
              <Button variant={"default"}>Browse Trending</Button>
            </Link>
            <Button variant={"ghost"}>Our Commitment to Quality &rarr;</Button>
          </div>
        </div>
        <ProductReel
          href="/products"
          title="Brand New"
          query={{ sort: "desc", limit: 4 }}
        />
      </MaxWidthWrapper>
      <section className="border-t border-zinc-200 bg-zinc-50">
        <MaxWidthWrapper className="py-20">
          <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0">
            {perks.map((perk) => (
              <div
                key={perk.name}
                className="text-center md:flex md:items-start md:text-left lg:block lg:text-center"
              >
                <div className="md:flex-shrink-0 flex justify-center">
                  <div className="h-16 w-16 flex items-center justify-center rounded-full bg-accent text-primary">
                    {<perk.Icon className="w-1/3 h-1/3" />}
                  </div>
                </div>

                <div className="mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6">
                  <h3 className="text-base font-medium">{perk.name}</h3>
                  <p className="mt-3 text-sm text-muted-foreground">
                    {perk.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </MaxWidthWrapper>
      </section>
    </>
  );
}
