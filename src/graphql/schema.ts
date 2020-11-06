import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLSchema,
  GraphQLString,
} from "graphql";

import { Csv } from "./types/csv";
import logger from "../config/winston";
import { csvWriter } from "../service/csv";

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    CSV: {
      type: Csv,
      description:
        "This resolver can be linked as a remote schema in order to output columns defined as arguments.",
      args: {
        level: {
          type: GraphQLInt,
          description: "Optional bearer token (for GraphIQL testing)",
        },
        name: {
          type: GraphQLString,
          description: "Optional bearer token (for GraphIQL testing)",
        },
      },
      async resolve(_, args, context, info) {
        try {
          const writer = await csvWriter(
            `${info.fieldName}_${context.timestamp}.csv`,
            Object.keys(args),
            context.timestamp
          );
          await writer.writeRecords([args]);
          return { ...args, status: "done" };
        } catch (e) {
          logger.error(e);
          return e;
        }
      },
    },
  },
});

export const schema = new GraphQLSchema({
  query: RootQuery,
});
