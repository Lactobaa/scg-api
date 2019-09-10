
import { http } from './http.js';
import express from 'express';

export async function getSearch(req, res, next) {
  try {
    const { params } = req;
    const googleApiUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+in+${params.area}&key=AIzaSyB9rJC8alNU5ijowpiazLwYyT6QtLJo7kU`;
    const response = await http.get(googleApiUrl);
    if (response && response.statusCode === 200) {
      const results = response.body.results;
      next([{ data: results }, response.statusCode]);
    } else {
      next([{ message: status }, response.statusCode]);
    }
  } catch (err) {
    next({ message: err.message }, 400);
  }
}

export const router = express.Router();
router.get('/restaurants/:area', getSearch);