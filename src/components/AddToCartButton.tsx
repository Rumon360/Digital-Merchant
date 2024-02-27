"use client";

import { Product } from "../payload-types";
import React, { FC } from "react";
import { Button } from "./ui/button";
import useCart from "@/hooks/use-cart";

interface AddToCartButtonProps {
  product: Product;
}

const AddToCartButton: FC<AddToCartButtonProps> = ({ product }) => {
  const { addItem, items } = useCart();

  const isAdded = items.find((item) => item.product.id === product.id)
    ? true
    : false;

  return (
    <Button
      disabled={isAdded}
      onClick={() => {
        addItem(product);
      }}
      className="w-full"
    >
      {isAdded ? "Added!" : "Add to cart"}
    </Button>
  );
};

export default AddToCartButton;
