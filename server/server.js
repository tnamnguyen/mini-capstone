const express = require('express')
const app = express()
const port = 3001
const cors = require('cors')
const bodyParser = require("express");
const bcrypt = require('bcrypt');


// server mongodb
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://test_user:test_user12345@minicapstone.nfejagl.mongodb.net/?retryWrites=true&w=majority")
.then(()=> console.log("success")).catch(()=> console.log("fail"))

const User = require("./model.js");


//////////////////////////////////////////
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Server is running')
})

app.post('/login', (req, res) => {
  // Get the username and password from the request body
  const { username, password } = req.body;
  console.log(req.body.username)
  console.log(req.body.password)

  // Perform validation and authentication
  // ...

  // Send a response to the client
  res.json({
    success: true,
    message: 'Successfully logged in'
  });
});

app.post('/signup', (req, res) => {
  // Get the username, password, and email from the request body
  const { username, email, password } = req.body;
  console.log(req.body.username)
  console.log(req.body.email)
  console.log(req.body.password)

  var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://test_user:test_user12345@minicapstone.nfejagl.mongodb.net/?retryWrites=true&w=majority";

MongoClient.connect(url, function(err, db) 
{
  if (err) throw err;
  var dbo = db.db("Accounts");


// /Perform validation /////////////////////////////////////////////////
dbo.collection("users").findOne( { email: req.body.email },
  (err, user) => {
                    if (err) {
                        mongoose.connection.close();
                        res.status(500).json({ error: err });
                    } else {
                                    if (user) {
                                        mongoose.connection.close();
                                        res.status(400).json({ message: 'Email already exists' });
                                    } 




///////////////////////////////////// Hash the password/////////////////////////////////
                                    else{
                                      bcrypt.hash(req.body.password, 10, (err, hashedPassword) => 
                                      {
                                                  if (err) {
                                                      mongoose.connection.close();
                                                      res.status(500).json({ error: err });
                                                  } 



//////////////////////////////////////Create new query/////////////////////////////////////
                                                  else{
                                                    {var myquery = { username: req.body.username,
                                                  email:req.body.email ,
                                                  password:hashedPassword
                                                            };




//////////////////////////////////////////////// Save the new user to the database///////////////////////////////////////////////
                                                dbo.collection("users").insertOne(myquery, function(err, res) {
                                                  if (err) throw err; 
                                                  console.log("1 document updated");
                                                  db.close();
                                                            })
                                                          
                                                          }
                                                        }                                                      
                                                 }
                                          )

                                       }
                               }
                         }
                   )
             }
      );

 

            

 

  // Send a response to the client- not working
  res.json({
    success: true,
    message: 'Successfully signed up'
  });
});



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

module.exports = app;