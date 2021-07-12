import { Request, Response, NextFunction } from "express";
import Joi from "joi";

/** create user schema to validate incoming input
 * for user creation
 */
const createUserSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(128).required(),
  username: Joi.string().min(8).max(50).required(),
  firstName: Joi.string().max(50).required(),
  lastName: Joi.string().max(50).required(),
});

/** update user schema to validate incoming input
 * for user update
 */
const updateUserSchema = Joi.object().keys({
  email: Joi.string().email().optional().allow(""),
  password: Joi.string().min(8).max(128).optional().allow(""),
  username: Joi.string().min(8).max(50).optional().allow(""),
  firstName: Joi.string().max(50).optional().allow(""),
  lastName: Joi.string().max(50).optional().allow(""),
});

/**
 *
 * @param req request containing the different input for user creation
 * @param res response to set with adequate status
 * @param next next function to call the next middleware in the route stack
 *
 * validate the input or reject it with error status 400
 */
export function createUser(req: Request, res: Response, next: NextFunction) {
  const { email, password, username, firstName, lastName } = req.body;
  createUserSchema
    .validateAsync({ email, password, username, firstName, lastName })
    .then((response) => {
      next();
    })
    .catch((error) => {
      return res.status(400).json({
        error: true,
        message: error,
      });
    });
}

/**
 *
 * @param req request containing input if it exists for user update
 * @param res response to set with correct status
 * @param next to call the next middleware
 * 
 * validate or reject for user update input parameters
 */
export function updateUser(req: Request, res: Response, next: NextFunction) {
  const { email, password, username, firstName, lastName } = req.body;
  updateUserSchema
    .validateAsync({ email, password, username, firstName, lastName })
    .then((response) => {
      next();
    })
    .catch((error) => {
      return res.status(400).json({
        error: true,
        message: error,
      });
    });
}
