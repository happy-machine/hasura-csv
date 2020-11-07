import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { graphQLFieldFactory } from "../lib/yamlGraphQLGenerator";

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: graphQLFieldFactory(),
});

export const schema = new GraphQLSchema({
  query: RootQuery,
});
