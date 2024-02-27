import express from "express";
import { getPayloadClient } from "./get-payload";
import { nextApp, nextHandler } from "./next-utils";
import * as trpcExpress from "@trpc/server/adapters/express";
import { appRouter } from "./trpc";
import { inferAsyncReturnType } from "@trpc/server";
import nodemailer from "nodemailer";
import { Product } from "./payload-types";
import { ReceiptEmailHtml } from "./components/ReceiptEmailHtml";
import nextBuild from "next/dist/build";
import path from "path";
import { PayloadRequest } from "payload/types";
import { parse } from "url";

const app = express();
const PORT = Number(process.env.PORT) || 3000;

const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({ req, res });

export type ExpressContext = inferAsyncReturnType<typeof createContext>;

const start = async () => {
  const payload = await getPayloadClient({
    initOptions: {
      express: app,
      onInit: async (cms) => {
        cms.logger.info(`Admin URL ${cms.getAdminURL()}`);
      },
    },
  });

  const cartRouter = express.Router();

  cartRouter.use(payload.authenticate);

  cartRouter.get("/", (req, res) => {
    const request = req as PayloadRequest;

    if (!request.user) return res.redirect("/sign-in?origin=cart");

    const parsedUrl = parse(req.url, true);

    return nextApp.render(req, res, "/cart", parsedUrl.query);
  });

  app.use("/cart", cartRouter);

  if (process.env.NEXT_BUILD) {
    app.listen(PORT, async () => {
      payload.logger.info("Next.js is building for production");

      // @ts-expect-error
      await nextBuild(path.join(__dirname, "../"));

      process.exit();
    });

    return;
  }

  app.use(
    `/api/trpc`,
    trpcExpress.createExpressMiddleware({ router: appRouter, createContext })
  );

  app.post("/api/payment_check/:orderId", async (req, res) => {
    if (req.body.pay_status === "Successful") {
      const payload = await getPayloadClient();
      const { orderId } = req.params;
      const { docs: updatedOrder } = await payload.update({
        depth: 2,
        collection: "orders",
        data: {
          _isPaid: true,
          transactionId: req.body.pg_txnid,
        },
        where: { id: { equals: orderId } },
      });

      // send email

      const { SMTP_EMAIL, SMTP_PASSWORD } = process.env;

      const transporter = nodemailer.createTransport({
        service: "gmail",
        secure: true,
        port: 465,
        auth: { user: SMTP_EMAIL, pass: SMTP_PASSWORD },
      });

      const mailOptions = {
        fromAddress: "hmk.rumon@gmail.com",
        fromName: "Software Patron",
        to: req.body.cus_email,
        subject: "Thanks for your order! This is your receipt.",
        html: ReceiptEmailHtml({
          date: new Date(),
          email: req.body.cus_email,
          orderId,
          products: updatedOrder[0].products as Product[],
        }),
      };

      await transporter.sendMail(mailOptions);

      res.redirect(`/thank-you/?orderId=${orderId}`);
    } else {
      res.redirect(`/failed`);
    }
  });

  app.use((req, res) => nextHandler(req, res));

  nextApp.prepare().then(() => {
    payload.logger.info(`Next js started`);
    app.listen(PORT, async () => {
      payload.logger.info(`Next.JS URL: ${process.env.NEXT_PUBLIC_SERVER_URL}`);
    });
  });
};

start();
