const express = require('express')
const strips = require('strips');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

//app.use(express.static('public'));
// Create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false });

//const response_page='';




app.get('/', (req, res) => {
  //res.sendFile( __dirname + "/" + "index.htm" );
  res.sendFile(__dirname + "/templates/" + "index.html"  );
 // var response_page = '';
});
  

app.post('/process_post', urlencodedParser, function (req, res) {
  //var objpaths = '{"paths":{"path1":{},"path2":{}}}';
  var objpaths = '{"paths":{}}';
  var responsePathJson  = JSON.parse(objpaths);
  var response_page='';
  // Load the domain and problem.
  strips.load('./pddl/domain.txt', './pddl/problem.txt',  function(domain, problem) {
    // Run the problem against the domain.
    var solutions = strips.solve(domain, problem);
    // Display each solution.
    for (var i in solutions) {
      var solution = solutions[i];
      response_page =  '- Solution found in ' + solution.steps.toString() + ' steps!' + '<br>';
      for (var i = 0; i < solution.path.length; i++) {            
        obj_seq = i + 1;
        var newpath = 'step0'+ obj_seq.toString();
        obj_key = '"i":"' + obj_seq.toString()+'"';
        obj_value = '"solution":"'+solution.path[i].toString()+'"';
        p = JSON.parse('{ '+obj_key+','+obj_value+'}');
        responsePathJson.paths[newpath] = p;
      } 
      response_page=response_page+JSON.stringify(responsePathJson)
      console.log(response_page); 
      res.write(response_page);
    };
    //res.send(response_page);  
   
  });
  console.log(response_page); 
  res.end(response_page);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});

app.get('/home', (req, res) => {
  res.send('Home Page');
});
app.get('/about', (req, res) => {
  res.send('About');
});