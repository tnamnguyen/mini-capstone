const express = require('express')
const app = express()
const port = 3001
const cors = require('cors')
const bodyParser = require("express");

// server mongodb
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://test_user:test_user12345@minicapstone.nfejagl.mongodb.net/?retryWrites=true&w=majority")
.then(()=> console.log("success")).catch(()=> console.log("fail"))


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

  // Perform validation
  // ...

  // Hash the password
  // ...

  // Save the new user to the database
  // ...

  // Send a response to the client
  res.json({
    success: true,
    message: 'Successfully signed up'
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})