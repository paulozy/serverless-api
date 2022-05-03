import {
  formatJSONResponse,
  ValidatedEventAPIGatewayProxyEvent,
} from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { hash } from "bcrypt";
import schema from "./schema";

const createUser: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  const data = event.body;
  const passwordHashed = await hash(data.password, 12);

  return formatJSONResponse({ passwordHashed });
};

export const main = middyfy(createUser);
