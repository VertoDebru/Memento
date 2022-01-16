const express = require('express');
const router = express.Router();

const ctrlCategories = require('../controllers/categories');

router.post('/add', ctrlCategories.addNewCategory);
router.get('/', ctrlCategories.getAllCategories);
router.get('/:catId', ctrlCategories.getOneCategory);

module.exports = router;
