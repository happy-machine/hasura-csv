import { createObjectCsvWriter } from "csv-writer";
import fs from "fs";
const fsPromises = fs.promises;
import { OUTPUT_DIR } from "../config/config";
import logger from "../config/winston";
let currentTimeStamp;

export const csvWriter = async (filename, keys, timestamp) => {
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
