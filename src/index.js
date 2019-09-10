import express from 'express';
import cors from 'cors';
import { router as googleMap } from './googlemap.js';
import { router as lineBot } from './linebot.js';
import { router as dialogflow } from './dialogflow.js';
import { router as sequence } from './sequence.js';
import bodyParser from 'body-parser';
const app = express();
const jsonParser = bodyParser.json({ limit: '25mb' });
const urlencode = bodyParser.urlencoded({ extended: true });
const prefix = '/scg/api'
app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(`${prefix}/search`, [jsonParser, urlencode], googleMap);
app.use(`${prefix}/bot`, lineBot);
app.use(`${prefix}/sequence`, sequence);
app.use(`${prefix}/dialogflow`, [jsonParser, urlencode], dialogflow);

app.use(([body, status], req, res, next) => {
  res.status(status).json(body);
  next();
});

app.listen(3002, function () {
  console.log("Listening on port 3002!")
});