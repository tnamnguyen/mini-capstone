const express = require('express')
const app = express()
const port = 3001
const cors = require('cors')
const bodyParser = require("express")
const bcrypt = require('bcryptjs')
const mongoose = require("mongoose")
const User = require("./userModel.js")
const Message = require('./message.js');
const jwt = require('jsonwebtoken')
const Job = require("./jobModel.js")
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router();
const ObjectId = require('mongodb').ObjectId;



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
  let anyError = false
  let erorrMessage = 'No errors detected'

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
                              //Both fields need to have values
                              //Email must exist in database
  let password_match = false  //password must match given email


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
  let databasePassword = ""
  let user_id = -1
  let user_userName = ""
  let user_email = ""
  let user_password = ""
  await dbo.collection(collection_name).findOne( { email: login_email })
  .then(result => {
    //If email doesn't exist
    if (!result){
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
    anyError = true
    erorrMessage = "Some fields are missing, please fill all fields!"
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
  let anyError = false
  let erorrMessage = 'No errors detected'

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
  passwordMatch = false
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
  let hashedPassword = ''
  hashedPassword = bcrypt.hashSync(input_password, 10, (err, hp) => {
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
  if (passwordMatch && validPassword && validEmail && !duplicatedEmail && allFieldsFilled){
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



// ************************ Connections ************************ //
app.get('/connections', async(req, res) => {
  console.log(`route  for connections is running`)


  // Connecting to the specific database and collection
  const database_name = "Accounts"
  const collection_name = "users"
  const db_client =  await MongoClient.connect(url) 
  const dbo = db_client.db(database_name)


  // Query all the users
  try {
    const users = await (await dbo.collection(collection_name).find().toArray())
    res.json(users);
    res.send({status:'ok', data: users});
  } catch (error) {
    console.log("Error when fetching from database");
    console.log(error);
      db_client.close();
  }
 
  
  
  
  });

// ************************ Adding Connections ************************ //
app.get('/connections', async(req, res) => {
  console.log(`route  for connections is running`)


  // Connecting to the specific database and collection
  const database_name = "Accounts"
  const collection_name = "users"
  const db_client =  await MongoClient.connect(url) 
  const dbo = db_client.db(database_name)


  // Query specified user
  
  
  
  
  });


app.post('/createconnection', async (req, res) => {
  // Extract the usernames of the users from the request body
  const { user1, user2 } = req.body;

  // Create a new connection document
  const connection = {
    user1,
    user2,
    status: 'pending',
    createdAt: new Date()
  };

  // Insert the new connection document into the Connections collection
  const database_name = "Accounts"
  const collection_name = "Connections"
  const db_client = await MongoClient.connect(url);
  const dbo = db_client.db(database_name);
  const result = await dbo.collection(collection_name).insertOne(connection);

  // Return a response indicating that the connection was created
  res.json({
    success: true,
    message: `Connection created between ${user1} and ${user2}`
  });
});


app.put('/connections/:id/accept', async (req, res) => {
  // Extract the connection ID from the request parameters
  const connectionId = req.params.id;

  // Find the connection document in the Connections collection
  const database_name = "Accounts"
  const collection_name = "Connections"
  const db_client = await MongoClient.connect(url);
  const dbo = db_client.db(database_name);
  const connection = await dbo.collection(collection_name).findOne({ _id: ObjectId(connectionId) });

  // If the connection doesn't exist, return a 404 error
  if (!connection) {
    return res.status(404).json({ success: false, message: `Connection with ID ${connectionId} not found` });
  }

  // If the connection is already accepted, return a 400 error
  if (connection.status === 'accepted') {
    return res.status(400).json({ success: false, message: `Connection with ID ${connectionId} is already accepted` });
  }

  // Update the connection status to 'accepted'
  await dbo.collection(collection_name).updateOne({ _id: ObjectId(connectionId) }, { $set: { status: 'accepted' } });

  // Return a success response
  res.json({ success: true, message: `Connection with ID ${connectionId} accepted` });
});


app.put('/connections/:id/reject', async (req, res) => {
  // Extract the connection ID from the request parameters
  const connectionId = req.params.id;

  // Find the connection document in the Connections collection
  const database_name = "Accounts"
  const collection_name = "Connections"
  const db_client = await MongoClient.connect(url);
  const dbo = db_client.db(database_name);
  const connection = await dbo.collection(collection_name).findOne({ _id: ObjectId(connectionId) });

  // If the connection doesn't exist, return a 404 error
  if (!connection) {
    return res.status(404).json({ success: false, message: `Connection with ID ${connectionId} not found` });
  }

  // If the connection is already accepted, return a 400 error
  if (connection.status === 'accepted') {
    return res.status(400).json({ success: false, message: `Connection with ID ${connectionId} is already accepted` });
  }

  // Update the connection status to 'rejected'
  await dbo.collection(collection_name).updateOne({ _id: ObjectId(connectionId) }, { $set: { status: 'rejected' } });

  // Return a success response
  res.json({ success: true, message: `Connection with ID ${connectionId} rejected` });
});


//messages

// Endpoint for sending a message with an optional document
router.post('/messages', upload.single('document'), async (req, res) => {
  try {
    // Parse the recipient ID from the request body
    const recipientId = req.body.recipientId;

    // Check that the recipient ID is valid
    const recipient = await User.findById(recipientId);
    if (!recipient) {
      return res.status(400).json({ error: 'Invalid recipient ID' });
    }

    // Parse the message content from the request body
    const content = req.body.content;

    // Check that the message content is not empty
    if (!content) {
      return res.status(400).json({ error: 'Message content is required' });
    }

    // Create a new message object
    const message = new Message({
      sender: req.user._id, // Assumes that the authenticated user is the sender
      recipient: recipientId,
      content: content,
      timestamp: new Date(),
      isDocument: Boolean(req.file),
      documentName: req.file ? req.file.originalname : undefined,
      documentData: req.file ? req.file.buffer : undefined,
      isEncrypted: false, // Assumes that documents are not encrypted by default
      encryptionKey: undefined
    });

    // Save the message to the database
    await message.save();

    // Return the saved message object
    return res.status(200).json({ message: message });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
});

// Endpoint for retrieving a specific message with its document (if any)
router.get('/messages/:messageId', async (req, res) => {
  try {
    // Parse the message ID from the request parameters
    const messageId = req.params.messageId;

    // Check that the message ID is valid
    if (!ObjectId.isValid(messageId)) {
      return res.status(400).json({error: 'Invalid message ID'});
    }

    // Retrieve the message with the specified ID
    const message = await Message.findById(messageId);

    // Check that the message exists
    if (!message) {
      return res.status(404).json({error: 'Message not found'});
    }

    // Check that the authenticated user is either the sender or recipient of the message
    if (!message.sender.equals(req.user._id) && !message.recipient.equals(req.user._id)) {
      return res.status(403).json({error: 'Unauthorized'});
    }

    // If the message includes a document, send the document data in the response as an attachment.
    if (message.isDocument && message.documentData) {
      res.setHeader('Content-Disposition', `attachment; filename="${message.documentName}"`);
      res.setHeader('Content-Type', 'application/octet-stream');
      res.send(message.documentData);
    } else {
      // Otherwise, return the message object as JSON.
      return res.status(200).json({message: message});
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
});

// Endpoint for retrieving all messages between the authenticated user and a specific user
router.get('/messages/:userId', async (req, res) => {
  try {
    // Parse the user ID from the request parameters
    const userId = req.params.userId;

    // Check that the user ID is valid
    if (!ObjectId.isValid(userId)) {
      return res.status(400).json({error: 'Invalid user ID'});
    }

    // Retrieve all messages between the authenticated user and the specified user
    const messages = await Message.find({
      $or: [
        {sender: req.user._id, recipient: userId},
        {sender: userId, recipient: req.user._id}
      ]
    }).sort({sentAt: 1});

    // Check that at least one message was found
    if (!messages || messages.length === 0) {
      return res.status(404).json({error: 'No messages found'});
    }

    // Return the messages array as JSON
    return res.status(200).json({ messages: messages });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
});
