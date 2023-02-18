const express = require('express')
const app = express()
const port = 3001
const cors = require('cors')
const bodyParser = require("express")
const bcrypt = require('bcrypt')
const mongoose = require("mongoose")
const User = require("./model.js")
const Job = require("./jobmodel.js")



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




// ************************ Job posting ************************ //

app.post('/createJobs', async(req, res) => {
  console.log(`route is running`)
  console.log(req.body.title)
  console.log(req.body.experience)
  console.log(req.body.location)
  console.log(req.body.description)

  // Storing the username, password, and email from the request body
  const input_title = req.body.title
  const input_experience = req.body.experience
  const input_location = req.body.location
  const input_description = req.body.description

  
  // Connecting to the specific database and collection
  const database_name = "Accounts"
  const collection_name = "Jobs"
  mongoose.set("strictQuery", false);
  const db_client =  await MongoClient.connect(url) 
  const dbo = db_client.db(database_name)



  // New user that will be added to database
  var newJob = new Job({
    title: input_title,
    experience: input_experience,
    location: input_location,
    description: input_description,
  })

  // Adding Job to DB
  dbo.collection(collection_name).insertOne(newJob, function(err, res) {
    if (err) throw err; 
    console.log("-> 1 New Job succesfully added to the " + database_name + " database inside the " + collection_name + " collection!");
    db_client.close();
  })
});




// ************************ Job Browsing ************************ //
app.get('/jobs', async(req, res) => {
  console.log(`route  for job list is running`)


  // Connecting to the specific database and collection
  const database_name = "Accounts"
  const collection_name = "Jobs"
  const db_client =  await MongoClient.connect(url) 
  const dbo = db_client.db(database_name)


  // Query all the jobs
  try {
    const jobs = await (await dbo.collection(collection_name).find().toArray())
    res.json(jobs);
  } catch (error) {
    console.log("Error when fetching from database");
    console.log(error);
      db_client.close();
  }
 
  
  
  
  });






app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})