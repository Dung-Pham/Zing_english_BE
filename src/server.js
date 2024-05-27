import  Express  from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from './routes/web';
//import connectDB from './config/connectDB';// connect use sequelize
import connection from "./config/database";
import bodyParser from "body-parser";
let cors = require('cors');

require("dotenv").config();

const app= Express();

let URL_REACT="http://localhost:3000";
const corsOptions = {
    origin: URL_REACT,
    optionsSuccessStatus: 200,
    credentials: true
}
app.use(cors(corsOptions));
// app.use(function (req, res, next) {

//     // Website you wish to allow to connect
//     res.setHeader('Access-Control-Allow-Origin', "*");
//     //console.log("ji")
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//     // Request headers you wish to allow
//    // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//     // Set to true if you need the website to include cookies in the requests sent
//     // to the API (e.g. in case you use sessions)
//     res.setHeader('Access-Control-Allow-Credentials', true);

//     // Pass to next layer of middleware
//     next();
// });

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// config view
configViewEngine(app);
 
//init web r

initWebRoutes(app);

//connectDB(); 
 
//connection.query;



const PORT= process.env.PORT|| 8080;
const hostname= 'localhost';
app.listen(PORT, ()=>
{
    console.log("hello");
});