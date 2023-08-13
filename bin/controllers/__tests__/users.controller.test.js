const request = require("supertest");
const app = require("../../../server");

// Variable para almacenar el token de autenticación
let authToken;
let testUserId;

describe("Users Controller", () => {
  // Antes de cada prueba, obtenemos el token de autenticación
  beforeEach(async () => {
    // Realizar la solicitud de inicio de sesión para obtener el token
    const loginResponse = await request(app)
      .post("/auth/login")
      .send({ username: "tester", password: "sY6NvBtYwD" })
      .expect(200);

    authToken = loginResponse.body.token;
  });

  // Prueba para crear un nuevo usuario
  it("should create a new user", async () => {
    const newUser = {
      username: "newuser",
      password: "newpassword",
      email: "newuser@example.com",
      role: "user",
    };

    const response = await request(app)
      .post("/users")
      .send(newUser)
      .set("Authorization", authToken)
      .expect(200);

    expect(response.body).toHaveProperty("username", newUser.username);
    expect(response.body).toHaveProperty("email", newUser.email);
    expect(response.body).toHaveProperty("role", newUser.role);

    testUserId = response.body._id;
  });

  // Prueba para obtener todos los usuarios
  it("should get all users", async () => {
    const response = await request(app)
      .get("/users")
      .set("Authorization", authToken)
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
  });

  // Prueba para obtener un usuario por su ID
  it("should get a user by ID", async () => {
    const response = await request(app)
      .get(`/users/${testUserId}`)
      .set("Authorization", authToken)
      .expect(200);

    expect(response.body).toHaveProperty("_id", testUserId);
  });

  // Prueba para actualizar un usuario por su ID
  it("should update a user by ID", async () => {
    const updatedUser = {
      username: "updateduser",
      email: "updateduser@example.com",
    };

    const response = await request(app)
      .put(`/users/${testUserId}`)
      .send(updatedUser)
      .set("Authorization", authToken)
      .expect(200);

    // Obtener el usuario actualizado
    const userResponse = await request(app)
      .get(`/users/${testUserId}`)
      .set("Authorization", authToken)
      .expect(200);

    // Verificar los campos actualizados
    expect(userResponse.body).toHaveProperty("username", updatedUser.username);
    expect(userResponse.body).toHaveProperty("email", updatedUser.email);
  });

  // Prueba para eliminar un usuario por su ID
  it("should delete a user by ID", async () => {
    // Suponemos que tienes un usuario de prueba con el ID "testUserId" en la base de datos

    const response = await request(app)
      .delete(`/users/${testUserId}`)
      .set("Authorization", authToken)
      .expect(200);

    expect(response.body).toHaveProperty(
      "message",
      "User deleted successfully"
    );
  });
});
