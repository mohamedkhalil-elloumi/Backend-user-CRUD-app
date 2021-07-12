import { User } from "../entity/User";
import md5 from "md5";

export class UserService {
  constructor() {}

  /**
   *
   * @param email
   * @param password
   * @param username
   * @param firstName
   * @param lastName
   * uses the parameters received to create a new user
   * in the table User
   */
  public async createUser(
    email: string,
    password: string,
    username: string,
    firstName: string,
    lastName: string
  ): Promise<User | String> {
    // look if the user already exists using the email since it's unique
    const doesUserExist = await User.findOne({ email: email });
    if (doesUserExist !== undefined) throw new Error("Email Taken");

    try {
      // hash the password using md5
      const passwordHashed = md5(password);
      const user = new User();
      // trim is used to remove the extra white spaces at the start and the end of the string
      user.email = email.trim();
      user.password = passwordHashed;
      user.username = username.trim();
      user.firstName = firstName.trim();
      user.lastName = lastName.trim();
      //save the user in the DB and return it to controller
      return await user.save();
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * list all users in the table user
   */
  public async getUsers(): Promise<Array<User> | string> {
    try {
      return await User.find();
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   *
   * @param id represents the id of user to get
   * returns the user with the id if it exists
   * otherwise throw an error
   */
  public async getUserById(id: number): Promise<User | string> {
    try {
      const doesUserExist = await User.findOne({ id: id });
      if (doesUserExist === undefined) throw new Error("User not found");
      return doesUserExist;
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   *
   * @param id id of user to update
   * @param body object containing the different attributes to update
   * returns the user with its new updated attributes except for password
   */
  public async updateUser(id: number, body: Object): Promise<User | string> {
    try {
      // get the user with all its data including the password using the id
      const doesUserExist = await User.createQueryBuilder("user")
        .addSelect("user.password")
        .where("user.id = :id", { id: id })
        .getOne();
      // throw an error if user to update doesn't exist
      if (doesUserExist === undefined) throw new Error("User not found");
      // loop through the body object to check what attributes to update
      for (const key in body) {
        if (body[key].length !== 0) {
          // the attributes to update are the strings with a positive length
          if (key === "password") {
            /**
             * in case we will update the password then we will
             * save the new password hash with md5
             */
            doesUserExist.password = md5(body[key]);
          } else if (key === "email") {
            /**
             * if email is the attribute to update then check if the new
             * email exists or not to not have an error thrown from
             * database
             */
            const checkUserEmail = await User.findOne({ email: body[key] });
            if (checkUserEmail !== undefined) throw new Error("Email Taken");
            doesUserExist[key] = body[key];
          } else {
            doesUserExist[key] = body[key];
          }
        }
      }
      // save the user with its new attributes
      const savedUser = await User.save(doesUserExist);
      // delete the password attribute that we get earlier
      delete savedUser.password;
      // return the new saved user data without password
      return savedUser;
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   *
   * @param id represents the id of user to delete
   * removes the user with id from table user
   */
  public async deleteUser(id: number): Promise<User | string> {
    try {
      const doesUserExist = await User.findOne({ id: id });
      if (doesUserExist === undefined) throw new Error("User not found");
      return await User.remove(doesUserExist);
    } catch (err) {
      throw new Error(err);
    }
  }
}
