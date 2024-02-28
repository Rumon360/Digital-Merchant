import { PRODUCT_CATEGORIES } from "../../config";
import { Access, CollectionConfig } from "payload/types";

import { Product, User } from "../../payload-types";
import { BeforeChangeHook } from "payload/dist/collections/config/types";

const addUser: BeforeChangeHook<Product> = async ({ req, data, operation }) => {
  const user = req.user;
  if (operation === "create") {
    return { ...data, user: user.id };
  } else {
    return { ...data };
  }
};

const isAdminOrHasAccess: Access = async ({ req }) => {
  const user = req.user as User | null;

  if (user?.role === "admin") return true;
  if (!user) return false;

  const { docs: products } = await req.payload.find({
    collection: "products",
    depth: 0,
    where: {
      user: {
        equals: user.id,
      },
    },
  });

  const productIds = products.map((prod) => prod.id).flat();

  return {
    id: {
      in: [...productIds],
    },
  };
};

export const Products: CollectionConfig = {
  slug: "products",
  admin: {
    useAsTitle: "name",
  },
  access: {
    read: isAdminOrHasAccess,
    update: isAdminOrHasAccess,
    delete: isAdminOrHasAccess,
  },
  hooks: { beforeChange: [addUser] },
  fields: [
    {
      name: "user",
      type: "relationship",
      relationTo: "users",
      required: true,
      hasMany: false,
      admin: {
        condition: () => false,
      },
    },
    {
      name: "name",
      label: "Name",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "richText",
      label: "Product Details",
    },
    {
      name: "price",
      label: "Price in BDT",
      min: 10,
      max: 20000,
      type: "number",
      required: true,
    },
    {
      name: "category",
      label: "Category",
      type: "select",
      options: PRODUCT_CATEGORIES.map(({ label, value }) => ({ label, value })),
      required: true,
    },
    {
      name: "product_files",
      label: "Product File(s)",
      type: "relationship",
      required: true,
      relationTo: "product_files",
      hasMany: false,
    },
    {
      name: "approvedForSales",
      label: "Approved Status",
      type: "select",
      defaultValue: "pending",
      options: [
        { label: "pending verification", value: "pending" },
        { label: "Approved", value: "approved" },
        { label: "Denied", value: "denied" },
      ],
      access: {
        create: ({ req }) => req.user.role === "admin",
        read: () => {
          return true;
        },
        update: ({ req }) => req.user.role === "admin",
      },
    },
    {
      name: "priceId",
      access: {
        create: () => false,
        read: () => false,
        update: () => false,
      },
      type: "text",
      admin: {
        hidden: true,
      },
    },
    {
      name: "images",
      type: "array",
      label: "Product Images",
      minRows: 1,
      maxRows: 4,
      required: true,
      labels: {
        singular: "Image",
        plural: "Images",
      },
      fields: [
        { name: "image", type: "upload", relationTo: "media", required: true },
      ],
    },
  ],
};
