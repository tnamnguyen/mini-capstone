const express = require("express");
const app = express();
const port = 3001;
const cors = require("cors");
const bodyParser = require("express");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const ObjectId = require("mongodb").ObjectID;
const User = require("./userModel.js");
const Job = require("./jobModel.js");
const { db } = require("./userModel.js");
const SavedJob = require("./savedJobModel.js");
const nodemailer = require("nodemailer");
const Profile = require("./profileModel.js");
const jwt = require("jsonwebtoken");
const Connection = require("./connectionModel.js");

// **************************************** Connecting to Mongoose DB **************************************** //
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const MongoClient = require("mongodb").MongoClient;
const url =
  "mongodb+srv://test_user:test_user12345@minicapstone.nfejagl.mongodb.net/?retryWrites=true&w=majority";
function connectToMongooseDB() {
  mongoose.set("strictQuery", false);
  mongoose
    .connect(url, { dbName: "Accounts" })
    .then(() => console.log("Connected to Mongoose DB!\n"))
    .catch(() => console.log("Unable to connect to Mongoose DB!"));
}
connectToMongooseDB();

// **************************************** Setting Up JWT **************************************** //

//Function taking a token as input and checking if a user is signed-in
function authenticateToken(req, res, next) {
  const token = req.body.accessToken;
  if (token == null) {
    res.isLoggedIn = false;
    next();
  } else {
    jwt.verify(token, "jwtsecret", (err, user) => {
      if (err) {
        res.isLoggedIn = false;
        console.log("Error! Given JWT secret might not be matching!");
        res.isLoggedIn = false;
        next();
      } else {
        //check if user is admin
        if (user.type == "admin") {
          res.isAdmin = true;
        } else {
          res.isAdmin = false;
        }

        res.user = user;
        res.isLoggedIn = true;
        next();
      }
    });
  }
}

// **************************************** Home **************************************** //

app.post("/home", authenticateToken, (req, res) => {
  if (res.isLoggedIn) {
    res.send({
      isLoggedIn: res.isLoggedIn,
      isAdmin: res.isAdmin,
      user: res.user,
    });
  }
});

// **************************************** Login **************************************** //

