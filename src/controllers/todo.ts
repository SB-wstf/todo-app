import { Request, Response } from "express";
import dbServices from "../services/dbServices";
interface AuthenticatedRequest extends Request {
    user?: any;
    body: any;
    params: any;
}
export default class User {
    // Fetch todos by user ID
    static getTodosByUserIdController = async (req: AuthenticatedRequest, res: Response) => {
        try {
            const userId = req.user.userId;
            const todos = await dbServices.todo.getTodosByUserId(userId);
            res.status(200).json({ status: true, todos });
        } catch (error) {
            console.error("Error fetching todos:", error);
            res.status(500).json({ status: false, error: "Internal Server Error" });
        }
    };

    // Cretae a todo
    static createTodoController = async (
        req: AuthenticatedRequest,
        res: Response
    ): Promise<any> => {
        try {
            let UserId = req.user.userId;
            const { title, description } = req.body;
            const todo = await dbServices.todo.createTodo(UserId, title, description);
            res.status(201).send({
                status: true,
                message: "Todo Created Successfully",
                data: todo,
            });
        } catch (error: any) {
            console.error("Error creating todo:", error);
            res.status(500).send({ status: false, error: error.message });
        }
    };

    // Update a todo by user ID
    static updateTodoByUserId = async (req: AuthenticatedRequest, res: Response) => {
        try {
            const userId = req.user.userId;
            const todoId = req.params.todoId;
            const { title, description } = req.body;
            const result = await dbServices.todo.updateTodoDetails(
                userId,
                parseInt(todoId),
                title,
                description
            );
            if (result) {
                res.status(200).json({ status: true, message: "Todo updated successfully" });
            } else {
                res.status(400).json({
                    status: false,
                    message: "Todo not found or not authorized to delete",
                });
            }
        } catch (error: any) {
            console.error("Error updating todo:", error);
            res.status(500).json({ status: false, error: error.message });
        }
    };

    // complete a todo by todo ID
    static toggleIsCompletedByTodoId = async (req: AuthenticatedRequest, res: Response) => {
        try {
            const userId = req.user.userId;
            const todoId = req.params.todoId;
            const result = await dbServices.todo.completeTodoById(userId, parseInt(todoId));
            if (result) {
                res.status(200).json({
                    status: true,
                    message: "Todo Complition status updated successfully",
                });
            } else {
                res.status(400).json({
                    status: false,
                    message: "Todo not found or not authorized to update Complition status",
                });
            }
        } catch (error) {
            console.error("Error updating complition status of todo:", error);
            res.status(500).json({ status: false, error: "Internal Server Error" });
        }
    };

    // toggle isPinned of todo by todo ID
    static toggleIsPinnedByTodoId = async (req: AuthenticatedRequest, res: Response) => {
        try {
            console.log("abccc");
            const userId = req.user.userId;
            const todoId = req.params.todoId;
            const result = await dbServices.todo.updateIsPinnedByTodoId(userId, parseInt(todoId));
            if (result) {
                res.status(200).json({
                    status: true,
                    message: "Todo isPinned updated successfully",
                });
            } else {
                res.status(400).json({
                    status: false,
                    message: "Todo not found or not authorized to update isPinned",
                });
            }
        } catch (error) {
            console.error("Error updating isPinned of a todo:", error);
            res.status(500).json({ status: false, error: "Internal Server Error" });
        }
    };

    // delete a todo by todo ID
    static deleteByTodoId = async (req: AuthenticatedRequest, res: Response) => {
        try {
            const userId = req.user.userId;
            const todoId = req.params.todoId;
            const result = await dbServices.todo.deleteTodoById(userId, parseInt(todoId));
            if (result) {
                res.status(200).json({
                    status: true,
                    message: "Todo deleted successfully",
                });
            } else {
                res.status(400).json({
                    status: false,
                    message: "Todo not found or not authorized to delete",
                });
            }
        } catch (error) {
            console.error("Error deleting todo:", error);
            res.status(500).json({ status: false, error: "Internal Server Error" });
        }
    };

    // Fetch all todos byadmin
    static getAllTodosController = async (req: Request, res: Response) => {
        try {
            const todos = await dbServices.todo.getAllTodos();
            res.status(200).json({ status: true, todos });
        } catch (error) {
            console.error("Error fetching todos:", error);
            res.status(500).json({ status: false, error: "Internal Server Error" });
        }
    };
}
