const strips = require("strips");
const path = require("path");

exports.generatePlan = (req, res) =>
  new Promise((resolve, reject) => {
    //var objpaths = '{"paths":{"path1":{},"path2":{}}}';
    var objpaths = '{"paths":{}}';
    var responsePathJson = JSON.parse(objpaths);
    var response_page = "";
    // Load the domain and problem.
    strips.load(
      path.join(__dirname, "pddl", "domain.pddl"),
      path.join(__dirname, "pddl", "problem.pddl"),
      function (domain, problem) {
        // Run the problem against the domain.
        var solutions = strips.solve(domain, problem);
        // Display each solution.
        for (var i in solutions) {
          var solution = solutions[i];
          response_page =
            "- Solution found in " +
            solution.steps.toString() +
            " steps!" +
            "<br>";
          for (var i = 0; i < solution.path.length; i++) {
            obj_seq = i + 1;
            var newpath = "step0" + obj_seq.toString();
            obj_key = '"i":"' + obj_seq.toString() + '"';
            obj_value = '"solution":"' + solution.path[i].toString() + '"';
            p = JSON.parse("{ " + obj_key + "," + obj_value + "}");
            responsePathJson.paths[newpath] = p;
          }
          response_page = response_page + JSON.stringify(responsePathJson);
          console.log(response_page);
          res.write(response_page);
        }
        //res.send(response_page);
      }
    );
    console.log(response_page);
    resolve(res.end(response_page));
  });
