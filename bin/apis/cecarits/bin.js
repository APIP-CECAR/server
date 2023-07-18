let plan = [
  {
    action:
      "  (:action learning-progress\n    :parameters (student_6492fe5fd8eb5727aea70eaa n0ct n1obs01)\n    :precondition\n      (and\n        (precondition n1obs01 ?to)\n        (achieved-process student_6492fe5fd8eb5727aea70eaa n1obs01)\n        (not\n          (achieved-process student_6492fe5fd8eb5727aea70eaa ?to)\n        )\n      )\n    :effect\n      (and\n        (achieved-process student_6492fe5fd8eb5727aea70eaa ?to)\n        (increase learning-path-reward reward-progress-to)\n        (increase learning-path-cost cost-progress-to)\n      )\n  )",
    name: "(learning-progress student_6492fe5fd8eb5727aea70eaa n0ct n1obs01)",
  },
  {
    action:
      "  (:action learning-progress\n    :parameters (student_6492fe5fd8eb5727aea70eaa n1obs01 n1com01)\n    :precondition\n      (and\n        (precondition n1com01 ?to)\n        (achieved-process student_6492fe5fd8eb5727aea70eaa n1com01)\n        (not\n          (achieved-process student_6492fe5fd8eb5727aea70eaa ?to)\n        )\n      )\n    :effect\n      (and\n        (achieved-process student_6492fe5fd8eb5727aea70eaa ?to)\n        (increase learning-path-reward reward-progress-to)\n        (increase learning-path-cost cost-progress-to)\n      )\n  )",
    name: "(learning-progress student_6492fe5fd8eb5727aea70eaa n1obs01 n1com01)",
  },
  {
    action:
      "  (:action learning-progress\n    :parameters (student_6492fe5fd8eb5727aea70eaa n1com01 n1cla03)\n    :precondition\n      (and\n        (precondition n1cla03 ?to)\n        (achieved-process student_6492fe5fd8eb5727aea70eaa n1cla03)\n        (not\n          (achieved-process student_6492fe5fd8eb5727aea70eaa ?to)\n        )\n      )\n    :effect\n      (and\n        (achieved-process student_6492fe5fd8eb5727aea70eaa ?to)\n        (increase learning-path-reward reward-progress-to)\n        (increase learning-path-cost cost-progress-to)\n      )\n  )",
    name: "(learning-progress student_6492fe5fd8eb5727aea70eaa n1com01 n1cla03)",
  },
  {
    action:
      "  (:action learning-progress\n    :parameters (student_6492fe60d8eb5727aea70eb4 n0ct n1obs01)\n    :precondition\n      (and\n        (precondition n1obs01 ?to)\n        (achieved-process student_6492fe60d8eb5727aea70eb4 n1obs01)\n        (not\n          (achieved-process student_6492fe60d8eb5727aea70eb4 ?to)\n        )\n      )\n    :effect\n      (and\n        (achieved-process student_6492fe60d8eb5727aea70eb4 ?to)\n        (increase learning-path-reward reward-progress-to)\n        (increase learning-path-cost cost-progress-to)\n      )\n  )",
    name: "(learning-progress student_6492fe60d8eb5727aea70eb4 n0ct n1obs01)",
  },
  {
    action:
      "  (:action learning-progress\n    :parameters (student_6492fe60d8eb5727aea70eb4 n1obs01 n1com01)\n    :precondition\n      (and\n        (precondition n1com01 ?to)\n        (achieved-process student_6492fe60d8eb5727aea70eb4 n1com01)\n        (not\n          (achieved-process student_6492fe60d8eb5727aea70eb4 ?to)\n        )\n      )\n    :effect\n      (and\n        (achieved-process student_6492fe60d8eb5727aea70eb4 ?to)\n        (increase learning-path-reward reward-progress-to)\n        (increase learning-path-cost cost-progress-to)\n      )\n  )",
    name: "(learning-progress student_6492fe60d8eb5727aea70eb4 n1obs01 n1com01)",
  },
  {
    action:
      "  (:action learning-progress\n    :parameters (student_6492fe60d8eb5727aea70eb4 n1com01 n1cla03)\n    :precondition\n      (and\n        (precondition n1cla03 ?to)\n        (achieved-process student_6492fe60d8eb5727aea70eb4 n1cla03)\n        (not\n          (achieved-process student_6492fe60d8eb5727aea70eb4 ?to)\n        )\n      )\n    :effect\n      (and\n        (achieved-process student_6492fe60d8eb5727aea70eb4 ?to)\n        (increase learning-path-reward reward-progress-to)\n        (increase learning-path-cost cost-progress-to)\n      )\n  )",
    name: "(learning-progress student_6492fe60d8eb5727aea70eb4 n1com01 n1cla03)",
  },
  {
    action:
      "  (:action learning-progress\n    :parameters (student_6492fe61d8eb5727aea70ebe n0ct n1obs01)\n    :precondition\n      (and\n        (precondition n1obs01 ?to)\n        (achieved-process student_6492fe61d8eb5727aea70ebe n1obs01)\n        (not\n          (achieved-process student_6492fe61d8eb5727aea70ebe ?to)\n        )\n      )\n    :effect\n      (and\n        (achieved-process student_6492fe61d8eb5727aea70ebe ?to)\n        (increase learning-path-reward reward-progress-to)\n        (increase learning-path-cost cost-progress-to)\n      )\n  )",
    name: "(learning-progress student_6492fe61d8eb5727aea70ebe n0ct n1obs01)",
  },
  {
    action:
      "  (:action learning-progress\n    :parameters (student_6492fe61d8eb5727aea70ebe n1obs01 n1com01)\n    :precondition\n      (and\n        (precondition n1com01 ?to)\n        (achieved-process student_6492fe61d8eb5727aea70ebe n1com01)\n        (not\n          (achieved-process student_6492fe61d8eb5727aea70ebe ?to)\n        )\n      )\n    :effect\n      (and\n        (achieved-process student_6492fe61d8eb5727aea70ebe ?to)\n        (increase learning-path-reward reward-progress-to)\n        (increase learning-path-cost cost-progress-to)\n      )\n  )",
    name: "(learning-progress student_6492fe61d8eb5727aea70ebe n1obs01 n1com01)",
  },
  {
    action:
      "  (:action learning-progress\n    :parameters (student_6492fe61d8eb5727aea70ebe n1com01 n1cla03)\n    :precondition\n      (and\n        (precondition n1cla03 ?to)\n        (achieved-process student_6492fe61d8eb5727aea70ebe n1cla03)\n        (not\n          (achieved-process student_6492fe61d8eb5727aea70ebe ?to)\n        )\n      )\n    :effect\n      (and\n        (achieved-process student_6492fe61d8eb5727aea70ebe ?to)\n        (increase learning-path-reward reward-progress-to)\n        (increase learning-path-cost cost-progress-to)\n      )\n  )",
    name: "(learning-progress student_6492fe61d8eb5727aea70ebe n1com01 n1cla03)",
  },
];

