import postgresdb from "../../config/db";
import { todos } from "../../models/schema";
import { and, eq, sql } from "drizzle-orm";

export default class Todo {
    static createTodo = async (userId: number, title: string, description: string) => {
        try {
            const newTodo = await postgresdb
                .insert(todos)
                .values({
                    userId,
                    title,
                    description,
                })
                .returning({ title: todos.title, description: todos.description });

            console.log(newTodo);
            return newTodo;
        } catch (error: any) {
            throw new Error(error.message || "Failed to create todo");
        }
    };

    static getTodosByUserId = async (userId: number): Promise<any> => {
        try {
            const getTodo = await postgresdb
                .select()
                .from(todos)
                .where(eq(todos.userId, userId));
            return getTodo;
        } catch (erro: any) {
            console.error(erro);
            throw new Error(erro);
        }
    };

    static updateTodoDetails = async (
        userId: number,
        todoId: number,
        title: string,
        description: string
    ): Promise<boolean> => {
        try {
            const result = await postgresdb
                .update(todos)
                .set({
                    ...(title !== undefined && { title }),
                    ...(description !== undefined && { description }),
                })
                .where(and(eq(todos.id, todoId), eq(todos.userId, userId)))
                .returning({ id: todos.id })
                .execute();

            return result.length > 0;
        } catch (error: any) {
            console.error(error);
            throw new Error(error);
        }
    };

    static completeTodoById = async (userId: number, todoId: number): Promise<boolean> => {
        try {
            console.log(userId, todoId);
            const result = await postgresdb
                .update(todos)
                .set({ isCompleted: sql`NOT ${todos.isCompleted}` })
                .where(and(eq(todos.id, todoId), eq(todos.userId, userId)))
                .returning({ id: todos.id });
            return result.length > 0;
        } catch (error: any) {
            console.error(error);
            throw new Error(error);
        }
    };

    static updateIsPinnedByTodoId = async (userId: number, todoId: number): Promise<boolean> => {
        try {
            const result = await postgresdb
                .update(todos)
                .set({
                    isPinned: sql`NOT ${todos.isPinned}`,
                })
                .where(and(eq(todos.id, todoId), eq(todos.userId, userId)))
                .returning({ id: todos.id });

            return result.length > 0;
        } catch (error: any) {
            console.error(error);
            throw new Error(error);
        }
    };

    static deleteTodoById = async (userId: number, todoId: number): Promise<boolean> => {
        try {
            const result = await postgresdb
                .delete(todos)
                .where(and(eq(todos.id, todoId), eq(todos.userId, userId)))
                .returning({ id: todos.id });

            return result.length > 0;
        } catch (error: any) {
            console.error(error);
            throw new Error(error);
        }
    };
}
