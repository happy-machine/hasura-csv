import { createObjectCsvWriter } from "csv-writer";
import { OUTPUT_DIR } from "../config/config";
import logger from "../config/winston";
import fs from "fs";

const fsPromises = fs.promises;
let currentTimeStamp;

export const csvWriter = async (filename, keys, timestamp) => {
  /**
   * Use the timestamp from the request to chose filename to use
   ***/

  const path = `${OUTPUT_DIR}${filename}`;
  try {
    await fsPromises.writeFile(path, "", { flag: "wx" });
  } catch (e) {
    if (!e.code.includes("EEXIST")) {
      logger.error(e);
    }
  }
  const out = createObjectCsvWriter({
    path,
    header: keys.map((key) => ({ id: key, title: key })),
    append: currentTimeStamp == timestamp ? true : false,
  });
  currentTimeStamp = timestamp;
  return out;
};
