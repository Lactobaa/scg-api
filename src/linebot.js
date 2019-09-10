import * as line from '@line/bot-sdk';
import express from 'express';
import config from './config.json';
const client = new line.Client(config);

async function handleEvent(event) {
  switch (event.type) {
    case 'message':
      const message = event.message;
      switch (message.type) {
        case 'text':
          return handleText(message, event);
        case 'image':
          return handleImage(message, event);
        case 'video':
          return handleVideo(message, event);
        case 'audio':
          return handleAudio(message, event);
        case 'location':
          return handleLocation(message, event);
        case 'sticker':
          return handleSticker(message, event);
        default:
          throw new Error(`Unknown message: ${JSON.stringify(message)}`);
      }
    default:
      throw new Error(`Unknown event: ${JSON.stringify(event)}`);
  }
}

async function handleText(message, event) {
  return client.replyMessage(event.replyToken, { type: 'text', text: message.text });
}

function handleImage(message, event) {
  return client.replyMessage(event.replyToken, { type: 'text', text: 'Got Image' });
}

function handleVideo(message, event) {
  return client.replyMessage(event.replyToken, { type: 'text', text: 'Got Video' });
}

function handleAudio(message, event) {
  return client.replyMessage(event.replyToken, { type: 'text', text: 'Got Audio' });
}

function handleLocation(message, event) {
  return client.replyMessage(event.replyToken, { type: 'text', text: 'Got Location' });
}

function handleSticker(message, event) {
  let result = {
    type: 'sticker',
    packageId: '11537',
    stickerId: '52002759'
  };

  return client.pushMessage(event.source.userId, result);
}

export async function getMessage(req, res, next) {
  if (!Array.isArray(req.body.events)) {
    return res.status(500).end();
  }
  Promise.all(req.body.events.map(event => {
    console.log('event', event);
    return handleEvent(event);
  }))
    .then(() => res.end())
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });

  next([{ message: 'Success' }, '200']);
}

export const router = express.Router();
router.post('/', line.middleware(config), getMessage);
