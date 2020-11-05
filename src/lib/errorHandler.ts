import logger from "../config/winston";

interface formatted {
  status: number;
  statusText: string;
  message: string;
}

interface IDebug {
  functionName: string;
  lineNumber: string;
}

function debugLine() {
  let e = new Error();
  let frame = e.stack.split("\n")[2];
  let lineNumber = frame.split(":")[1];
  let functionName = frame.split(" ")[5];
  return {
    functionName,
    lineNumber
  };
}

export default function errorHandler(
  /***
   * Pass a null error to inject your own message and add a 504 status-code
   * The optional debugLine callback needs to be ran in the context of a debugged function
   * (cb => cb() as the second argument) and will return the function name and line number
   ***/

  error: Error,
  debug: (debugLine: any) => any,
  message?: string
) {
  console.log("in here");
  const formatted: formatted = {
    status: null,
    statusText: undefined,
    message: undefined
  };
  let selector = "error";
  if (!error) {
    formatted.message = message;
    formatted.status = 504;
  } else {
    formatted.status = error["response"]["status"];
    formatted.statusText = error["response"]["statusText"];
    switch (error["response"]["status"]) {
      case 401:
        formatted.message = "The auth0 bearer token is invalid or has expired.";
        selector = "warn";
        break;
      default:
    }
  }
  logger[selector]({ ...formatted, ...debug(debugLine) });
  throw new Error(JSON.stringify(formatted));
}
