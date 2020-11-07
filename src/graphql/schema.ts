import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { graphQLFieldFactory } from "../lib/yamlGraphQLFactories";

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: graphQLFieldFactory(),
});

export const schema = new GraphQLSchema({
  query: RootQuery,
});
