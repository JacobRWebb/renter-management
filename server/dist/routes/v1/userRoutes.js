"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get("/", (_req, res) => {
    res.send("User Endpoint");
});
exports.default = router;
//# sourceMappingURL=userRoutes.js.map