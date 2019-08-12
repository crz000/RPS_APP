const gameUtils = require('./gameUtils'); 
const mongoose = require('mongoose');
const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const Data = require('./data');

const API_PORT = 3001;
const app = express();
app.use(cors());
const router = express.Router();

const dbRoute =
  'mongodb+srv://crz_mongo1:mongomongo873@firstcluster-fovkn.mongodb.net/test?retryWrites=true&w=majority';


mongoose.connect(dbRoute, { useNewUrlParser: true });

let db = mongoose.connection;

db.once('open', () => console.log('connected to the database'));


db.on('error', console.error.bind(console, 'MongoDB connection error:'));


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));


router.get('/getData', (req, res) => {
  Data.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});


router.post('/updateData', (req, res) => {
  const { id, update } = req.body;
  let rounds = gameUtils.calculateWinners(req.body.update);
  Data.findOneAndUpdate({id:id}, {$set: {rounds:rounds}}, (err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, rounds: rounds, emperor: gameUtils.calculateEmperor(rounds) });
  });
});

router.delete('/deleteData', (req, res) => {
  const { id } = req.body;
  Data.findByIdAndRemove(id, (err) => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
});

router.post('/putData', (req, res) => {
  let data = new Data();
  let id = Math.random().toString(13).replace('0.', '');
  data.id = id;
  data.player1 = req.body.player1;
  data.player2 = req.body.player2;
  data.rounds = [];
  data.save((err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, id: id  });
  });
});

app.use('/api', router);

app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));