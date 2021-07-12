import express from "express";
import * as userController from "../controllers/users";
import * as middleware from "../middleware/validator";

// middlware for user routes
export const usersRouter = express.Router();

// adding different user routes and methods to execute
usersRouter.get("/", userController.getUsers);
usersRouter.post("/", middleware.createUser, userController.createUser);
usersRouter.get("/:id", userController.getUserById);
usersRouter.put("/:id", middleware.updateUser, userController.updateUser);
usersRouter.delete("/:id", userController.deleteUser);
