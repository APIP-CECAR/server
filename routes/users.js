const validateAuth = require("../middleware/auth");
const UserController = require("../bin/controllers/UserCotroller");
module.exports = (app) => {
  // Create a new User
  app.post("/users", UserController.create);

  // Retrieve all Users
  app.get("/users", validateAuth, UserController.findAll);

  // Retrieve a single User with userId24e
  app.get("/users/:userId", UserController.findOne);

  // Update a User with userId
  app.put("/users/:userId", UserController.update);

  // Delete a User with userId
  app.delete("/users/:userId", UserController.delete);

  // Login user
  app.post("/auth/login", UserController.login);

  // Logout user
  app.post("/auth/logout", UserController.logout);

  app.get("/auth/user", UserController.user);

  // Create a new password
  app.post("/generate", UserController.generate);

  // Get status user
  app.get("/students/:studentId/status/", UserController.getStatus);
};
