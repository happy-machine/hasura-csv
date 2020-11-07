import logger from "./config/winston";
import express from "express";
import { graphqlHTTP } from "express-graphql";
import cors from "cors";
import { schema } from "./graphql/schema";
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
  res.status(200).send(JSON.stringify({ data: "run" }));
  logger.debug(`${APP_NAME} is alive.`);
});

app.use(
  "/graphql",
  [],
  graphqlHTTP(() => ({
    schema,
    graphiql: false,
    context: {
      timestamp: Date.now(),
    },
  }))
);

app.use("*", (req, res) => {
  logger.error("No path found at ", req.path);
  return res.status(404).json({ message: `${APP_NAME}: Path not found` });
});

app.listen(PORT, HOST, () => {
  logger.info(`${APP_NAME} listening on port ${PORT} in ${NODE_ENV} mode.`);
});
