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

app.post('/signup', (req, res) => {

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
  MongoClient.connect(url, async function(err, db){
    const dbo = db.db(database_name)
    if (err) throw err

    //Check if password match confirmPassword
    var passwordMatch = false
    if (input_password == input_confirm_password){
      passMatch = true
      passwordMatch = true
    }
    else{
      anyError = true
      erorrMessage = "Passwords don't match"
    }

    //Check if email is duplicated
    // var  duplicatedEmail = true
    // console.log("1")
    // await dbo.collection(collection_name).findOne( { email: input_email }, async(err, foundMatch) => {
    //   console.log("2")
    //   if (err) {
    //     mongoose.connection.close()
    //     return res.status(500).json({ error: err })
    //   }
    //   else{
    //     if (foundMatch) {
    //       console.log("found a match")
    //       mongoose.connection.close();
    //       duplicatedEmail = true
    //       anyError = true
    //       erorrMessage = "Email already registered in database"
    //     }
    //     else{
    //       duplicatedEmail = false
    //       console.log("No match found")
    //     }
    //   }
    // })

    const match_user = await dbo.collection(collection_name).findOne( { email: input_email })
    if(match_user){
      duplicatedEmail = true
      anyError = true
      errorMessage = "Email already registered in database"
    }
    else{
      duplicatedEmail = false
    }
    

    console.log("3")
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
      console.log("Error! Passords don't match")
    }
    if (duplicatedEmail == true){
      console.log("Error! Email already exists in database\n")
    }
    // if(user_test){
    //   console.log("Error! Email already exists in database\n")
    // }

    if (passwordMatch == true &&  duplicatedEmail == false){
      dbo.collection(collection_name).insertOne(signedUpUser, function(err, res) {
        console.log("Trying to add user..")
        if (err) throw err; 
        console.log("-> 1 New User succesfully added to the " + database_name + " database inside the " + collection_name + " collection!");
        db.close();
      })
    }
  })

  //Sending back response to fron end
  if (anyError){
    return res.send(erorrMessage)
  }
  else{
    return res.send("User succesfully added to database")
  }


});


// // /Perform validation /////////////////////////////////////////////////
// dbo.collection("users").findOne( { email: req.body.email },
//   (err, user) => {
//                     if (err) {
//                         mongoose.connection.close();
//                         res.status(500).json({ error: err });
//                     } else {
//                                     if (user) {
//                                         mongoose.connection.close();
//                                         res.status(400).json({ message: 'Email already exists' });
//                                     } 




// ///////////////////////////////////// Hash the password/////////////////////////////////
//                                     else{
//                                       bcrypt.hash(req.body.password, 10, (err, hashedPassword) => 
//                                       {
//                                                   if (err) {
//                                                       mongoose.connection.close();
//                                                       res.status(500).json({ error: err });
//                                                   } 



// //////////////////////////////////////Create new query/////////////////////////////////////
//                                                   else{
//                                                     {var myquery = { username: req.body.username,
//                                                   email:req.body.email ,
//                                                   password:hashedPassword
//                                                             };




// //////////////////////////////////////////////// Save the new user to the database///////////////////////////////////////////////
//                                                 dbo.collection("users").insertOne(myquery, function(err, res) {
//                                                   if (err) throw err; 
//                                                   console.log("1 document updated");
//                                                   db.close();
//                                                             })
                                                          
//                                                           }
//                                                         }                                                      
//                                                  }
//                                           )

//                                        }
//                                }
//                          }
//                    )
//              }
//       );

 

            

 

//   // Send a response to the client- not working
//   res.json({
//     success: true,
//     message: 'Successfully signed up'
//   });
// });



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})