"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userRoutes_1 = __importDefault(require("./userRoutes"));
const router = (0, express_1.Router)();
router.use("/user", userRoutes_1.default);
router.get("/", (_req, res) => {
    res.send("Api Endpoint v1");
});
exports.default = router;
//# sourceMappingURL=index.js.map