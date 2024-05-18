import * as dotenv from "dotenv";

export const getEnv = () => {
  if (process.env.ENV) {
    dotenv.config({
      override: true,
      path: `.env.${process.env.ENV}`,
    });
  } else {
    console.error("No ENV provided");
  }
};
