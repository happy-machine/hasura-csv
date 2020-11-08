import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { graphQLFieldFactory } from "../lib/graphQLFactories";
import yaml from "js-yaml";
import fs from "fs";

const doc = yaml.safeLoad(fs.readFileSync("./hcsvconfig.yaml", "utf8"));

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: graphQLFieldFactory(doc),
});

export const schema = new GraphQLSchema({
  query: RootQuery,
});
