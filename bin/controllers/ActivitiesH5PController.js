/* This module update status of students 
input data:
{
    studentId: 64a5a3acc243ba7fb529a4bd,  
    competence: comparison,
    skill: n1com1,
    value:true,
    statement: {
        "actor": {
            "account": {
                "name": "41a79436-073d-495b-88ab-99e951788441"
            },
            "objectType": "Agent"
        },
        "verb": {
            "id": "http://adlnet.gov/expapi/verbs/answered",
            "display": {
                "en-US": "answered"
            }
        },
        "object": {
            "id": "http://localhost:5000/h5p/1690336079437-292857138",
            "objectType": "Activity",
            "definition": {
                "extensions": {
                    "http://h5p.org/x-api/h5p-local-content-id": "default"
                },
                "name": {
                    "en-US": "Ejemplo de Realidad Aumentada"
                },
                "description": {
                    "en-US": "La realidad aumentada es el mecanismo por el cual obtenemos mas informacion de la realidad a traves de un disposivito digital como el celular o las gafas de RV\n"
                },
                "type": "http://adlnet.gov/expapi/activities/cmi.interaction",
                "interactionType": "true-false",
                "correctResponsesPattern": [
                    "true"
                ]
            }
        },
        "context": {
            "contextActivities": {
                "category": [
                    {
                        "id": "http://h5p.org/libraries/H5P.TrueFalse-1.8",
                        "objectType": "Activity"
                    }
                ]
            }
        },
        "result": {
            "score": {
                "min": 0,
                "max": 1,
                "raw": 1,
                "scaled": 1
            },
            "completion": true,
            "success": true,
            "duration": "PT2.9S",
            "response": "true"
        }
    }
}

*/

const Status = require("../models/Status");
// set true value to Update on status model competences skill
exports.processActivities = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  let { studentId, competence, skill, value, statement } = req.body;

  let update = {
    $set: {
      [`${competence}.${skill}`]: true,
    },
  };

  // Update Status in the database
  Status.findOneAndUpdate(
    {
      student: studentId,
    },
    update,
    { new: true, upsert: true }
  )
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while updating the Status.",
      });
    });
};
