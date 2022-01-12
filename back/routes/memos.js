const express = require('express');
const router = express.Router();

const ctrlMemos = require('../controllers/memos');

router.get('/', ctrlMemos.getMemos);
router.post('/', ctrlMemos.addNewMemo);

module.exports = router;
