import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import * as schema from "../models/schema";
import dotenv from "dotenv";
import logger from "./logger";
dotenv.config();
const db = process.env.DBPORT as string;
const dbport = parseInt(db);

// export let client = new Client({
//     host: process.env.HOST,
//     port: dbport,
//     user: process.env.DBUSER,
//     password: process.env.PASSWORD,
//     database: process.env.DATABASE,
// });

export let client = new Client(process.env.PG_URL);

client
    .connect()
    .then(() => {
        logger.info("Postgress Client is Connected Successfully");
    })
    .catch((err: any) => {
        logger.error("Error connecting DB : ", err);
    });

const postgresdb = drizzle(client, { schema: { ...schema } });

export default postgresdb;

// Function to disconnect from the PostgreSQL database
export const disconnectDB = async () => {
    try {
        await client.end();
        logger.info("Postgres Client has been disconnected successfully");
    } catch (err) {
        logger.error("Error disconnecting DB: ", err);
    }
};
