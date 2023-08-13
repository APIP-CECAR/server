const request = require("supertest");
const app = require("../../../server");
const Status = require("../../models/Status");

// Variable para almacenar el token de autenticación
let authToken;

describe("Status Controller", () => {
  // Antes de cada prueba, obtenemos el token de autenticación
  beforeEach(async () => {
    // Realizar la solicitud de inicio de sesión para obtener el token
    const loginResponse = await request(app)
      .post("/auth/login")
      .send({ username: "tester", password: "sY6NvBtYwD" })
      .expect(200);

    authToken = loginResponse.body.token;
  });

  // Prueba para procesar actividades y actualizar el estado
  it("should process activities and update status", async () => {
    // Suponemos que tienes un estudiante de prueba con el ID "testStudentId" en la base de datos

    const requestBody = {
      studentId: "testStudentId",
      competence: "programming", // Supongamos que 'programming' es el nombre de la competencia
      skill: "problemSolving", // Supongamos que 'problemSolving' es la habilidad
      value: true,
      statement: "Completed problem-solving activity", // Declaración opcional
    };

    const response = await request(app)
      .post("/processActivities")
      .send(requestBody)
      .set("Authorization", authToken)
      .expect(200);

    // Verificar la respuesta
    expect(response.body).toHaveProperty("student", "testStudentId");
    expect(response.body.competence.programming.problemSolving).toBe(true);

    // Verificar si el estado se actualizó en la base de datos
    const updatedStatus = await Status.findOne({ student: "testStudentId" });
    expect(updatedStatus.competence.programming.problemSolving).toBe(true);
  });
});
