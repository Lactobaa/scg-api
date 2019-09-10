import express from 'express';

export async function getNumbers(req, res, next) {
  try {
    let result = 3;
    let list = [];
    for (let i = 1; i <= 7; i++) {
      list.push(result);
      result = result + (i * 2);
    }
    next([{
      data: {
        x: list[0],
        y: list[5],
        z: list[6],
      }
    }, 200]);
  } catch (err) {
    next({ message: err.message }, 400);
  }
}

export const router = express.Router();
router.get('/', getNumbers);