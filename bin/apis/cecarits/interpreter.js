function interpreterPlan(actionList) {
  let plansForSstudents = {};
  // Procesar cada acción
  actionList.forEach((action) => {
    const actionData = extractActionData(action);
    const { parameters, precondition, effect } = actionData;

    // Asigna los datos a las variables correspondientes
    const [param, student, to] = parameters;
    // add to per students
    if (plansForSstudents[student] === undefined) {
      plansForSstudents[student] = [];
    }
    plansForSstudents[student].push(to);
  });

  return plansForSstudents;
}
function extractActionData(action) {
  const regex =
    /:parameters \((.*?)\)\s*:precondition\s*([\s\S]*?)\s*:effect\s*([\s\S]*?)\s*\)/;
  const [parameters, precondition, effect] = action.match(regex);

  const parameterList = parameters
    .replace(/[()]/g, "")
    .split(" ")
    .filter((param) => param.trim() !== "");

  return {
    parameters: parameterList,
    precondition: precondition.trim(),
    effect: effect.trim(),
  };
}

module.exports = interpreterPlan;
