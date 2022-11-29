const validateAuth = require("../middleware/auth");
const UserController = require("../bin/controllers/User.cotroller");
module.exports = (app) => {
  // Create a new User
  app.post("/users", UserController.create);

  // Retrieve all Users
  app.get("/users", validateAuth, UserController.findAll);

  // Retrieve a single User with userId
  app.get("/users/:userId", UserController.findOne);

  // Update a User with userId
  app.put("/users/:userId", UserController.update);

  // Delete a User with userId
  app.delete("/users/:userId", UserController.delete);

  // Login user
  app.post("/login", UserController.login);

  // Logout user
  app.post("/logout", UserController.logout);
};
