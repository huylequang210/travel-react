// logs
const { Router } = require('express');
require('dotenv').config();
const logEntry = require('../models/LogEntry');

const router = Router();

const { API_KEY } = process.env; 

router.get('/', async (req, res, next) => {
  try{
    const entries = await logEntry.find();
    res.json(entries);
  }catch(error) {
    next(error);
  };
});

router.post('/', async (req, res, next) => {
  try {
    if(req.get('X-API-KEY') !== API_KEY) {
      res.status(401);
      throw new Error('UnAuthorized');
    }
    const log = new logEntry(req.body);
    const createdEntry = await log.save();
    res.json(createdEntry);
  }catch(error) {
    if(error.name === 'ValidationError') res.status(422);
    next(error);
  }

});

router.delete('/:id', async (req, res, next) => {
  const id = req.params.id;
  try {
    if(req.get('X-API-KEY') !== API_KEY) {
      res.status(401);
      throw new Error('UnAuthorized');
    }
     const log = await logEntry.findById(id);
     await logEntry.remove(log);
     res.json(log);
  }catch(error) {
    res.status(401);
    next(error);
  }
});
module.exports = router;