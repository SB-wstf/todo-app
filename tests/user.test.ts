import request from "supertest";
import { app, server } from "../src/app";
import postgresdb, { disconnectDB } from "../src/config/db";
import { users } from "../src/models/schema";

import logger from "./config/logger";
import { sql } from "drizzle-orm";

afterAll(async () => {
    await disconnectDB();
    server.close(() => {
        logger.info("Server is closed");
    });
});

describe("User Registration Tests", () => {
    // Define a unique email for each test
    const testUserEmail = "test_john.doe@example.com";

    // Delete the user from the database before each test
    beforeEach(async () => {
        try {
            const testUserEmailPrefix = "test_";
            await postgresdb.delete(users).where(sql`${users.email} LIKE ${testUserEmailPrefix}%`);
        } catch (error: any) {
            console.error("Error during user deletion:", error);

            // Log detailed error information
            logger.error("Error during user deletion:", {
                message: error.message,
                // code: error.code,
                // severity: error.severity,
                // position: error.position,
                // stack: error.stack,
            });

            // Optionally, log additional context if available
            if (error.detail) {
                logger.error("Error detail:", error.detail);
            }

            throw error; // Rethrow to fail the test
        }
    });

    // Test case for successfull user registration
    test("1. Should register a new user successfully", async () => {
        try {
            const response = await request(app).post("/user/register").send({
                firstName: "John",
                lastName: "Doe",
                email: testUserEmail,
                password: "password123",
            });

            expect(response.status).toBe(201);
            expect(response.body.status).toBe(true);
            expect(response.body.message).toBe("User registered successfully");
            expect(response.body.data).toBeDefined();

            // Log the request and response
            logger.info(`Request to register user: ${JSON.stringify(response.body)}`);
        } catch (error) {
            logger.error("Error during user registration:", error);
            throw error; // Rethrow to fail the test
        }
    });
});
