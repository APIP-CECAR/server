const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const strips = require("strips");
const path = require("path");
const async = require("async");
const Test = require("../../models/Test");
const Status = require("../../models/Status");
const User = require("../../models/User");
const Planners = require("../../models/Planners");
const fs = require("fs");
const axios = require("axios");

// geneate plan by ids students
exports.processIds = (ids, history) =>
  new Promise((resolve, reject) => {
    console.log("Pass history", history);
    Test.find({ id_user: { $in: ids } })
      .populate({ path: "id_user", select: "name surname _id" })
      .populate("indicators")
      .populate("dimensions")
      .then((tests) => {
        proccesTests(tests, history).then((idsPlan) => resolve(idsPlan));
      })
      .catch((err) => {
        reject({ err });
      });
  });

const proccesTests = (tests, history) =>
  new Promise((resolve, reject) => {
    let statusIds = [];
    // Procesar cada test de forma asíncrona
    async.eachOfSeries(
      tests,
      (test, index, callback) => {
        // Realizar el análisis de las dimensiones
        let studentId = test.id_user._id;
        let testId = test._id;
        let {
          identify,
          make_known,
          detect,
          analyze,
          list,
          reflect,
          define,
          relate,
          diferentiate,
          characterize,
          propose,
          associate,
        } = test.indicators;

        let observation = [make_known, detect, identify];
        let comparison = [define, diferentiate, relate];
        let clasification = [propose, associate, characterize];
        let description = [analyze, list, reflect];

        async.parallel(
          {
            obsRes: (cb) => analyzeIndicators("n1obs", observation, cb),
            comRes: (cb) => analyzeIndicators("n1com", comparison, cb),
            claRes: (cb) => analyzeIndicators("n1cla", clasification, cb),
            desRes: (cb) => analyzeIndicators("n1des", description, cb),
          },
          (err, results) => {
            if (err) {
              console.error("Error al analizar las dimensiones del test:", err);
              callback(err);
              return;
            }

            const status = {
              student: studentId,
              test: testId,
            };

            status.observation = processRes(results.obsRes);
            status.comparison = processRes(results.comRes);
            status.clasification = processRes(results.claRes);
            status.description = processRes(results.desRes);

            const newStatus = new Status(status);

            newStatus.save((err, result) => {
              if (err) {
                reject(err);
              } else {
                statusIds.push(result._id);
                callback();
              }
            });
          }
        );
      },
      (err) => {
        if (err) {
          console.error("Error al procesar los tests:", err);
          reject(err);
          return;
        }
        proccesStatusByPlan(statusIds, history).then((plans) => {
          resolve(plans);
        });
      }
    );
  });
// Función para analizar una dimensión

// Función para analizar los indicadores
function analyzeIndicators(prefix, indicators, callback) {
  const indicatorNames = Object.keys(indicators);

  // Realizar el análisis de cada indicador de forma asíncrona
  async.map(
    indicatorNames,
    (indicatorName, cb) => {
      let indicator = indicators[indicatorName];
      let name = Number(indicatorName) + 1;
      let value = indicator.percentil != "insatisfactorio" ? true : false;
      let propertie = { [`${prefix}${name}`]: value };
      cb(null, propertie);
    },
    (err, results) => {
      if (err) {
        callback(err);
        return;
      }

      // Combinar los resultados de los indicadores en un objeto
      const result = indicatorNames.reduce((acc, indicatorName, index) => {
        acc[indicatorName] = results[index];
        return acc;
      }, {});

      callback(null, result);
    }
  );
}

function processRes(obj) {
  const element = {};

  Object.entries(obj).forEach(([key, value]) => {
    const propName = Object.keys(value)[0];
    element[propName] = value[propName];
  });

  return element;
}

const proccesStatusByPlan = (idsSatatus, history) =>
  new Promise((resolve, reject) => {
    let objects = "";
    let init = "";
    let goal = "";
    Status.find({ _id: { $in: idsSatatus } }, (err, statuses) => {
      if (err) {
        console.error("Error al buscar los estados de los estudiantes:", err);
        reject(err);
      }
      async.eachOfSeries(
        statuses,
        (status, index, callback) => {
          objects += `student_${status.student.toString()} `;
          init += `(achieved-process student_${status.student.toString()} n0ct)\n\t\t`;
          goal += `(achieved-process student_${status.student.toString()} n1cla03)\n\t\t`;
          callback();
        },
        (err) => {
          if (err) {
            console.error("Error al procesar los tests:", err);
            reject(err);
          }

          generatePlan(objects, init, goal, history)
            .then((plan) => {
              resolve(plan);
            })
            .catch((err) => reject(err));
        }
      );
    });
  });

