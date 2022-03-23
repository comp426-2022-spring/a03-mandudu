import { coinFlips, countFlips, coinFlip, flipACoin} from "./modules/coin.mjs";

import minimist from 'minimist';
import express from 'express';

const app = express();
const arg = minimist(process.argv.slice(2))
var port = 'port'
const HTTP = arg[port] || 5000

const server = app.listen(HTTP, () => {
  console.log("App listening on port %PORT%".replace('%PORT%', HTTP))
})

app.get('/app/', (req, res) => {
  res.status(200).end('OK')
  res.type('text/plain')
});

app.get('/app/flip', (req,res)=>{
  res.status(200)
  res.type('text/plain')
  res.json({
    'flip':coinFlip()
  })
})
  
app.get('/app/flips/:number', (req, res) => {
  res.status(200)
  var arrayFlip = coinFlips(req.params.number)
  res.json({'raw': arrayFlip, 'summary': countFlips(arrayFlip)
  })
})

app.get('/app.flip/call/heads', (req, res) => {
  res.status(200)
  res.json(flipACoin('heads'));
})

app.get('/app/flip/call/tails', (req, res) => {
  res.status(200)
  res.json(flipACoin("tails"));
})

app.use(function(req, res) {
  res.status(404).send('404 NOT FOUND')
  res.type('text/plain')
});


