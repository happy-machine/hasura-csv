import { csvWriter } from "../../service/csv";

export default async (graphQLArgs) => {
  const { args, context, info } = graphQLArgs;
  console.log({info})
  const writer = await csvWriter(
    `${info.fieldName}_${context.timestamp}.csv`,
    Object.keys(args),
    context.timestamp
  );
  await writer.writeRecords([args]);
};
