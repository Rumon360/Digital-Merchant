import { PrimaryActionEmailHtml } from "../components/PrimaryActionEmail";
import { Access, CollectionConfig } from "payload/types";

const adminsAndUser: Access = ({ req: { user } }) => {
  if (user.role === "admin") return true;
  return {
    id: {
      equals: user.id,
    },
  };
};

export const Users: CollectionConfig = {
  slug: "users",
  auth: {
    verify: {
      generateEmailHTML: ({ token }) => {
        return PrimaryActionEmailHtml({
          actionLabel: "Verify your account",
          buttonText: "Verify Account",
          href: `${process.env.NEXT_PUBLIC_SERVER_URL}/verify-email?token=${token}`,
        });
      },
    },
  },
  access: {
    read: adminsAndUser,
    create: () => true,
    update: ({ req }) => req.user.role === "admin",
    delete: ({ req }) => req.user.role === "admin",
  },
  admin: {
    hidden: ({ user }) => user.role !== "admin",
    defaultColumns: ["id"],
  },
  fields: [
    {
      name: "products",
      label: "Products",
      admin: {
        condition: () => false,
      },
      type: "relationship",
      relationTo: "products",
      hasMany: true,
    },
    {
      name: "product_files",
      label: "Product Files",
      admin: {
        condition: () => false,
      },
      type: "relationship",
      relationTo: "product_files",
      hasMany: true,
    },
    {
      name: "role",
      type: "select",
      defaultValue: "user",
      required: true,
      options: [
        { label: "Admin", value: "admin" },
        { label: "User", value: "user" },
      ],
    },
    {
      name: "earnings",
      type: "number",
      label: "Earnings",
      defaultValue: 0,
      required: false,
    },
    {
      name: "withdrawAmount",
      label: "Withdraw Amount",
      type: "number",
      defaultValue: 0,
      required: false,
    },
    {
      name: "transationHistory",
      label: "Transaction History",
      type: "array",
      fields: [
        { name: "amount", type: "number" },
        { name: "transactionId", type: "text" },
      ],
      required: false,
    },
  ],
};
