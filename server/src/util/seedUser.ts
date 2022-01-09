import { registerUser } from "../controllers/userController";

export const seedUser = async () => {
  let email = "admin@xodius.io";
  let name = {
    firstName: "Jacob",
    middleInitial: "R",
    lastName: "Webb",
  };
  let password = "password";
  await registerUser(email, name, password, ["TENANT", "MANAGER", "ADMIN"]);

  email = "test@gmail.com";
  name = {
    firstName: "Test",
    middleInitial: "T",
    lastName: "User",
  };
  password = "password";
  await registerUser(email, name, password);
};
