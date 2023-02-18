const express = require('express')
const app = express()
const port = 3001
const cors = require('cors')
const bodyParser = require("express")
const bcrypt = require('bcrypt')
const mongoose = require("mongoose")
const session = require("express-session")
const User = require("./model.js")
const jwt = require('jsonwebtoken')



// **************************************** Connecting to Mongoose DB **************************************** //
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://test_user:test_user12345@minicapstone.nfejagl.mongodb.net/?retryWrites=true&w=majority"
function connectToMongooseDB(){
  mongoose.set("strictQuery", false);
  mongoose.connect(url)
    .then(()=> console.log("Connected to Mongoose DB!\n"))
    .catch(()=> console.log("Unable to connect to Mongoose DB!"))
}
connectToMongooseDB();



// **************************************** Setting Up JWT **************************************** //

//Function taking a token as input and checking if a user is signed-in
function authenticateToken(req, res, next){
  const token = req.body.accessToken
  if(token == null){ 
    res.isLoggedIn = false
    next()
  }
  else{
    jwt.verify(token, "jwtsecret", (err, user) => {
      if (err) {
        res.isLoggedIn = false 
        console.log("Error! Given JWT secret might not be matching!")
        res.isLoggedIn = false
        next()
      }
      else{
        res.user = user
        res.isLoggedIn = true
        next()
      }
    })
  }
}




// **************************************** Home **************************************** //

app.post('/home', authenticateToken, (req, res) => {
  if(res.isLoggedIn){
    res.send({
      "isLoggedIn": res.isLoggedIn, 
      "user": res.user
    })
  }
})




// **************************************** Login **************************************** //

app.post('/login', async(req, res) => {
  // The response generated from this function consists of 
  // a boolean stating if there is an error as well as an error message
  // in case of an error
  const anyError = false
  const erorrMessage = 'No errors detected'

  // Get the username and password from the request body
  const login_email = req.body.email
  const login_password = req.body.password
 
  //Connecting to the specific database and collection
  const database_name = "Accounts"
  const collection_name = "users"
  mongoose.set("strictQuery", false);
  const db_client =  await MongoClient.connect(url) 
  const dbo = db_client.db(database_name)
  
  //In order to succesfully sign in, the following checks must be validated:
  const filledFields = false    //Both fields need to have values
  const email_valid = false     //Email must exist in database
  const password_match = false  //password must match given email


  //Function that compares user password with database password
  function authenticatePassword(param1, param2) {
    return new Promise(function(resolve, reject) {
        bcrypt.compare(param1, param2, function(err, res) {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
  }

  //Check if email exists in database
  const databasePassword = ""
  const user_id = -1
  const user_userName = ""
  const user_email = ""
  const user_password = ""
  await dbo.collection(collection_name).findOne( { email: login_email })
  .then(result => {
    //If email doesn't exist
    if (!result){
      email_valid = false
      anyError = true
      erorrMessage = "Invalid email, we don't have this email in our database!"
    }
    //If email exists 
    else{
      user_id = result._id
      user_userName = result.name
      user_email = result.email
      user_password = result.password
      databasePassword = result.password
      email_valid = true
    }
  })
  .catch(err => {
    console.log("Error:" + err)
  })
  

  //Check if password corresponds to given email
  password_match =  await authenticatePassword(login_password, databasePassword)
  if(!password_match)
  {
    anyError = true
    if (erorrMessage == 'No errors detected')
    {
      erorrMessage = "Invalid password, please try again!"
    }
  }


  //Check if both fields were filled
  if(login_email == "" || login_password == ""){
    filledFields = false
    anyError = true
    erorrMessage = "Some fields are missing, please fill all fields!"
  }
  else{
    filledFields = true
  }

  //Sending back response to front end
  if (anyError){
    res.json({
      isError: "True", 
      message: erorrMessage
    })
  }
  else{
    //User info
    const user_info = {
      id: user_id,
      name: user_userName, 
      email: user_email, 
      password: user_password
    }

    //Creating a JWT token with user information
    const token = jwt.sign(user_info, "jwtsecret", {
      expiresIn: 300000
    })

    //Sending success message to front end as well as token to be stored locally
    res.json({
      isError: "False", 
      message: "Successfully Signed-in! Redirecting to main page...",
      token: token, 
    })
  }
});











// **************************************** Signup **************************************** //

app.post('/signup', async(req, res) => {

  // The response generated from this function consists of 
  // a boolean stating if there is an error as well as an error message
  // in case of an error
  var anyError = false
  var erorrMessage = 'No errors detected'

  // Storing the username, password, and email from the request body
  const input_name = req.body.username
  const input_email = req.body.email
  const input_password = req.body.password
  const input_confirm_password = req.body.passwordConfirm

  //Connecting to the specific database and collection
  const database_name = "Accounts"
  const collection_name = "users"
  mongoose.set("strictQuery", false);
  const db_client =  await MongoClient.connect(url) 
  const dbo = db_client.db(database_name)


  //Check if password match confirmPassword
  const passwordMatch = false
  if (input_password == input_confirm_password){
    passwordMatch = true
  }
  else{
    anyError = true
    erorrMessage = "Error! Passwords don't match, Please try again!"
  }


  //Check if email is already stored in the database
  const match_user = await dbo.collection(collection_name).findOne( { email: input_email })
  if(match_user){
    duplicatedEmail = true
    anyError = true
    erorrMessage = "Error! email already registered in database, Please try again!"
  }
  else{
    duplicatedEmail = false
  }


  //Hashing the password before storing it in database
  const hashedPassword = ''
  bcrypt.hash(req.body.password, 10, (err, hp) => {
    if (err) {
      mongoose.connection.close();
      res.status(500).json({ error: err });
    }
    hashedPassword = hp
  })


  // New user that will be added to database
  const signedUpUser = new User({
    name: input_name,
    email: input_email,
    password: hashedPassword
  })
            

  //Storing the new registered user if all checks are completed
  if(!passwordMatch){
    console.log("Error! Passwords don't match")
  }
  if (duplicatedEmail){
    console.log("Error! Email already exists in database, Please try again!\n")
  }
  if (passwordMatch &&  !duplicatedEmail){
    dbo.collection(collection_name).insertOne(signedUpUser, function(err, res) {
      if (err) throw err; 
      console.log("-> 1 New User succesfully added to the " + database_name + " database inside the " + collection_name + " collection!");
      db_client.close();
    })
  }
  

  //Sending back response to front end
  if (anyError){
    return res.send({isError: "True", message: erorrMessage})
  }
  else{
    return res.send({isError: "False", message: "User succesfully added to database, Redirecting to login page..."})
  }


});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})