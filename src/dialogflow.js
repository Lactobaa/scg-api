import express from 'express';
import { WebhookClient } from 'dialogflow-fulfillment';

export async function getSum(req, res, next) {
  const agent = new WebhookClient({ request: req, response: res});
  function add(agent) {
    const number = agent.parameters.number;
    const number1 = agent.parameters.number1;
    const sum = number + number1;
    agent.add('ผลบวก = ' + sum);
  }

  let intentMap = new Map();
  intentMap.set('AddNumbers', add);
  agent.handleRequest(intentMap);
}
export const router = express.Router();
router.post('/', getSum); 
