import { registerManager, registerUser } from "../controllers/userController";

export const seedUser = async () => {
  let email = "admin@xodius.io";
  let name = {
    firstName: "Jacob",
    middleInitial: "R",
    lastName: "Webb",
  };
  let password = "password";
  registerManager(email, name, password, ["ADMIN"]);

  email = "propertyOwner@gmail.com";
  name = {
    firstName: "Test",
    middleInitial: "T",
    lastName: "Owner",
  };
  password = "password";
  registerManager(email, name, password);

  email = "testCustomer@gmail.com";
  name = {
    firstName: "Customer",
    middleInitial: "T",
    lastName: "Customer",
  };
  password = "password";
  registerUser(email, name, password);
};
