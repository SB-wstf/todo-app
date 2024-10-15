import { Router } from "express";
import controller from "../controllers";
import { authenticateUser } from "../middleware";
import { validateRequest } from "../middleware";
import validators from "../validators";

const router = Router();

// Route for fetching todos by user ID
router.get(
    "/",
    authenticateUser,
    validateRequest(validators.auth.getTodosById),
    controller.todo.getTodosByUserIdController
);

// Route for creating a new todo
router.post(
    "/create",
    authenticateUser,
    validateRequest(validators.auth.createTodo),
    controller.todo.createTodoController
);

//route to update todo
router.put(
    "/update/:todoId",
    authenticateUser,
    validateRequest(validators.auth.updateTodo),
    controller.todo.updateTodoByUserId
);

//route to complete todo
router.put(
    "/complete/:todoId",
    authenticateUser,
    validateRequest(validators.auth.updateTodoIsCompleted),
    controller.todo.toggleIsCompletedByTodoId
);

//route to toggle isPinned
router.put(
    "/pin/:todoId",
    authenticateUser,
    validateRequest(validators.auth.updateTodoIsPinned),
    controller.todo.toggleIsPinnedByTodoId
);

//route to delete todos by user ID
router.delete(
    "/:todoId",
    authenticateUser,
    validateRequest(validators.auth.deleteTodoById),
    controller.todo.deleteByTodoId
);

// Route for fetching all todos
router.get("/all", controller.todo.getAllTodosController);

export default router;
