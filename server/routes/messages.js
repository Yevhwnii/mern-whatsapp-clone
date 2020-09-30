const express = require('express');
const Messages = require('../models/dbMessage');

const router = express.Router();

router.get('/messages/sync', (req, res) => {
  Messages.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).json({ messages: data });
    }
  });
});

router.post('/messages/new', (req, res) => {
  const dbMessage = req.body;

  Messages.create(dbMessage, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).json({ message: 'Message has been added', entity: data });
    }
  });
});

module.exports = router;
