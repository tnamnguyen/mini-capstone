const express = require('express')
const app = express()
const port = 3001
const cors = require('cors')
const bodyParser = require("express")
const bcrypt = require('bcrypt')
const mongoose = require("mongoose")
const User = require("./model.js")



// ************************ Connecting to Mongoose DB ************************ //
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



// ************************ Signup ************************ //

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


  //In order to succesfully sign up, the following checks must be validated:
  var allFieldsFilled = false  //All fields must be filled
  var passwordMatch = false    //password must match confirmPassword
  var validPassword = false    //password must be at least 8 characters long, contain a capital letter, a digit and a special character (! @ # $ % ^ & * - _ . ,)
  var validEmail = false       //email must be of the following format email@something.com
  var duplicatedEmail = true   //email must not already exist in database


  //Check if password match confirmPassword
  if (input_password == input_confirm_password){
    passwordMatch = true
  }
  else{
    anyError = true
    erorrMessage = "Error! Passwords don't match, Please try again!"
    console.log(erorrMessage)
  }


  //Check if password is valid 
  var pass_regex = {
    'capital' : /[A-Z]/,
    'digit'   : /[0-9]/,
    'special_char'  : /[! @ # $ % ^ & * - _ . ,]/,
    'full'    : /.{8,}$/
  };
  validPassword = pass_regex.capital.test(input_password) && 
                  pass_regex.digit.test(input_password) && 
                  pass_regex.special_char.test(input_password) && 
                  pass_regex.full.test(input_password);

  if (!validPassword){
    anyError = true
    erorrMessage = "Error! Password is not valid, password must be at least 8 characters long," + 
                "contain a capital letter, a digit and a special character (! @ # $ % ^ & * - _ . ,)"
    console.log(erorrMessage)
  }



  //Check if email is valid 
  var email_regex = {
    'special_char'  : /[@ .]/,
    'com'    : /.com/,
    'ca'     : /.ca/,
    'full'    : /.{7,}$/
  };
  validEmail = email_regex.special_char.test(input_email) && 
               ( (email_regex.com.test(input_email)) || (email_regex.ca.test(input_email)) ) && 
               email_regex.full.test(input_email);

  if (!validEmail){
    anyError = true
    erorrMessage = "Error! Invalid email, email must be of the following format: email@something.com/ca"
    console.log(erorrMessage)
  }

  

  //Check if email is already stored in the database
  const match_user = await dbo.collection(collection_name).findOne( { email: input_email })
  if(match_user){
    duplicatedEmail = true
    anyError = true
    erorrMessage = "Error! email already registered in database, Please try again!"
    console.log(erorrMessage)
  }
  else{
    duplicatedEmail = false
  }


  //Check if all fields are filled
  if(input_name == "" || input_email == "" || input_password == "" || input_confirm_password == "")
  {
    allFieldsFilled = false
    anyError = true
    erorrMessage = "Please fill all fields!"
    console.log(erorrMessage)
  }
  else{
    allFieldsFilled = true
  }


  //Hashing the password before storing it in database
  hashedPassword = bcrypt.hashSync(input_password, 10, (err, hp) => {
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
  if (passwordMatch == true && validPassword == true && validEmail == true && duplicatedEmail == false && allFieldsFilled == false){
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