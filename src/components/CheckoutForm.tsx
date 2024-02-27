"use client";

import React from "react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";

const CheckoutValidator = z.object({
  name: z.string().min(1),
  number: z.string().regex(/^(?:\+?88)?01[3-9]\d{8}$/),
});

type TCheckoutValidator = z.infer<typeof CheckoutValidator>;

function CheckoutForm({
  isLoading,
  createCheckOut,
  itemsLength,
  productIds,
}: {
  isLoading: boolean;
  productIds: string[];
  createCheckOut: ({}: {
    cus_name: string;
    cus_phone: string;
    productIds: string[];
  }) => void;
  itemsLength: number;
}) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<TCheckoutValidator>({
    resolver: zodResolver(CheckoutValidator),
  });

  const onSubmit = ({ name, number }: TCheckoutValidator) => {
    createCheckOut({
      cus_name: name,
      cus_phone: number,
      productIds: productIds,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-1 py-2">
        <Label htmlFor="email">Name</Label>
        <Input
          {...register("name")}
          placeholder="Give us your name"
          type="text"
          className={cn({
            "focus-visible:ring-red-500": errors.name,
          })}
        />
        {errors.name && (
          <p className="text-sm text-red-500" role="alert">
            {errors.name.message}
          </p>
        )}
      </div>
      <div className="grid gap-1 py-2">
        <Label htmlFor="number">Phone Number</Label>
        <Input
          {...register("number")}
          placeholder="+8801*********"
          type="text"
          className={cn({
            "focus-visible:ring-red-500": errors.number,
          })}
        />
        {errors.number && (
          <p className="text-sm text-red-500" role="alert">
            {errors.number.message}
          </p>
        )}
      </div>
      <Button
        disabled={isLoading || itemsLength === 0}
        className="w-full mt-1"
        size="lg"
      >
        {isLoading ? <Loader2 className="animate-spin" /> : "Pay now"}
      </Button>
    </form>
  );
}

export default CheckoutForm;
