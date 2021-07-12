import { User } from "../entity/User";
import { UserService } from "./user";

const user_1 = new User();
user_1.id = 1;
(user_1.email = "test@specify.fr"),
  (user_1.username = "test"),
  (user_1.firstName = "test"),
  (user_1.lastName = "test"),
  (user_1.password = "098f6bcd4621d373cade4e832627b4f6");

const user_2 = new User();
(user_2.id = 2),
  (user_2.email = "test_1@specify.fr"),
  (user_2.username = "test_1"),
  (user_2.firstName = "test_1"),
  (user_2.lastName = "test_1"),
  (user_2.password = "098f6bcd4621d373cade4e832627b4f6");

const users = [user_1, user_2];

describe("UserService", () => {
  const userService = new UserService();

  describe("Get All Users", () => {
    it("should get all the users", async () => {
      jest.spyOn(User, "find").mockReturnValue(Promise.resolve(users));
      const result = await userService.getUsers();
      expect(result).toEqual(users);
    });
    it("should throw an exception", async () => {
      jest.spyOn(User, "find").mockReturnValue(Promise.reject("test errors"));
      expect(userService.getUsers()).rejects.toThrow("test errors");
    });
  });

  describe("Get User By Id", () => {
    it("should get a user by id", async () => {
      jest.spyOn(User, "findOne").mockReturnValue(Promise.resolve(users[0]));
      const result = await userService.getUserById(1);
      expect(result).toEqual(users[0]);
    });
    it("should throw an exception", async () => {
      jest
        .spyOn(User, "findOne")
        .mockReturnValue(Promise.reject("test errors"));
      expect(userService.getUserById(1)).rejects.toThrow("test errors");
    });
  });

  describe("Delete User", () => {
    it("should delete a user", async () => {
      jest.spyOn(User, "findOne").mockReturnValue(Promise.resolve(users[0]));
      jest.spyOn(User, "remove").mockReturnValue(Promise.resolve(users[0]));
      const result = await userService.deleteUser(1);
      expect(result).toEqual(users[0]);
    });
    it("should throw an exception because the user does not exist", async () => {
      jest.spyOn(User, "findOne").mockReturnValue(Promise.resolve(undefined));
      jest.spyOn(User, "remove").mockReturnValue(Promise.resolve(users[0]));
      expect(userService.getUserById(1)).rejects.toThrow("User not found");
    });
    it("should throw an exception because an error occured while deleting", async () => {
      jest.spyOn(User, "findOne").mockReturnValue(Promise.resolve(users[0]));
      jest.spyOn(User, "remove").mockReturnValue(Promise.reject("error"));
      expect(userService.getUserById(1)).rejects.toThrow("error");
    });
  });
});
