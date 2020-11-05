import logger from "./config/winston";
import express from "express";
import { csvWriter } from "./service/csv";
import cors from "cors";
import { HOST, PORT, NODE_ENV, APP_NAME } from "./config/config";
const app = express();

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/alive", (req, res) => {
  res.status(200).send(`Alive at ${Date.now()}`);
  logger.debug(`${APP_NAME} is alive.`);
});

app.post("/csv", async (req, res) => {
  try {
    const writer = await csvWriter("test.csv", Object.keys(req.body[0]));
    await writer.writeRecords(req.body);
    res.status(200).send(`CSV written at ${Date.now()}`);
  } catch (e) {
    res.status(503).send(e);
    logger.error(e);
  }
});

app.use("*", (req, res) => {
  return res.status(404).json({ message: `${APP_NAME}: Path not found` });
});

app.listen(PORT, HOST, () => {
  logger.info(`${APP_NAME} listening on port ${PORT} in ${NODE_ENV} mode.`);
});
