import axios from "axios";
import { AUTH0_DOMAIN } from "../config/config";
import { GraphQLResolveInfo } from "graphql";
import errorHandler from "../lib/errorHandler";

interface resolverArgs {
  args: any;
  context: any;
  info: GraphQLResolveInfo;
}
export async function auth0IDFromToken(token: string) {
  try {
    const res = await axios.post(
      `https://${AUTH0_DOMAIN}/userinfo`,
      {},
      {
        headers: {
          authorization: token
        }
      }
    );
    return res?.data.sub;
  } catch (error) {
    errorHandler(error, debugLine => debugLine());
  }
}

export async function getIDFromAuth0({ args, context, info }: resolverArgs) {
  const queryType = info.fieldName;
  const token = context.token || args.token;
  if (!token) {
    errorHandler(
      null,
      debugLine => debugLine(),
      `No token included with ${queryType} query.`
    );
  } else {
    return await auth0IDFromToken(token);
  }
}
