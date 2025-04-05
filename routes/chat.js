const express = require('express');
const router = express.Router();

const rooms = [
  { id: 'room1', name: 'General Chat' },
  { id: 'room2', name: 'Developers' },
  { id: 'room3', name: 'Gaming Room' }
];

router.get('/rooms', (req, res) => {
  res.json(rooms);
});

module.exports = router;
