const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('./Employee');

app.use(bodyParser.json());
const Employee = mongoose.model('employee');
const mongoUri =
  'mongodb+srv://pblink:3kvR0kxpfTXpDUuG@cluster0.9bgh8.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on('connected', () => {
  console.log('Connected to mongo');
});
mongoose.connection.on('error', err => {
  console.log('error', err);
});
app.get('/', (req, res) => {
  Employee.find({}).then(data => {
    res.send(data);
  });
});
app.post('/send-data', (req, res) => {
  const employee = new Employee({
    name: req.body.name,
    mail: req.body.mail,
    phone: req.body.phone,
    stand: req.body.stand,
    salary: req.body.salary,
    imageSource: req.body.imageSource,
  });
  employee
    .save()
    .then(data => {
      console.log(data);
      res.send(data);
    })
    .catch(err => {
      console.log(err);
    });
});
app.post('/delete', (req, res) => {
  Employee.findByIdAndRemove(req.body.id)
    .then(data => {
      console.log(data);
      res.send(data);
    })
    .catch(err => {
      console.log(err);
    });
});
app.post('/update', (req, res) => {
  Employee.findByIdAndUpdate(req.body.id, {
    name: req.body.name,
    mail: req.body.mail,
    phone: req.body.phone,
    stand: req.body.stand,
    salary: req.body.salary,
    imageSource: req.body.imageSource,
  })
    .then(data => {
      console.log(data);
      res.send(data);
    })
    .catch(err => {
      console.log(err);
    });
});

app.listen(3000, () => {
  console.log('server running');
});
