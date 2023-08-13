const validateAuth = require("../middleware/auth");
const UserController = require("../bin/controllers/UserCotroller");
module.exports = (app) => {
  // Create a new User
  app.post("/users", validateAuth, UserController.create);

  // Retrieve all Users
  app.get("/users", validateAuth, UserController.findAll);

  // Retrieve a single User with userId24e
  app.get("/users/:userId", validateAuth, UserController.findOne);

  // Update a User with userId
  app.put("/users/:userId", validateAuth, UserController.update);

  // Delete a User with userId
  app.delete("/users/:userId", validateAuth, UserController.delete);

  // Login user
  app.post("/auth/login", UserController.login);

  // Logout user
  app.post("/auth/logout", validateAuth, UserController.logout);

  app.get("/auth/user", validateAuth, UserController.user);

  // Create a new password
  app.post("/generate", validateAuth, UserController.generate);

  // Get status user
  app.get(
    "/students/:studentId/status/",
    validateAuth,
    UserController.getStatus
  );
};
