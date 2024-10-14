import express from "express";
import userRoutes from "./user";
import todoRoutes from "./todo";

const router = express.Router();

const defaultRoutes = [
    {
        path: "/user",
        route: userRoutes,
    },
    {
        path: "/todo",
        route: todoRoutes,
    },
];

router.get("/", async (req, res): Promise<any> => {
    return res.status(200).send({ status: true, message: "Api is running" });
});

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

export default router;
