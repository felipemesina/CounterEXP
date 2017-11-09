const express = require ("express");
const session = require('express-session');
const bodyParser = require('body-parser');
const port = process.env.PORT || 8000;
const app = express();




app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(session({secret: 'codingdojo'}));
app.use(express.static(__dirname + "/static"));
app.use(bodyParser.urlencoded({extended: true}));


app.get('/', function(request, response) {
  response.send("<h1>Hello Express</h1>");
});


app.get('/index', (request, res) => {
  res.render('index', { counter: addOneToCounter(request) });
});


app.post('/by-two', (request, response) => {
  addOneToCounter(request);
  response.redirect('/');
});


app.post('/reset', (request, response) => {
  request.session.destroy();
  response.redirect('/');
});

app.get('/users', function (request, response){
  var users_array = [
    {name: "Michael", email: "michael@codingdojo.com"},
    {name: "Jay", email: "jay@codingdojo.com"},
    {name: "Brendan", email: "brendan@codingdojo.com"},
    {name: "Andrew", email: "andrew@codingdojo.com"}
  ];
  response.render('users', {users: users_array});
});


app.get("/users/:id", function (req, res){
  console.log("The user id requested is: ", req.params.id);
  res.send("You requested the user with id: " + req.params.id);
});


app.post('/users', function (req, res) {
  console.log("POST DATA \n\n", req.body)
  res.redirect('/')
});


function addOneToCounter(request) {
  return request.session.counter = request.session.counter ?
                                    request.session.counter + 1 : 1;
}


app.listen(port, () => console.log(`listening on port ${ port }`));
