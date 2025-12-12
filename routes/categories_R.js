const express = require('express');
const router = express.Router();

const { 
    getAllCategories,
    getCategoryById,
    addCategory,
    deleteCategory,
    updateCategoryById
} = require('../controller/categories_C');

const { vaildValues,isValidId} = require('../middelware/categories_MID');
const { isLoggedIn } = require('../middelware/auth_MID');

router.use(isLoggedIn);

router.get('/',getAllCategories);
router.get('/:id',isValidId,getCategoryById);
router.post('/',isValidId, vaildValues, addCategory);
router.delete('/:id',isValidId, deleteCategory);
router.patch('/:id', isValidId, vaildValues, updateCategoryById);

module.exports = router;