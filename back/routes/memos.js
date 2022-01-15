const express = require('express');
const router = express.Router();

const ctrlMemos = require('../controllers/memos');

router.post('/add', ctrlMemos.addMemo);
router.get('/', ctrlMemos.getMemos);

module.exports = router;
