import { GraphQLObjectType, GraphQLString, GraphQLID } from "graphql";

export const Csv = new GraphQLObjectType({
  name: "CSV",
  description: "",
  fields: () => ({
    level: { type: GraphQLID },
    name: { type: GraphQLString },
    status: { type: GraphQLString },
  }),
});
