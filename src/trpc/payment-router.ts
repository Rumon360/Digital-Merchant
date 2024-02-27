import { z } from "zod";
import { privateProcedure, router } from "./trpc";
import { TRPCError } from "@trpc/server";
import { getPayloadClient } from "../get-payload";
import { v4 as uuidv4 } from "uuid";

const DataSchema = z.object({
  cus_name: z.string(),
  cus_phone: z.string(),
  productIds: z.array(z.string()),
});

export const paymentRouter = router({
  createPayment: privateProcedure
    .input(DataSchema)
    .mutation(async ({ ctx, input }) => {
      const { user } = ctx;
      const { productIds, cus_name, cus_phone } = input;

      const fee = 10;

      if (productIds.length === 0) {
        throw new TRPCError({ code: "BAD_REQUEST" });
      }

      const payload = await getPayloadClient();

      const { docs: products } = await payload.find({
        collection: "products",
        where: {
          id: {
            in: productIds,
          },
        },
      });

      const total = products.reduce(
        (total, product) => product.price + total,
        0
      );

      const amount = total + fee;

      const order = await payload.create({
        collection: "orders",
        data: {
          _isPaid: false,
          user: user.id,
          products: products.map((prod) => prod.id),
        },
      });

      try {
        const formData = {
          cus_name,
          cus_email: user.email,
          cus_phone,
          amount: amount.toFixed(2),
          tran_id: uuidv4(),
          signature_key: "dbb74894e82415a2f7ff0ec3a97e4183",
          store_id: "aamarpaytest",
          currency: "BDT",
          desc: "dest",
          cus_country: "Bangladesh",
          success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/payment_check/${order.id}`,
          fail_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/cart`,
          cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/cart`,
          type: "json",
        };

        const data = await fetch("https://sandbox.aamarpay.com/jsonpost.php", {
          method: "POST",
          body: JSON.stringify(formData),
        }).then((response) => response.json());

        return { url: data.payment_url };
      } catch (error) {
        console.log("data", error);

        return { url: null };
      }
    }),
});