app.post("/login", async (req, res) => {
  // The response generated from this function consists of
  // a boolean stating if there is an error as well as an error message
  // in case of an error
  let anyError = false;
  let erorrMessage = "No errors detected";

  // Get the username and password from the request body
  const login_email = req.body.email;
  const login_password = req.body.password;

  //Connecting to the specific database and collection
  //const database_name = "Accounts"
  const database_name = "Accounts";
  const collection_name = "users";
  mongoose.set("strictQuery", false);
  const db_client = await MongoClient.connect(url);
  const dbo = db_client.db(database_name);

  //In order to succesfully sign in, the following checks must be validated:
  //Both fields need to have values
  //Email must exist in database
  let password_match = false; //password must match given email

  //Function that compares user password with database password
  function authenticatePassword(param1, param2) {
    return new Promise(function (resolve, reject) {
      bcrypt.compare(param1, param2, function (err, res) {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }

  //Check if email exists in database
  let databasePassword = "";
  let user_id = -1;
  let user_userName = "";
  let user_email = "";
  let user_password = "";
  let user_type = "";
  await dbo
    .collection(collection_name)
    .findOne({ email: login_email })
    .then((result) => {
      //If email doesn't exist
      if (!result) {
        anyError = true;
        erorrMessage =
          "Invalid email, we don't have this email in our database!";
      }
      //If email exists
      else {
        user_id = result._id;
        user_userName = result.name;
        user_email = result.email;
        user_password = result.password;
        databasePassword = result.password;
        user_type = result.type;
      }
    })
    .catch((err) => {
      console.log("Error:" + err);
    });

  //Check if password corresponds to given email
  password_match = await authenticatePassword(login_password, databasePassword);
  if (!password_match) {
    anyError = true;
    if (erorrMessage == "No errors detected") {
      erorrMessage = "Invalid password, please try again!";
    }
  }

  //Check if both fields were filled
  if (login_email == "" || login_password == "") {
    anyError = true;
    erorrMessage = "Some fields are missing, please fill all fields!";
  }

  //Sending back response to front end
  if (anyError) {
    res.json({
      isError: "True",
      message: erorrMessage,
    });
  } else {
    //User info
    const user_info = {
      id: user_id,
      name: user_userName,
      email: user_email,
      password: user_password,
      type: user_type,
    };

    //Creating a JWT token with user information
    const token = jwt.sign(user_info, "jwtsecret", {
      expiresIn: 300000,
    });

    //Sending success message to front end as well as token to be stored locally
    res.json({
      isError: "False",
      message: "Successfully Signed-in! Redirecting to main page...",
      token: token,
    });
  }
});

// **************************************** Signup **************************************** //

app.post("/signup", async (req, res) => {
  // The response generated from this function consists of
  // a boolean stating if there is an error as well as an error message
  // in case of an error
  let anyError = false;
  let erorrMessage = "No errors detected";
  console.log();

  // Storing the username, password, and email from the request body
  const input_name = req.body.username;
  const input_email = req.body.email;
  const input_password = req.body.password;
  const input_confirm_password = req.body.passwordConfirm;

  //Connecting to the specific database and collection
  // const database_name = "Accounts"
  const database_name = "Accounts";
  const collection_name = "users";
  const collection_name_profile = "profile"
  mongoose.set("strictQuery", false);
  const db_client = await MongoClient.connect(url);
  const dbo = db_client.db(database_name);

  //In order to succesfully sign up, the following checks must be validated:
  var allFieldsFilled = false; //All fields must be filled
  var passwordMatch = false; //password must match confirmPassword
  var validPassword = false; //password must be at least 8 characters long, contain a capital letter, a digit and a special character (! @ # $ % ^ & * - _ . ,)
  var validEmail = false; //email must be of the following format email@something.com
  var duplicatedEmail = true; //email must not already exist in database

  //Check if password match confirmPassword
  passwordMatch = false;
  if (input_password == input_confirm_password) {
    passwordMatch = true;
  } else {
    anyError = true;
    erorrMessage = "Error! Passwords don't match, Please try again!";
    console.log(erorrMessage);
  }

  //Check if password is valid
  var pass_regex = {
    capital: /[A-Z]/,
    digit: /[0-9]/,
    special_char: /[! @ # $ % ^ & * - _ . ,]/,
    full: /.{8,}$/,
  };
  validPassword =
    pass_regex.capital.test(input_password) &&
    pass_regex.digit.test(input_password) &&
    pass_regex.special_char.test(input_password) &&
    pass_regex.full.test(input_password);

  if (!validPassword) {
    anyError = true;
    erorrMessage =
      "Error! Password is not valid, password must be at least 8 characters long," +
      "contain a capital letter, a digit and a special character (! @ # $ % ^ & * - _ . ,)";
    console.log(erorrMessage);
  }

  //Check if email is valid
  var email_regex = {
    special_char: /[@ .]/,
    com: /.com/,
    ca: /.ca/,
    full: /.{7,}$/,
  };
  validEmail =
    email_regex.special_char.test(input_email) &&
    (email_regex.com.test(input_email) || email_regex.ca.test(input_email)) &&
    email_regex.full.test(input_email);

  if (!validEmail) {
    anyError = true;
    erorrMessage =
      "Error! Invalid email, email must be of the following format: email@something.com/ca";
    console.log(erorrMessage);
  }

  //Check if email is already stored in the database
  const match_user = await dbo
    .collection(collection_name)
    .findOne({ email: input_email });
  if (match_user) {
    duplicatedEmail = true;
    anyError = true;
    erorrMessage =
      "Error! email already registered in database, Please try again!";
    console.log(erorrMessage);
  } else {
    duplicatedEmail = false;
  }

  //Check if all fields are filled
  if (
    input_name == "" ||
    input_email == "" ||
    input_password == "" ||
    input_confirm_password == ""
  ) {
    allFieldsFilled = false;
    anyError = true;
    erorrMessage = "Please fill all fields!";
    console.log(erorrMessage);
  } else {
    allFieldsFilled = true;
  }

  //Hashing the password before storing it in database
  let hashedPassword = "";
  hashedPassword = bcrypt.hashSync(input_password, 10, (err, hp) => {
    if (err) {
      mongoose.connection.close();
      res.status(500).json({ error: err });
    }
    hashedPassword = hp;
  });

  // New user that will be added to database
  const signedUpUser = new User({
    name: input_name,
    email: input_email,
    password: hashedPassword,
    type: "regular_user",
  });

  //Storing the new registered user if all checks are completed
  if (
    passwordMatch &&
    validPassword &&
    validEmail &&
    !duplicatedEmail &&
    allFieldsFilled
  ) {
    dbo
      .collection(collection_name)
      .insertOne(signedUpUser, function (err, res) {
        if (err) throw err;
        console.log(
          "-> 1 New User succesfully added to the " +
            database_name +
            " database inside the " +
            collection_name +
            " collection!"
        );
      
        console.log("Creating a new profile for user");
        var newProfile = new Profile({
          user_id: res.insertedId,
          name: input_name,
          education: "None",
          pastJob: "None",
          currentJob: "None",
          languages: "English",
          bio: "",
        });

        dbo
        .collection(collection_name_profile)
        .insertOne(newProfile, function (err, res) {
          if (err) throw err;
          console.log(
            "-> Profile template created for the new user on " +
              database_name +
              " database inside the " +
              collection_name_profile +
              "collection!"
          );
        });
      });
  }

  //Sending back response to front end
  if (anyError) {
    return res.send({ isError: "True", message: erorrMessage });
  } else {
    return res.send({
      isError: "False",
      message:
        "User succesfully added to database, Redirecting to login page...",
    });
  }
});

// ************************ Admin ************************ //
app.get("/admin", async (req, res) => {
  // Connecting to the specific database and collection
  const database_name = "Accounts";
  const db_client = await MongoClient.connect(url);
  const dbo = db_client.db(database_name);

  //Getting total numbers of registered users
  let numOfUsers = await dbo.collection("users").countDocuments();

  //Getting total numbers of jobs available
  const numOfJobs = await dbo.collection("Jobs").countDocuments();

  //Seding response back to front-end
  res.send({ numOfUsers: numOfUsers, numOfJobs: numOfJobs });
});

// ************************ Admin/ List of users ************************ //
app.get("/admin_listUsers", async (req, res) => {
  // Connecting to the specific database and collection
  const database_name = "Accounts";
  const collection_name = "users";
  const db_client = await MongoClient.connect(url);
  const dbo = db_client.db(database_name);

  // Query all users from database
  try {
    const users = await await dbo.collection(collection_name).find().toArray();
    res.json(users);
  } catch (error) {
    console.log("Error when fetching from database");
    console.log(error);
    db_client.close();
  }
});

// ************************ Admin/ assign Admin ************************ //
app.post("/admin_makeAdmin", async (req, res) => {
  // Connecting to the specific database and collection
  const database_name = "Accounts";
  const collection_name = "users";
  const db_client = await MongoClient.connect(url);
  const dbo = db_client.db(database_name);

  // update user type to admin
  const update = await await dbo
    .collection(collection_name)
    .updateOne({ email: req.body.email }, { $set: { type: "admin" } });
});

// ************************ Admin/ assign regular user ************************ //
app.post("/admin_makeRegularUser", async (req, res) => {
  // Connecting to the specific database and collection
  const database_name = "Accounts";
  const collection_name = "users";
  const db_client = await MongoClient.connect(url);
  const dbo = db_client.db(database_name);

  // update user type to regular_user
  const update = await await dbo
    .collection(collection_name)
    .updateOne({ email: req.body.email }, { $set: { type: "regular_user" } });
});

// ************************ Profile ************************ //
app.post("/profile", authenticateToken, async (req, res) => {
  console.log(`route for profile is running`);
  if (res.isLoggedIn) {
    const id = res.user.id;
    const database_name = "Accounts";
    const collection_name = "profile";
    const db_client = await MongoClient.connect(url);
    const dbo = db_client.db(database_name);
    await dbo
      .collection(collection_name)
      .findOne({ user_id: id })
      .then((result) => {
        // Create a new profile in the database if the user is not found
        if (!result) {
          anyError = true;
          errorMessage = "No profile was found for this user";
          console.log(errorMessage);

          res.send({
            profileExists: "False",
            message: errorMessage,
          });

          console.log("Creating a new profile for user");
          var newProfile = new Profile({
            user_id: id,
            name: res.user.name,
            education: "None",
            pastJob: "None",
            currentJob: "None",
            languages: "English",
            bio: "",
          });

          // Create a template profile for users without a profile
          dbo
            .collection(collection_name)
            .insertOne(newProfile, function (err, res) {
              if (err) throw err;
              console.log(
                "-> Profile template created for the new user on " +
                  database_name +
                  " database inside the " +
                  collection_name +
                  "collection!"
              );
              db_client.close();
            });
        } else {
          res.send({
            profileExists: "True",
            isLoggedIn: res.isLoggedIn,
            user: res.user,
            education: result.education,
            pastJob: result.pastJob,
            currentJob: result.currentJob,
            languages: result.languages,
            bio: result.bio,
          });
          db_client.close();
        }
      })
      .catch((err) => {
        console.log("Error:" + err);
      });
  }
});

// ************************ Edit Profile ************************ //
app.post("/editprofile", authenticateToken, async (req, res) => {
  console.log("route for edit profile is running");

  if (res.isLoggedIn) {
    const id = res.user.id;
    const database_name = "Accounts";
    const collection_name = "profile";
    const db_client = await MongoClient.connect(url);
    const dbo = db_client.db(database_name);

    // Find user profile
    await dbo
      .collection(collection_name)
      .findOne({ user_id: id })
      .then((result) => {
        if (!result) {
          anyError = true;
          errorMessage = "invalid id";
          console.log("invalid result");
        } else {
          res.send({
            isLoggedIn: res.isLoggedIn,
            user: res.user,
            education: result.education,
            pastJob: result.pastJob,
            currentJob: result.currentJob,
            languages: result.languages,
            bio: result.bio,
          });
          db_client.close();
        }
      })
      .catch((err) => {
        console.log("Error:" + err);
      });
  }
});

// ************************ Edit Profile Submit Changes ************************ //
app.post("/submiteditprofile", authenticateToken, async (req, res) => {
  console.log(`route submitting profile changes is running`);
  const id = res.user.id;
  const token_email = res.user.email;
  const token_pw = res.user.pw;

  // Associate the info from the edit page
  const input_userName = req.body.userName;
  const input_education = req.body.education;
  const input_pastJob = req.body.pastJob;
  const input_currentJob = req.body.currentJob;
  const input_languages = req.body.languages;
  const input_bio = req.body.bio;

  // Loading database
  const database_name = "Accounts";
  const collection_name = "profile";
  const collection_users = "users";
  mongoose.set("strictQuery", false);
  const db_client = await MongoClient.connect(url);
  const dbo = db_client.db(database_name);

  // Find a profile corresponding to user_id
  const userProfile = await dbo
    .collection(collection_name)
    .findOne({ user_id: id });
  if (userProfile) {
    userProfile.name = input_userName;
    userProfile.education = input_education;
    userProfile.pastJob = input_pastJob;
    userProfile.currentJob = input_currentJob;
    userProfile.languages = input_languages;
    userProfile.bio = input_bio;

    // Update userProfile
    await dbo
      .collection(collection_name)
      .updateOne({ user_id: id }, { $set: userProfile });

    // Find from users collection matching id to modify the userName
    const user = await dbo
      .collection(collection_users)
      .findOne({ _id: new ObjectId(id) });
    // If user is not found
    if (!user) {
      anyError = true;
      errorMessage = "An error has occured";
      console.log("invalid id");
      res.json({
        isError: "True",
        message: errorMessage,
      });
    }
    // Modify userName in users
    else {
      user.name = input_userName;
      await dbo
        .collection(collection_users)
        .updateOne({ _id: new ObjectId(id) }, { $set: user });

      const user_info = {
        id: id,
        name: input_userName,
        email: token_email,
        password: token_pw,
      };

      const newToken = jwt.sign(user_info, "jwtsecret", {
        expiresIn: 300000,
      });

      console.log("sending response...");
      res.json({
        isError: "False",
        message: "Successfully edited profile!",
        token: newToken,
      });
    }
    console.log("Profile Saved");
  } else {
    console.log("User Profile not found");
    anyError = true;
    errorMessage = "An error has occured";
    console.log("sending error response...");
    res.json({
      isError: "True",
      message: errorMessage,
    });
  }
});

// ************************ Job posting ************************ //

app.post('/createJobs', authenticateToken, async(req, res) => {
  console.log(`route for creating job is running`)
  console.log(req.body.title)
  console.log(req.body.experience)
  console.log(req.body.location)
  console.log(req.body.description)

  // Storing the username, password, and email from the request body
  const input_title = req.body.title
  const input_experience = req.body.experience
  const input_location = req.body.location
  const input_description = req.body.description
  const userId = res.user.id

  // Connecting to the specific database and collection
  const database_name = "Accounts";
  const collection_name = "Jobs";
  mongoose.set("strictQuery", false);
  const db_client = await MongoClient.connect(url);
  const dbo = db_client.db(database_name);

  // New user that will be added to database
  var newJob = new Job({
    title: input_title,
    experience: input_experience,
    location: input_location,
    description: input_description,
    user_id: userId
  })

  // Adding Job to DB
  dbo.collection(collection_name).insertOne(newJob, function (err, result) {
    if (err) {
      errorMessage = "An error has occured";
      console.log(errorMessage);
      console.log(err);
      res.json({
        isError: "True",
        message: errorMessage,
      });
    } else {
      var successMessage = "Job created successfully!";
      console.log(successMessage);
      res.json({
        isError: "False",
        message: successMessage,
      });
    }
    console.log(
      "-> 1 New Job succesfully added to the " +
        database_name +
        " database inside the " +
        collection_name +
        " collection!"
    );
    db_client.close();
  });
});


// ************************ Edit Job ************************ //
app.post('/editjob', authenticateToken, async(req, res) => {
  console.log(`route for edit job is running`)
  console.log(req.body.jobId)
  console.log(req.body.title)
  console.log(req.body.experience)
  console.log(req.body.location)
  console.log(req.body.description)

  const input_title = req.body.title
  const input_experience = req.body.experience
  const input_location = req.body.location
  const input_description = req.body.description

  // Loading up the correct database
  const database_name = "Accounts"
  const collection_name = "Jobs"
  mongoose.set("strictQuery", false);
  const db_client =  await MongoClient.connect(url) 
  const dbo = db_client.db(database_name)

  // Find the job in the database using the id that was provided from the client side
  const job = await dbo.collection(collection_name).findOne({_id: new ObjectId(req.body.jobId)})
  if (job){

    // Verify if the user editing the job is the owner of the job
    if(res.user.id != job.user_id){
      console.log(`incorrect user. Sending response...`);
      res.json({
        isError: "True",
        message: "You do not have permission to edit this job."
      })
      return
    }

    job.title = input_title
    job.experience = input_experience
    job.location = input_location
    job.description = input_description

    // Update the job document with the new inputs
    await dbo.collection(collection_name).updateOne({ _id: new ObjectId(req.body.jobId)}, {$set: job})
    

    // Sending a response back to the client side
    console.log(`sending response...`);
    res.json({
      isError: "False",
      message: "Successfully edited job!"
    })
  }
  else{
    console.log(`sending response...`);
    errorMessage = "An error has occured"
    res.json({
      isError: "True",
      message: errorMessage
    })
  }

})



// ************************ Job Browsing ************************ //
app.get("/jobs", async (req, res) => {
  console.log(`route  for job list is running`);

  // Connecting to the specific database and collection
  const database_name = "Accounts";
  const collection_name = "Jobs";
  const db_client = await MongoClient.connect(url);
  const dbo = db_client.db(database_name);

  // Query all the jobs
  try {
    const jobs = await await dbo.collection(collection_name).find().toArray();
    res.json(jobs);
  } catch (error) {
    console.log("Error when fetching from database");
    console.log(error);
    db_client.close();
  }
});


  // ************************ Created Job Browsing ************************ //
  app.post('/myjobs', authenticateToken, async(req, res) => {
    console.log(`route for my created jobs is running`);

        // Connecting to the specific database and collection
        const database_name = "Accounts"
        const collection_name = "Jobs"
        const db_client = await MongoClient.connect(url)
        const dbo = db_client.db(database_name)

        userId = res.user.id
        try {
          const jobs = await (await dbo.collection(collection_name).find({ user_id: userId}).toArray())
          res.json(jobs);
        }
        catch (error) {
          console.log("Error when fetching from database");
          console.log(error);
          db_client.close();
        }

  })

  // ************************ Deleting Created Job ************************ //
  app.post('/deletejob', async(req, res) => {
    console.log(`delete job route is running`);
    console.log(req.body.job_id);
      // Connecting to the specific database and collection
    const database_name = "Accounts"
    const collection_name = "Jobs"
    const db_client =  await MongoClient.connect(url) 
    const dbo = db_client.db(database_name)

    // Delete the job that was clicked from the database
    dbo.collection(collection_name).deleteOne({_id: new ObjectId(req.body.job_id)},
    function(err, result) {
      if(err){
        console.log(err);
      }
      else {
        console.log(`Job was deleted successfully`);
        res.json({
          message: "Job deleted successfully"
        })
      }
    })
  })


  // ************************ Saving Job to Saved Job List ************************ //
  app.post('/savejob', authenticateToken, async(req, res) => {
    console.log (`route for saving job is running`)

    // Connecting to the specific database and collection
    const database_name = "Accounts"
    const collection_name = "savedjobs"
    const db_client = await MongoClient.connect(url)
    const dbo = db_client.db(database_name)

    // New saved job that will be added to the database
    var newSavedJob = new SavedJob({
      user_id: res.user.id,
      job_id: req.body.job_id
    })
    dbo.collection(collection_name).findOne({user_id: res.user.id, job_id: req.body.job_id},
      function(err, result){
      // If entry exists in database
      if (result != null) {
        console.log('Job Exists')
        res.json({
          message: 'Job already saved'
        })
      }
      // Else, inserting new saved job
      else{
        dbo.collection(collection_name).insertOne(newSavedJob, function(err, result) {
          if(err) throw err;
          console.log("-> 1 new Job was saved for user on " + database_name + " database inside the " + collection_name + " collection!")
          res.json({
            message: 'Job saved successfully'
          })
          db.client.close();
        })
    }
      })

  })


// ************************ Saved Job Browsing ************************ //
app.post("/savedjobs", authenticateToken, async (req, res) => {
  console.log(`route for saved jobs is running`);

  // Connecting to the specific database and collection
  const database_name = "Accounts";
  const collection_name = "savedjobs";
  const db_client = await MongoClient.connect(url);
  const dbo = db_client.db(database_name);

  // Find all job_ids that are associated with the user
  try {
    const job_ids = await dbo
      .collection(collection_name)
      .find({
        user_id: res.user.id,
      })
      .project({ job_id: 1, _id: 0 })
      .toArray();

    const collection_name_Jobs = "Jobs";

    // Removing the field names of the array
    const filtered_jobids = job_ids.map((job_ids) => job_ids.job_id);

    // Associating them as ObjectIds
    const object_ids = filtered_jobids.map(
      (filtered_jobids) => new ObjectId(filtered_jobids)
    );

    // Finding all jobs matching ids from array
    const jobs = await dbo
      .collection(collection_name_Jobs)
      .find({ _id: { $in: object_ids } })
      .toArray();
    res.json(jobs);
  } catch (error) {
    console.log("Error when fetching from database");
    console.log(error);
    db_client.close();
  }
});

// ************************ Removing Job from Saved List ************************ //
app.post("/removejob", authenticateToken, async (req, res) => {
  console.log(`remove job route is running`);

  // Connecting to the specific database and collection
  const database_name = "Accounts";
  const collection_name = "savedjobs";
  const db_client = await MongoClient.connect(url);
  const dbo = db_client.db(database_name);

  // Delete document containing user id and job id
  dbo
    .collection(collection_name)
    .deleteOne(
      { user_id: res.user.id, job_id: req.body.job_id },
      function (err, result) {
        if (err) {
          console.log(err);
        } else {
          console.log("Saved job was deleted successfully");
          res.json({
            message: "Job removed successfully",
          });
        }
      }
    );
});

// ************************************* Forgot password*************************************** //

// Sending the email
app.post("/send_recovery_email", (req, res) => {
  console.log(`route for forgot password is running`);
  sendEmail(req.body)
    .then((response) => res.send(response.message))
    .catch((error) => res.status(500).send(error.message));
});

// Generating the email
function sendEmail({ recipient_email, OTP }) {
  return new Promise((resolve, reject) => {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "jobileeproject@gmail.com",
        pass: "dnydyxuhnfluimqg",
      },
    });

    const mail_configs = {
      from: "jobileeproject@gmail.com",
      to: recipient_email,
      subject: "Reset Password",
      html: `<!DOCTYPE html>
<html lang="en" >
<head>
  <meta charset="UTF-8">
  <title>Password Recovery Email Template</title>
  
</head>
<body>
<!-- partial:index.partial.html -->
<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
  <div style="margin:50px auto;width:70%;padding:20px 0">
    <div style="border-bottom:1px solid #eee">
      <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Jobilee Inc</a>
    </div>
    <p style="font-size:1.1em">Hi,</p>
    <p>An attempt has been made to change your password. Use the following OTP to complete your Password Recovery Procedure. OTP is valid for 5 minutes</p>
    <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;"><a href=${`https://jobilee-server.vercel.app/reset?email=${recipient_email}`}  >"Reset password"</a></h2>
    <p style="font-size:0.9em;">Regards,<br />Jobilee Project</p>
    <hr style="border:none;border-top:1px solid #eee" />
    <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
      <p>JobileeInc</p>
      <p>Montreal Canada</p>
      <p>Canada</p>
    </div>
  </div>
</div>
<!-- partial -->
  
</body>
</html>`,
    };
    transporter.sendMail(mail_configs, function (error, info) {
      if (error) {
        console.log(error);
        return reject({ message: `An error has occured` });
      }
      return resolve({ message: "Email sent succesfuly" });
    });
  });
}

//****************************************  updating the password ****************************************************//

app.post("/reset", async (req, res) => {
  // The response generated from this function consists of
  // a boolean stating if there is an error as well as an error message
  // in case of an error
  let anyError = false;
  let erorrMessage = "No errors detected";

  // Storing the username, password, and email from the request body
  const input_email = req.body.email;
  const input_password = req.body.password;
  const input_confirm_password = req.body.passwordConfirm;

  //Connecting to the specific database and collection
  const database_name = "Accounts";
  const collection_name = "users";
  mongoose.set("strictQuery", false);
  const db_client = await MongoClient.connect(url);
  const dbo = db_client.db(database_name);

  //In order to succesfully sign up, the following checks must be validated:
  var passwordMatch = false; //password must match confirmPassword
  var validPassword = false; //password must be at least 8 characters long, contain a capital letter, a digit and a special character (! @ # $ % ^ & * - _ . ,)

  //Check if password match confirmPassword
  passwordMatch = false;
  if (input_password == input_confirm_password) {
    passwordMatch = true;
  } else {
    anyError = true;
    erorrMessage = "Error! Passwords don't match, Please try again!";
    console.log(erorrMessage);
  }

  //Check if password is valid
  var pass_regex = {
    capital: /[A-Z]/,
    digit: /[0-9]/,
    special_char: /[! @ # $ % ^ & * - _ . ,]/,
    full: /.{8,}$/,
  };
  validPassword =
    pass_regex.capital.test(input_password) &&
    pass_regex.digit.test(input_password) &&
    pass_regex.special_char.test(input_password) &&
    pass_regex.full.test(input_password);

  if (!validPassword) {
    anyError = true;
    erorrMessage =
      "Error! Password is not valid, password must be at least 8 characters long," +
      "contain a capital letter, a digit and a special character (! @ # $ % ^ & * - _ . ,)";
    console.log(erorrMessage);
  }

  //Hashing the password before storing it in database
  let hashedPassword = "";
  hashedPassword = bcrypt.hashSync(input_password, 10, (err, hp) => {
    if (err) {
      mongoose.connection.close();
      res.status(500).json({ error: err });
    }
    hashedPassword = hp;
  });

  // Find the user with the input email and update their password
  await dbo
    .collection(collection_name)
    .findOneAndUpdate(
      { email: input_email },
      { $set: { password: hashedPassword } }
    );

  // Close the database connection
  db_client.close();

  //Sending back response to front end
  if (anyError) {
    return res.send({ isError: "True", message: erorrMessage });
  } else {
    return res.send({
      isError: "False",
      message: "User password has been modified, Redirecting to login page...",
    });
  }
});

// ************************ Print all users names ************************ //
app.get("/addConnections", async (req, res) => {
  console.log(`route  for printing connections is running`);

  // Connecting to the specific database and collection
  const database_name = "Accounts";
  const collection_name = "users";
  const db_client = await MongoClient.connect(url);
  const dbo = db_client.db(database_name);

  // Query all the users
  try {
    const users = await await dbo.collection(collection_name).find().toArray();
    res.json(users);
  } catch (error) {
    console.log("Error when fetching from database");
    console.log(error);
    db_client.close();
  }
});


// ************************ Adding Connections ************************ //
app.post("/addConnections", async (req, res) => {
  try {
    const { user1, user2 } = req.body;
    // trying to fix the vulnerabilities
    if (typeof user1 !== 'string' || typeof user2 !== 'string') {
      throw new Error('Invalid input: user1 and user2 must be strings');
    }

    const check = await Connection.findOne({
      user1: user1,
      user2: user2,
      status: { $in: ["completed", "pending"] },
    });

const checkAgain = await Connection.findOne({
      user1: user2,
      user2: user1,
      status: { $in: ["completed", "pending"] },
    });

    if (check || checkAgain) {
      res.status(200).json({
        message: "Already connected!",
        status: true,
      });
    } else {
      const newData = new Connection(req.body);
      const result = await newData.save();
      if (result) {
        res.status(200).json({
          message: "Connections Added successfully",
          status: true,
          data: result,
        });
      } else {
        res.status(200).json({
          message: "Failed to add Connection",
          status: false,
        });
      }
    }
  } catch (error) {
    res.status(200).json({
      message: "Failed to add Connection",
      status: false,
    });
  }
});

// ************************ Printing Connections ************************ //
app.get("/connections/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Connection.find({ user1: id, status: "completed" });
    const result1 = await Connection.find({ user2: id, status: "completed" });
    const totalConnections = [...result, ...result1];
    console.log(totalConnections);
    const uniqueArr = [
      ...new Set(totalConnections.map((obj) => JSON.stringify(obj))),
    ].map((str) => JSON.parse(str));

    if (result) {
      res.status(200).json({
        message: "Connections Fetched successfully",
        status: true,
        data: uniqueArr,
      });
    } else {
      res.status(200).json({
        message: "Failed to Fetch Connection",
        status: false,
      });
    }
  } catch (error) {
    res.status(200).json({
      message: "Failed to Fetch Connection",
      status: false,
    });
  }
});

// ************************ Printing Pending Connections ************************ //
app.get("/getPendingConnection/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Connection.find({ user2: id, status: "pending" });

    if (result) {
      res.status(200).json({
        message: "Connections fetched successfully",
        status: false,
        data: result,
      });
    } else {
      res.status(200).json({
        message: "Failed to Fetch Connection",
        status: false,
      });
    }
  } catch (error) {
    res.status(200).json({
      message: "Failed to Fetch Connection",
      status: false,
    });
  }
});

app.patch("/connections/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    console.log(data, id);
    const result = await Connection.findByIdAndUpdate(id, data);
    console.log(result);
    if (result) {
      res.status(200).json({
        message: `Connections ${data.status} successfully`,
        status: true,
        data: result,
      });
    } else {
      res.status(200).json({
        message: "Failed to add Connection",
        status: false,
      });
    }
  } catch (error) {
    res.status(200).json({
      message: "Failed to add Connection",
      status: false,
    });
  }
});

// ************************ Deleting Connections ************************ //
app.delete("/connections/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Connection.findByIdAndDelete(id);
    if (result) {
      res.status(200).json({
        message: `Connection removed successfully`,
        status: true,
        data: result,
      });
    } else {
      res.status(200).json({
        message: "Failed to removed Connection",
        status: false,
      });
    }
  } catch (error) {
    res.status(200).json({
      message: "Failed to removed Connection",
      status: false,
    });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
