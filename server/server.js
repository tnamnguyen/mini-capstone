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



// **************************************** Setting Up Sessions & JWT **************************************** //
app.use(
  session({
    secret: "jwtsecret",
    saveUninitialized: true,
    user: {},
    token: null,
    resave: false,
    cookie:{
      httpOnly: true,
      maxAge: 36000 
    }
  })
);


// **************************************** Home **************************************** //

app.get('/', (req, res) => {
  res.send('Server is running')
})




// **************************************** Login **************************************** //

app.post('/login', async(req, res) => {

  // The response generated from this function consists of 
  // a boolean stating if there is an error as well as an error message
  // in case of an error
  var anyError = false
  var erorrMessage = 'No errors detected'

  // Get the username and password from the request body
  const { email, password } = req.body;
  login_email = req.body.email
  login_password = req.body.password
 
  //Connecting to the specific database and collection
  const database_name = "Accounts"
  const collection_name = "users"
  mongoose.set("strictQuery", false);
  const db_client =  await MongoClient.connect(url) 
  const dbo = db_client.db(database_name)
  
  //In order to succesfully sign in, the following checks must be validated:
  var filledFields = false    //Both fields need to have values
  var email_valid = false     //Email must exist in database
  var password_match = false  //password must match given email


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
  var databasePassword = ""
  var user_id = -1
  var user_userName = ""
  var user_email = ""
  var user_password = ""
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
      message: erorrMessage,
      auth: true
    })
  }
  else{
    //User info
    user_info = {
      user_id,
      user_userName, 
      user_email, 
      user_password
    }

    
    const token = jwt.sign({user_id, user_userName, user_email, user_password}, "jwtsecret", {
      expiresIn: 300
    })
    req.session.token = token

    res.json({
      isError: "False", 
      message: "User successfully logged-in!",
      auth: true,
      token: token, 
      result: user_info,
    })
    

    //return res.send({isError: "False", message: "User successfully logged-in!"})
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
  var passwordMatch = false
  if (input_password == input_confirm_password){
    passMatch = true
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
  var hashedPassword = ''
  bcrypt.hash(req.body.password, 10, (err, hp) => {
    if (err) {
      mongoose.connection.close();
      res.status(500).json({ error: err });
    }
    hashedPassword = hp
  })


  // New user that will be added to database
  var signedUpUser = new User({
    name: input_name,
    email: input_email,
    password: hashedPassword
  })
            

  //Storing the new registered user if all checks are completed
  if(passwordMatch == false){
    console.log("Error! Passwords don't match")
  }
  if (duplicatedEmail == true){
    console.log("Error! Email already exists in database, Please try again!\n")
  }
  if (passwordMatch == true &&  duplicatedEmail == false){
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
    return res.send({isError: "False", message: "User succesfully added to database, Redirecting to main page..."})
  }


});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})