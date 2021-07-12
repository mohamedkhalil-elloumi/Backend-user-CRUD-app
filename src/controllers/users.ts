import { Request, Response } from "express";
import { UserService } from "../services/user";

const userService = new UserService();

export const createUser = async (req: Request, res: Response) => {
  const { email, password, username, firstName, lastName } = req.body;
  try {
    const payload = await userService.createUser(
      email,
      password,
      username,
      firstName,
      lastName
    );
    return res.status(201).json({
      data: payload,
      message: "User created",
    });
  } catch (error) {
    if (String(error).includes("Email Taken")) {
      return res.status(400).json({
        error: true,
        message: "Email is taken",
      });
    }
    return res.status(500).json({
      error: true,
      message: error,
    });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const payload = await userService.getUserById(id);
    return res.status(200).json({
      data: payload,
      message: "list user",
    });
  } catch (error) {
    if (String(error).includes("not found")) {
      return res.status(404).json({
        error: true,
        message: "User not found",
      });
    } else {
      return res.status(500).json({
        error: true,
        message: error,
      });
    }
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const payload = await userService.getUsers();
    return res.status(200).json({
      data: payload,
      message: "list all users",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: error,
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const payload = await userService.deleteUser(id);
    return res.status(200).json({
      data: payload,
      message: "list user",
    });
  } catch (error) {
    if (String(error).includes("not found")) {
      return res.status(404).json({
        error: true,
        message: "User not found",
      });
    } else {
      return res.status(500).json({
        error: true,
        message: error,
      });
    }
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { email, password, username, firstName, lastName } = req.body;
  try {
    const payload = await userService.updateUser(id, {
      email,
      password,
      username,
      firstName,
      lastName,
    });
    return res.status(200).json({
      data: payload,
      message: "User updated",
    });
  } catch (error) {
    if (String(error).includes("not found")) {
      return res.status(404).json({
        error: true,
        message: "User not found",
      });
    } else if (String(error).includes("Email Taken")) {
      return res.status(400).json({
        error: true,
        message: "Email is taken",
      });
    } else {
      return res.status(500).json({
        error: true,
        message: error,
      });
    }
  }
};
