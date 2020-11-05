import logger from "../config/winston";

export const graphQLheadersLogger = (req: any, res: any, next: any) => {
  logger.debug("-------------------------------------------------------------");
  logger.debug(`GraphQL request headers: ${Object.keys(req.headers)}`);
  Object.keys(req.headers).forEach(key =>
    logger.debug(`${key}: ${req.headers[key]}`)
  );
  logger.debug("-------------------------------------------------------------");
  return next();
};

export const convertSnakeToCamel = (text: string) => {
  return text.replace(/([-_][a-z])/g, group =>
    group
      .toUpperCase()
      .replace("-", "")
      .replace("_", "")
  );
};

export const convertFieldsSnakeToCamel = (knexResponse: Object) => {
  /***
   * postgres wants to use snake-case, but graphql wants to use camel-case
   * there is a third party middleware graphql-tools that could be used in conjuction with
   * this or lodash etc which would save having to do this implicitly throughout
   * however there is an outstanding typescript issue with graphiql-tools
   */
  const out = {};
  Object.keys(knexResponse).forEach(
    (key, i) => (out[convertSnakeToCamel(key)] = Object.values(knexResponse)[i])
  );
  return out;
};

export const UTCDateNow = () =>
  new Date(Date.now())
    .toISOString()
    .replace("T", " ")
    .replace("Z", "");
