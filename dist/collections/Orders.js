"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Orders = void 0;
var yourOwn = function (_a) {
    var user = _a.req.user;
    if (user.role === "admin") {
        return true;
    }
    return {
        user: {
            equals: user.id,
        },
    };
};
exports.Orders = {
    slug: "orders",
    admin: {
        useAsTitle: "Your Orders",
        description: "A summary of all the orders you've placed on DevCart",
    },
    access: {
        read: yourOwn,
        update: function (_a) {
            var _b;
            var req = _a.req;
            return ((_b = req.user) === null || _b === void 0 ? void 0 : _b.role) === "admin";
        },
        delete: function (_a) {
            var _b;
            var req = _a.req;
            return ((_b = req.user) === null || _b === void 0 ? void 0 : _b.role) === "admin";
        },
        create: function (_a) {
            var _b;
            var req = _a.req;
            return ((_b = req.user) === null || _b === void 0 ? void 0 : _b.role) === "admin";
        },
    },
    fields: [
        {
            name: "_paid",
            type: "checkbox",
            access: {
                read: function (_a) {
                    var _b;
                    var req = _a.req;
                    return ((_b = req.user) === null || _b === void 0 ? void 0 : _b.role) === "admin";
                },
                create: function () { return false; },
                update: function () { return false; },
            },
            admin: {
                hidden: true,
            },
            required: true,
        },
        {
            name: "user",
            type: "relationship",
            relationTo: "users",
            admin: {
                hidden: true,
            },
            required: true,
        },
        {
            name: "products",
            type: "relationship",
            relationTo: "products",
            required: true,
            hasMany: true,
        },
    ],
};
