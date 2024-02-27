"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Icons = void 0;
var utils_1 = require("../lib/utils");
var EmptyCartIcon_1 = __importDefault(require("./icons/EmptyCartIcon"));
var EmailSentSVG_1 = __importDefault(require("./icons/EmailSentSVG"));
var VSignSVG_1 = __importDefault(require("./icons/VSignSVG"));
var NotFoundSVG_1 = __importDefault(require("./icons/NotFoundSVG"));
var ThankYouPageSVG_1 = __importDefault(require("./icons/ThankYouPageSVG"));
var react_1 = __importDefault(require("react"));
exports.Icons = {
    logo: function () {
        return (react_1.default.createElement("h1", { className: (0, utils_1.cn)("font-bold text-xl xl:text-2xl") },
            "Digital ",
            react_1.default.createElement("span", { className: "text-primary" }, "Merchant")));
    },
    emptyCart: function () {
        return react_1.default.createElement(EmptyCartIcon_1.default, null);
    },
    emailSent: function () {
        return react_1.default.createElement(EmailSentSVG_1.default, null);
    },
    vSign: function () {
        return react_1.default.createElement(VSignSVG_1.default, null);
    },
    notFound: function () {
        return react_1.default.createElement(NotFoundSVG_1.default, null);
    },
    thankYou: function () {
        return react_1.default.createElement(ThankYouPageSVG_1.default, null);
    },
};
