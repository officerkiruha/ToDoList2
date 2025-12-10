const { getAll, getById, add, remove } = require('../model/categories_M');

async function getAllCategories(req,res) {
    try {
        let categories = await getAll();
        
        if (!categories.length) {
            return res.status(400).json({ message: "No Data" });
        }

        res.status(200).json(categories);
    } catch(err) {
        console.error(err);
        res.status(500).json({ message:"Server Error" });
    }
}

async function getCategoryById(req,res) {
    try {
        let id = req.params.id;
        let category = await getById(id);

        if (!category) {
            return res.status(404).json({ message:"Category not found" });
        }

        res.status(200).json(category);
    } catch(err) {
        console.error(err);
        res.status(500).json({ message:"Server Error" });
    }
}

async function addCategory(req,res) {
    try {
        let name = req.body.name;
        let userId = req.user.id;

        let categoryId = await add({ name, userId });

        if (!categoryId) {
            return res.status(500).json({ message:"Server Error" });
        }

        res.status(201).json({ message:"Category added!" });
    } catch(err) {
        console.error(err);
        res.status(500).json({ message:"Server Error" });
    }
}

async function deleteCategory(req,res) {
    try {
        let id = req.params.id;

        let affectedRows = await remove(id);

        if (!affectedRows) {
            return res.status(404).json({ message:"Category not found" });
        }

        res.status(200).json({ message:"Category deleted!" });
    } catch(err) {
        console.error(err);
        res.status(500).json({ message:"Server Error" });
    }
}

module.exports = {
    getAllCategories,
    getCategoryById,
    addCategory,
    deleteCategory
}