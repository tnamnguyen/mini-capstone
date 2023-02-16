const express = require('express')
const app = express()
const port = 3001
const cors = require('cors')
const bodyParser = require("express")
const bcrypt = require('bcrypt')
const mongoose = require("mongoose")
const session = require("express-session")
const User = require("./model.js")



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



// **************************************** Setting Up Sessions **************************************** //
app.use(
  session({
    secret: "seret123",
    saveUninitialized: true,
    resave: false,
    cookie:{
      httpOnly: true,
      maxAge: 36000 
    }
  })
);

app.use((req, res, next) => {
  console.log(req.session);
  next();
})



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
  login_email = req.body.username
  login_password = req.body.password
 
  //Connecting to the specific database and collection
  const database_name = "Accounts"
  const collection_name = "users"
  mongoose.set("strictQuery", false);
  const db_client =  await MongoClient.connect(url) 
  const dbo = db_client.db(database_name)
  
  //In order to succesfully sign in, the following checks must be validated:
  var email_valid = false     //Email must exist in database
  var password_match = false  //password must match given email


  //Check if email exists in database
  email_valid = await dbo.collection(collection_name).findOne( { email: login_email })
  if(!email_valid)
  {
    anyError = true
    erorrMessage = "Invalid email, we don't have this email in our database!"
  }

  //Check if password correspond to given email

  //Hashing the password inputted by user
  var hashedPassword = ''
  bcrypt.hash(login_password, 10, (err, hp) => {
    if (err) {
      mongoose.connection.close();
      res.status(500).json({ error: err });
    }
    hashedPassword = hp
  })

  password_match = await dbo.collection(collection_name).findOne( { password: hashedPassword, email: login_email})
  if(!password_match)
  {
    anyError = true
    erorrMessage = "Password doesn't correspond with given email!"
  }

  //Sending back response to front end
  if (anyError){
    return res.send({isError: "True", message: erorrMessage})
  }
  else{
    return res.send({isError: "False", message: "Logging-in successful!"})
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