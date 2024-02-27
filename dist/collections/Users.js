"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
exports.Users = {
    slug: "users",
    auth: {
        verify: {
            generateEmailHTML: function (_a) {
                var token = _a.token;
                return "<a target=\"_blank\" href='".concat(process.env.NEXT_PUBLIC_SERVER_URL, "/verify-email?token=").concat(token, "'>Verify Account</a>");
            },
        },
    },
    access: { read: function () { return true; }, create: function () { return true; } },
    fields: [
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
            defaultValue: 0,
            required: false,
        },
        {
            name: "withdrawAmount",
            type: "number",
            defaultValue: 0,
            required: false,
        },
        {
            name: "transationHistory",
            type: "array",
            fields: [
                { name: "amount", type: "number" },
                { name: "transactionId", type: "text" },
            ],
            required: false,
        },
    ],
};
