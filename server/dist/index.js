"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const routes_1 = __importDefault(require("./routes"));
const prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
const server = (0, http_1.createServer)(app);
const port = process.env.PORT || 5000;
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use("/", routes_1.default);
const main = async () => {
    server.listen(port, () => {
        console.log(`Server listening on port http://localhost:${port}`);
    });
};
main()
    .catch((e) => {
    throw e;
})
    .finally(() => {
    prisma.$disconnect();
});
//# sourceMappingURL=index.js.map