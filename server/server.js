const express = require('express');
const bodyParser = require('body-parser');
const PouchDB = require('pouchdb');

const api_key = 'api:key-066e557ec49de00a0df4dfe3c8444cc3';
const mailgun = require('mailgun-js')({ apiKey: api_key });

const app = express();
const db = new PouchDB('users');

//Middle
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Routes
//test server with GET
app.get('/', (req, res) => {
  res.json({ message: 'The server is live!' });
});

//handle login attempt
app.post('/login', (req, res) => {
  console.log(req.body);
  //now check info against db
  db.get(req.body.email)
    .then((data) => {
      if (data.password === req.body.hash) res.status(201).send('Match');
      else res.status(401).send('Incorrect password');
    }).catch((err) => res.status(201).send('No email match. ' + err));
});

//register new user
app.post('/register', (req, res) => {
  console.log(req.body.message);
  
  //upon registration, create a mock billing history with some probability of each month's bill missing.
  const bills = [];
  const missingBillProb = .04;
  //need to build the rest of this mock bill creation

  db.put({ _id: req.body.email,
          password: req.body.password,
          //bills: bills
        })
    .then(() => {
      //once new account is created, send email with mailgun
      mailgun.messages().send({
          from: 'billChecker <postmaster@sandbox5659cedc6de34d0594a2f07c3ee15e59.mailgun.org>',
          to: req.body.email,
          subject: 'Welcome to billChecker!',
          text: 'Thank you for registering for billChecker!'
        }, 
        (error, body) => {
          console.log(body);
        });
    }).then(() => res.status(201).send('Registered'))
      .catch((err) => console.log(err));
});

//handle bill request
app.get('/bills', (req, res) => {
  db.get(req.body.email)
    .then((data) => res.status(201).send(data.bills))
    .catch((err) => console.log(err));
}

//Listen
const port = process.env.PORT || 4040;
app.listen(port);
console.log('Listening on port ' + port);
