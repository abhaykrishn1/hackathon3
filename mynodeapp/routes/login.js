const express   = require('express')
const mysql     = require('mysql')
const config    = require('config')
const route     = express.Router();

const dbConnectionDetails ={
    host        : config.get("dbSettings.host"),
    user        : config.get("dbSettings.user"),
    password    : config.get("dbSettings.password"),
    database    : config.get("dbSettings.database")
}

route.get('/',(req,res)=>{
    var dbConnection = mysql.createConnection(dbConnectionDetails)
    var statement = "select * from users_tbl";     //select * from t_logins

    dbConnection.query(statement,(error,result)=>{
        if(error == null){
            res.setHeader("Content-Type","application/json");
            var data = JSON.stringify(result);
            dbConnection.end();
            res.send(result);
        }
        else{
            res.setHeader("Content-Type","application/json");
            dbConnection.end();
            res.send(error);
        }
    })
})

route.post("/",(req,res)=>{
    console.log(req.body);
    var dbConnection = mysql.createConnection(dbConnectionDetails)

    var statement = `insert into users_tbl( first_name,last_name, email, password )
    values ('${req.body.first_name}','${req.body.last_name}',
            '${req.body.email}','${req.body.password}')` 

    // `insert into t_logins (firstName,lastName,email,mobileNo,address,password)
    // values ('${req.body.firstName}','${req.body.lastName}',
    //         '${req.body.email}','${req.body.mobileNo}',
    //         '${req.body.address}','${req.body.password}')`

    console.log(statement);

    dbConnection.query(statement,(error,result)=>{
        if(error == null){
            res.setHeader("Content-Type","application/json");
            var data = JSON.stringify(result);
            dbConnection.end();
            res.send(result);
        }
        else{
            res.setHeader("Content-Type","application/json");
            dbConnection.end();
            res.send(error);
        }
    })
})
//login should work


//
route.put("/:ID",(req,res)=>{
    console.log(req.body);
    var dbConnection = mysql.createConnection(dbConnectionDetails);
    var statement = 
    `update t_logins 
    SET firstName= '${req.body.firstName}',lastName = '${req.body.lastName}',
        email    = '${req.body.email}',    mobileNo = '${req.body.mobileNo}',
        address  = '${req.body.address}',  password = '${req.body.password}'
    WHERE loginID = ${req.params.ID};`

    console.log(statement);
    dbConnection.query(statement,(error,result)=>{
        if(error == null){
            res.setHeader("Content-Type","application/json");
            //var data = JSON.stringify(result);
            dbConnection.end();
            res.send(result);
        }
        else{
            res.setHeader("Content-Type","application/json");
            dbConnection.end();
            res.send(error);
        }
    })
})

route.delete("/:ID",(request,response)=>{
    console.log(request.params.ID)//header data
  
    var dbConnection = mysql.createConnection(dbConnectionDetails);
    var statement = `delete from t_logins where loginID = ${request.params.ID}`;

    console.log(statement);
    dbConnection.query(statement, (error, result)=>{
        if(error==null){
            response.setHeader("Content-Type","application/json");
            var data = JSON.stringify(result);
            dbConnection.end();
            response.send(data);
        }
    else{
        response.setHeader("Content-Type","application/json");
        response.send(error);
    }
    })
})

module.exports = route;


//To test
//get : http://127.0.0.1:5000/login

//post: http://127.0.0.1:5000/login
// {
//     "firstName": "priya",
//     "lastName": "chavan",
//     "email": "priyagangan@gmail.com",
//     "mobileNo": "9372417465",
//     "address": "ratnagiri",
//     "password": "priya2808"
// }

//put : http://127.0.0.1:5000/login/3
// {
//     "mobileNo": "9702877947"
// }

//delete :
//http://127.0.0.1:5000/login/3
