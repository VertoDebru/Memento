const express = require('express');
const router = express.Router();

const ctrlCategories = require('../controllers/categories');

router.post('/', ctrlCategories.addNewCategory);
router.get('/', ctrlCategories.getAllCategories);

module.exports = router;
