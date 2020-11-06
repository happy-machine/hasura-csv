import logger from "./config/winston";
import express from "express";
import { graphqlHTTP } from "express-graphql";
import cors from "cors";
import { schema } from "./graphql/schema";
import { parse } from "graphql";
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
  graphqlHTTP((requests) => ({
    schema,
    graphiql: false,
    context: { 
      timestamp: Date.now(),
    }
  }))
);

// app.post("/graphql", (req, res) => {
//   console.log("body: ", req.body);
//   const requests = parse(req.body.query).definitions[0];
//   //requests.selectionSet.selections.map(request => console.log())
//   console.log(
//     requests["selectionSet"]["selections"].map((selection) =>
//       selection.arguments.map((argument) => ({
//         value: argument.value.value,
//         name: Object.keys(Object.values(argument.name)[2])[4],
//         source: Object.values(argument.name)[2]["source"][0],
//       }))
//     )
//   );
//   res.status(200).send(`Alive at ${Date.now()}`);
//   logger.debug(`${APP_NAME} is alive.`);
// });

// app.post("/csv", async (req, res) => {
  // console.log(req.body);
  // res.json({ response: "check" });
  // res.status(200).send(JSON.stringify({ response: "run" }));
  // try {
  //   const writer = await csvWriter(
  //     `${req.body.input.filename}`,
  //     Object.keys(req.body[0])
  //   );
  //   await writer.writeRecords(req.body);
  //   res.status(200).send(`CSV written at ${Date.now()}`);
  // } catch (e) {
  //   res.status(400).send(e);
  //   logger.error(e);
  // }
// });

app.use("*", (req, res) => {
  console.log("no path", req.path);
  return res.status(404).json({ message: `${APP_NAME}: Path not found` });
});

app.listen(PORT, HOST, () => {
  logger.info(`${APP_NAME} listening on port ${PORT} in ${NODE_ENV} mode.`);
});
