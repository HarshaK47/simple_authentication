//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mysql = require("mysql");



var conn = mysql.createConnection({
    host: 'localhost', 
    user: 'root',      
    password: 'root',      
    database: 'users' 
}); 
  
conn.connect(function(err) {
    if (err) throw err;
    console.log('Database is connected successfully !');
});
module.exports = conn;



const app = express();
app.use(express.static("public"));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
}));


app.get("/", function(req,res){
    res.render("home");
});
app.get("/login", function(req,res){
    res.render("login");
});
app.get("/register", function(req,res){
    res.render("register");
});


app.post("/register", function(req,res){
    var username = req.body.username;
    var password = req.body.password;
    conn.query('INSERT into user_reg VALUES (?,?);',[username,password], function(error,results,fields){
        res.render("secrets");
    });
});

app.post("/login", function(req,res){
    var username = req.body.username;
    var password = req.body.password;
    conn.query('SELECT * FROM user_reg WHERE username=? AND password=?',[username,password], function(error,results,fields){
        if(results.length > 0){
            res.render("secrets");
        }
        else{
            console.log("Incorrect email or password.");
            res.render("login");
        }
    });
})


app.listen(3000, function(){
    console.log("Server started on port 3000.");
});
