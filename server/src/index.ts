import { PrismaClient } from "@prisma/client";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { createServer } from "http";
import routes from "./routes";
import { seedUser } from "./util/seedUser";

const prisma = new PrismaClient();
const app = express();
const server = createServer(app);
const port = process.env.PORT || 5000;

let domain =
  process.env.NODE_ENV === "production"
    ? "https://www.xodius.io"
    : `http://localhost:3000`;
app.use(
  cors({
    credentials: true,
    origin: domain,
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/", routes);

const main = async () => {
  await seedUser();

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
