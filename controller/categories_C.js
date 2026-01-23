const { use } = require('react');
const { getAll, getById, add, remove, updateCategory, removeTasksByCategory, getTasksByCategory } = require('../model/categories_M');

async function getAllCategories(req,res) {
    try {
        let categories = await getAll(req.user.id);
        
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
        let category = await getById(req.params.id,req.user.id);

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
        let id = req.id;
        let userId = req.user.id;
        let tasks = await getTasksByCategory(id, userId);
        if (tasks.length > 0) {
            return res.status(200).json({ 
                hasTasks: true, 
                taskCount: tasks.length,
                message: `This category has ${tasks.length} task(s). Confirm deletion to remove category and all its tasks.`
            });
        }
        let affectedRows = await remove(id,userId);
        if (!affectedRows) {
            return res.status(404).json({ message:"Category not found" });
        }
        res.status(200).json({ message:"Category deleted!" });
    } catch(err) {
        console.error(err);
        res.status(500).json({ message:"Server Error" });
    }
}
async function updateCategoryById(req, res){
    try{
    let id = req.params.id;
    let userId = req.user.id;
    let name = req.body.name;

    let affectedRows = await updateCategory(id,userId,name);
      if (!affectedRows) {
            return res.status(404).json({ message: "Category not found or not yours" });
        }

        res.status(200).json({ message: "Category updated!" });

    }
     catch(err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
     }
}
async function deleteCategoryWithTasks(req,res) {
    try{
        let id = req.id;
        let userId = req.user.id;
        await removeTasksByCategory(id,userId);
        let affectedRows = await remove(id,userId);
        if(!affectedRows){
            return res.status(404).json({message:"Category not found"});
        }
        res.status(200).json({ message:"Category and all its tasks deleted!" });
    }catch(err){
        console.error(err);
        res.status(500).json({message:"Server Error"});
    }
    
}

module.exports = {
    getAllCategories,
    getCategoryById,
    addCategory,
    deleteCategory,
    deleteCategoryWithTasks,
    updateCategory,
    updateCategoryById,
}