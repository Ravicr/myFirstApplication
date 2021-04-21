//LocalModule (local functions create)
//CoreModule(In build methods)
// ThirdPartyModule (Module defined and created by others)

console.log("Welcome Ravichandiran");
const global= require('./index');
const classes = require('./class');
global.myFunc();
console.log(global.x);

var obj = new classes.myClass("Ravichandiran");

obj.myFunc();
console.log("Addition value is "+obj.myAddition());
console.log("Variable  value is "+classes.number);
const http = require('http');

const app = http.createServer((req,res) => {
    res.end('<h1> Home </h1>');
});

const PORT = process.env.PORT || 2500;

app.listen(PORT,() => {
console.log(`Server Started On ${PORT}`);
});
