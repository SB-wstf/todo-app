import { z } from "zod";

export default class Validators {
    static registerUserSchema = z.object({
        body: z
            .object({
                firstName: z.string().min(1, "First name is required"),
                lastName: z.string().min(1, "Last name is required"),
                email: z.string().email("Invalid email"),
                password: z.string().min(6, "Password should be at least 6 characters"),
            })
            .strict(),
        params: z.object({}).strict(),
        query: z.object({}).strict(),
    });

    static loginUserSchema = z.object({
        body: z
            .object({
                email: z.string().email("Invalid email"),
                password: z.string().min(6, "Password should be at least 6 characters"),
            })
            .strict(),
        params: z.object({}).strict(),
        query: z.object({}).strict(),
    });

    static getTodosById = z.object({
        body: z.object({}).strict(),
        params: z.object({}).strict(),
        query: z.object({}).strict(),
    });

    static createTodo = z.object({
        body: z
            .object({
                title: z.string().min(1, "Title is required"),
                description: z.string().optional(),
            })
            .strict(),
        params: z.object({}).strict(),
        query: z.object({}).strict(),
    });

    static updateTodo = z.object({
        body: z
            .object({
                title: z.string().optional(),
                description: z.string().optional(),
            })
            .strict(),
        params: z.object({ todoId: z.string({ required_error: "Todo Id is required" }) }).strict(),
        query: z.object({}).strict(),
    });

    static updateTodoIsCompleted = z.object({
        body: z.object({}).strict(),
        params: z
            .object({
                todoId: z.string({ required_error: "Todo Id is required" }),
            })
            .strict(),
        query: z.object({}).strict(),
    });

    static updateTodoIsPinned = z.object({
        body: z.object({}).strict(),
        params: z
            .object({
                todoId: z.string({ required_error: "Todo Id is required" }),
            })
            .strict(),
        query: z.object({}).strict(),
    });

    static deleteTodoById = z.object({
        body: z.object({}).strict(),
        params: z
            .object({
                todoId: z.string({ required_error: "Todo Id is required" }),
            })
            .strict(),
        query: z.object({}).strict(),
    });
}
