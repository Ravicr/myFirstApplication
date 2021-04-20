//ThirdParty Module
const express = require('express');
const bodyParser = require('body-parser');
const wayscript = require('wayscript');
const request1 = require('request-promise');
const app = express();
const path = require('path');
const expressValidator = require('express-validator');
const expressSession = require('express-session');
const ls = require('local-storage');
const store = require('store2');

const morgan = require('morgan');
const uuid = require('uuid');
const headers = require('./webpage');

// Configure Express to use EJS
app.set( "views", path.join( __dirname, "views" ) );

app.set( "view engine", "ejs");
app.use(express.static('img'));
app.use(express.static('css'));
app.use(express.static('js'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
var urlencoded = bodyParser.urlencoded({ extended: false });
app.use(expressSession({secret: 'max', saveUninitialized:false, resave:false}));
//Middleware
app.use(morgan('dev'));

/*app.use((req,res,next) => {
    console.log("Entered MiddleWare");
    next();
});*/

const myPersons =
[
    {
        id:uuid.v4(),
        name:"Ravi",
        age:"31"
    },
    {
       id:uuid.v4(),
       name:"Raji",
       age:"28"
    },
    {
        id:uuid.v4(),
        name:"Yazhini",
        age:"03"
    },
]

//Home Page
app.get('/',(req,res) =>{
    console.log("Response value is  "+req);
    var existing = ls.get('Distrubance');
    console.log(existing)
    res.render('index',{data : existing});

});

app.post('/',urlencoded,(req,res) =>{
    //console.log(req.body);

    if(ls.get('Distrubance') == null){
        ls.set('Distrubance', []);
    }
    var existing = ls.get('Distrubance');
    existing.push(req.body);
    ls.set('Distrubance', existing);
    console.log("Local Storage Value ",ls.get('Distrubance'));
    const slackbody = {
        mkdwn: true,
        text : 'This is a really great to post in slack',
        attachments: [
            {
                mrkdwn_in: ["text"],
                color : "#FFBE33",
                title: "Disturbance",
                text: "Problem with Order Placement with country",
                author_name: "Ravichandiran Rajendiran",
                fields:[{
                    title: "Problem Description",
                    value: "RU Market PayOrder Issue, so customer unable to access payorder link. Its complete down",
                    short: false
                    },
                    {
                    title: "Problem Reported time",
                    value: "Issue start time : 09:45 CET",
                    short: true
                    },
                    {
                        title: "Impacted Markets",
                        value: "Russia",
                        short: true
                    },
                    {
                        title: "Business Impact",
                        value: "customer unable to access payorder link. Its complete down",
                        short: false
                    },
                    {
                        title: "Root Cause ",
                        value: "Currently Investigation Ongoing with Order Capture and downstream system. We will keep update on this.",
                        short: false
                    }

                    ],
                    footer:"footer",
                    footer_icon: "https://platform.slack-edge.com/img/default_application_icon.png",
                    ts: 123456789

            }]

    };
    //Post to slack
    const res1= request1({
    url: 'https://hooks.slack.com/services/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',
    method: 'POST',
    body: slackbody,
    json: true
    });

    res.render('index',{data : ls.get('Distrubance')});
});


//Issue Page
app.get('/openIssue',(req,res) =>{
    res.render("openIssue");

});

//Report Page
app.get('/reportPage',(req,res) =>{
     var existing = ls.get('Distrubance');
        console.log(existing)
        res.render('reportview',{data : existing});

});
//Get All
app.get('/about',(req,res) =>{
    res.status(200).json(myPersons);
});

//Get
app.get('/:id',async(req,res) =>{
const getOne = await myPersons.filter(e =>e.id === req.params.id)
res.status(200).json(getOne);
});

//Local host
const PORT = process.env.PORT || 2500;

app.listen(PORT,() => {
console.log(`Server Started On ${PORT}`);
});
