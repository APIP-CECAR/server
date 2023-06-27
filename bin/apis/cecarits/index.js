const strips = require("strips");
const path = require("path");
const async = require("async");
const Test = require("../../models/Test");
const Status = require("../../models/Status");
const fs = require("fs");
const axios = require("axios");

// geneate plan by ids students
exports.processIds = (ids, res) =>
  new Promise((resolve, reject) => {
    Test.find({ id_user: { $in: ids } })
      .populate({ path: "id_user", select: "name surname _id" })
      .populate("indicators")
      .populate("dimensions")
      .then((tests) => {
        proccesTests(tests).then((idsPlan) => resolve(idsPlan));
      })
      .catch((err) => {
        reject(res.status(500).send({ err }));
      });
  });

const proccesTests = (tests) =>
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
        proccesStatusByPlan(statusIds).then((plans) => {
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

const proccesStatusByPlan = (idsSatatus) =>
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
          init += `\t\t(student-evidences-step student_${status._id.toString()} step1)\n`;
          goal += `(student-evidences-step student_${status._id.toString()} step16)\n\t\t`;
          callback();
        },
        (err) => {
          if (err) {
            console.error("Error al procesar los tests:", err);
            reject(err);
          }

          generatePlan(objects, init, goal)
            .then((plan) => console.log(plan)) //resolve(plan))
            .catch((err) => reject(err));
        }
      );
    });
  });

function generateTemplate(objects, init, goal) {
  return `(define (problem sequencing-critical-thinking)
\t\t\t\t(:domain critical-thinking-reasoning)
\t\t\t\t(:objects
\t\t\t\t${objects} -student
\t\t\t\t      step1 step2 step3 step4 step5 step6 step7 step8 step9 step10 step11 step12 step13 step14 step15 step16 - step
\t\t\t\t      dim-observation dim-comparison dim-classification dim-description -dimension
\t\t\t\t)
\t\t\t\t(:init
\t\t\t\t${init}
\t\t\t\t\t\t\t(= (time-required-lo-link lo11 lo12) 5)
\t\t\t\t\t\t\t(= (time-required-lo-link lo12 lo14) 10)
\t\t\t\t\t\t\t(= (time-required-lo-link lo12 lo13) 5)
\t\t\t\t\t\t\t(= (time-required-lo-link lo11 lo13) 5)
\t\t\t\t\t\t\t(= (time-required-lo-link lo13 lo14) 5)

\t\t\t\t\t\t\t(= (reward-lo-link lo11 lo12) 10)
\t\t\t\t\t\t\t(= (reward-lo-link lo11 lo13) 10)
\t\t\t\t\t\t\t(= (reward-lo-link lo12 lo13) 10)
\t\t\t\t\t\t\t(= (reward-lo-link lo12 lo14) 20)
\t\t\t\t\t\t\t(= (reward-lo-link lo13 lo14) 20)

\t\t\t\t\t\t\t(= (reward-lo-link lo12 lo21) 15)
\t\t\t\t\t\t\t(= (reward-lo-link lo13 lo22) 15)
\t\t\t\t\t\t\t(= (reward-lo-link lo14 lo24) 15)

\t\t\t\t\t\t\t(= (reward-lo-link lo21 lo22) 10)
\t\t\t\t\t\t\t(= (reward-lo-link lo22 lo23) 10)
\t\t\t\t\t\t\t(= (reward-lo-link lo22 lo24) 20)
\t\t\t\t\t\t\t(= (reward-lo-link lo23 lo24) 20)

\t\t\t\t\t\t\t(= (reward-lo-link lo22 lo31) 15)
\t\t\t\t\t\t\t(= (reward-lo-link lo23 lo32) 15)
\t\t\t\t\t\t\t(= (reward-lo-link lo24 lo34) 15)

\t\t\t\t\t\t\t(= (reward-lo-link lo31 lo22) 10)
\t\t\t\t\t\t\t(= (reward-lo-link lo32 lo33) 10)
\t\t\t\t\t\t\t(= (reward-lo-link lo32 lo33) 10)
\t\t\t\t\t\t\t(= (reward-lo-link lo33 lo34) 20)

\t\t\t\t\t\t\t(= (learning-path-time) 0)
\t\t\t\t\t\t\t(= (learning-path-reward) 0)
\t\t\t\t)
\t\t\t\t(:goal
\t\t\t\t\t\t\t(and ${goal})
\t\t\t\t)
\t\t\t\t(:metric maximize
\t\t\t\t\t\t\t(learning-path-reward)
\t\t\t\t)

)`;
}

const generatePlan = (objects, init, goal) =>
  new Promise((resolve, reject) => {
    let domain = fs.readFileSync(
      path.join(__dirname, "pddl", "domain.pddl"),
      "utf8"
    );
    let problem = generateTemplate(objects, init, goal);
    let url = "http://solver.planning.domains/solve-and-validate";
    let contentType = "application/json";
    let data = { domain, problem };

    axios
      .post(url, data, { headers: { "Content-Type": contentType } })
      .then((response) => {
        //res.send(response.data);
        resolve(response);
      })
      .catch((error) => {
        if (error.response) {
          //res.send(error.response.data);
          reject(error.response.data);
        }
      });
  });
