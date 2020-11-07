import yaml from "js-yaml";
import fs from "fs";
import logger from "../config/winston";
import {
  GraphQLInt,
  GraphQLFloat,
  GraphQLID,
  GraphQLString,
  GraphQLObjectType,
} from "graphql";

const doc = yaml.safeLoad(fs.readFileSync("./hcsvconfig.yaml", "utf8"));

const types = {
  string: GraphQLString,
  integer: GraphQLInt,
  float: GraphQLFloat,
  id: GraphQLID,
};

export const graphQLTypeFactory = (resolver) => {
  const mappedFields = resolver.fields.map((field) => ({
    [field.arg]: { type: types[field.type] },
  }));
  mappedFields.push({ status: { type: GraphQLString } });
  return new GraphQLObjectType({
    name: resolver.name,
    fields: () => Object.assign({}, ...mappedFields),
  });
};

export const graphQLFieldFactory = () => {
  try {
    const out = doc.resolvers.map((resolver) => {
      return {
        [resolver.name]: {
          type: graphQLTypeFactory(resolver),
          args: Object.assign(
            {},
            ...resolver.fields.map((field) => ({
              [field.arg]: {
                type: types[field.type],
              },
            }))
          ),
          async resolve(_, args, context, info) {
            try {
              const graphQLResolver = await import(
                `../graphql/resolvers/${resolver.resolver_target}.ts`
              );
              await graphQLResolver.default({
                args,
                context,
                info,
              });
              return { ...args, status: "done" };
            } catch (e) {
              logger.error(e);
              return e;
            }
          },
        },
      };
    });
    return Object.assign({}, ...out);
  } catch (e) {
    logger.error(e);
  }
};