function interpretActions(plan) {
  plan.forEach((action) => {
    const regex = /(:action\s+)([^\s]+)/;
    const match = action.action.match(regex);
    if (match) {
      const actionName = match[2];
      console.log(`Action Name: ${actionName}`);
      console.log("Parameters:");
      action.action.split("\n").forEach((line) => {
        if (line.includes(":parameters")) {
          const parameters = line.split("(")[1].split(")")[0].split(" ");
          parameters.forEach((parameter) => {
            if (parameter !== "") {
              console.log(`- ${parameter}`);
            }
          });
        }
      });
      console.log("Preconditions:");
      action.action.split("\n").forEach((line) => {
        if (line.includes("(and")) {
          const preconditions = line
            .split("(and ")[1]
            .split(")")[0]
            .split("\n");
          preconditions.forEach((precondition) => {
            if (precondition !== "") {
              console.log(`- ${precondition.trim()}`);
            }
          });
        }
      });
      console.log("Effects:");
      action.action.split("\n").forEach((line) => {
        if (line.includes(":effect")) {
          const effects = line.split("(and ")[1].split(")")[0].split("\n");
          effects.forEach((effect) => {
            if (effect !== "") {
              console.log(`- ${effect.trim()}`);
            }
          });
        }
      });
      console.log("--------------------------------");
    }
  });
}

interpretActions(plan);
