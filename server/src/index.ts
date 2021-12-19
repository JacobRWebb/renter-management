// Express Server with cors and body-parser middleware hosted on port 5000 and routes
import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import { createServer } from "http";

const app = express();
const server = createServer(app);

const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("*", (_req, res) => {
  res.send("API Endpoint");
});

server.listen(port, () => {
  console.log(`Server listening on port http://localhost:${port}`);
});