function generateTemplate(objects, init, goal) {
  return `(define (problem critical-thinking-pleanner)
  (:domain critical-thinking-planner)
  (:objects
    ${objects} -student
	  n0ct n1obs01 n1obs02 n1obs03
    n1com01 n1com02 n1com03 
    n1cla01 n1cla02 n1cla03
    n1des01 n1des02 n1des03 - cognitive-process
	)
	(:init		
		(precondition n0ct n1obs01)
		(precondition n0ct n1obs02)
		(precondition n0ct n1obs03)
		
		(precondition n1obs01 n1com01)
		(precondition n1obs01 n1com02)
		(precondition n1obs01 n1com03)
		
		(precondition n1obs02 n1com01)
		(precondition n1obs02 n1com02)
		(precondition n1obs02 n1com03)
		
		(precondition n1com01 n1cla01)
		(precondition n1com01 n1cla02)
		(precondition n1com01 n1cla03)
		
		${init}
							
		(= (reward-progress-to n0ct n1obs01) 1)
    (= (reward-progress-to n0ct n1obs02) 2) 
    (= (reward-progress-to n0ct n1obs03) 1)
        
    (= (reward-progress-to n1obs01 n1com01) 1)
    (= (reward-progress-to n1obs01 n1com02) 1) 
    (= (reward-progress-to n1obs01 n1com03) 1)

    (= (reward-progress-to n1obs02 n1com01) 2)
    (= (reward-progress-to n1obs02 n1com02) 2) 
    (= (reward-progress-to n1obs02 n1com03) 2)
        
    (= (reward-progress-to n1com01 n1cla01) 1)
    (= (reward-progress-to n1com01 n1cla02) 1) 
    (= (reward-progress-to n1com01 n1cla03) 1)

    (= (cost-progress-to n0ct n1obs01) 1)
    (= (cost-progress-to n0ct n1obs02) 1) 
    (= (cost-progress-to n0ct n1obs03) 1)

    (= (cost-progress-to n1obs01 n1com01) 1)
    (= (cost-progress-to n1obs01 n1com02) 1) 
    (= (cost-progress-to n1obs01 n1com03) 1)    
        
    (= (cost-progress-to n1com01 n1cla01) 1)
    (= (cost-progress-to n1com01 n1cla02) 1) 
    (= (cost-progress-to n1com01 n1cla03) 1)
        
    (= (learning-path-cost) 0)
    (= (learning-path-reward)  0)  
	)
	(:goal
		(and ${goal}
		)
	)
	(:metric maximize(learning-path-reward))
)`;
}

const generatePlan = (objects, init, goal, history) =>
  new Promise((resolve, reject) => {
    let problemTemplate = generateTemplate(objects, init, goal);
    fs.writeFile(
      path.join(__dirname, "pddl", "problem.pddl.txt"),
      problemTemplate,
      "utf8",
      (err) => {
        if (err) {
          console.error("Error al guardar el archivo:", err);
          return;
        }

        let domain = fs.readFileSync(
          path.join(__dirname, "pddl", "domain.pddl.txt"),
          "utf8"
        );
        let problem = fs.readFileSync(
          path.join(__dirname, "pddl", "problem.pddl.txt"),
          "utf8"
        );

        let url = "http://solver.planning.domains/solve";
        let contentType = "application/json";
        let data = { domain, problem };

        axios
          .post(url, data, { headers: { "Content-Type": contentType } })
          .then((response) => {
            getPlansForUsers(response.data.result.plan, history)
              .then((message) => resolve(message))
              .catch((err) => reject(err));
          })
          .catch((error) => {
            reject(error.response.data);
          });
      }
    );
  });

const getPlansForUsers = (plans, history) =>
  new Promise(async (resolve, reject) => {
    let message = "";
    const students = plans.reduce((result, item) => {
      const matches = item.name.match(/(student_[a-f0-9]+)/);
      if (matches) {
        const studentId = matches[1];
        if (!result[studentId]) {
          result[studentId] = [];
        }
        result[studentId].push(item);
      }
      return result;
    }, {});

    try {
      let data = [];
      for (const studentId in students) {
        const studentPlans = students[studentId];
        await data.push(storePlanInUser(studentId, studentPlans, history));
      }
      message = {
        message: "Planes generados correctamente",
        data,
        isPlanner: true,
      };
      resolve(message);
    } catch (error) {
      reject(error);
    }
  });

async function storePlanInUser(userId, studentPlans, history) {
  try {
    userId = userId.split("_")[1];
    // Actualizar la propiedad isPlanning en el usuario a true
    await User.findByIdAndUpdate(userId, { isPlanning: true });

    // Recorrer el objeto de estudiantes con el plan
    for (const studentId in studentPlans) {
      const studentPlanList = studentPlans[studentId];
      console.log("History", history);
      const newPlan = new Planners({
        name: studentPlanList.name,
        plan: studentPlanList.action,
        history: ObjectId(history),
      });

      // Guardar el nuevo plan en la base de datos
      let savedPlan = await newPlan.save();

      // Agregar el ID del plan a la propiedad plans del usuario
      await User.findByIdAndUpdate(
        userId,
        { $push: { plans: savedPlan._id }, isPlanning: true },
        { new: true }
      );
      //}
    }

    // Obtener el usuario actualizado
    const updatedUser = await User.findById(userId);
    return { user: userId };
    // Aquí puedes realizar las operaciones necesarias con el usuario actualizado
  } catch (error) {
    console.error(error);
  }
}
