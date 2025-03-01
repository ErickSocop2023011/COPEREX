import Category from './category.model.js';
//import Company from '../company.model.js'

export const addCategory = async (req, res) => {
    try {
        const data=req.body

        const category = await Category.create(data)

        return res.status(201).json({
            success: true,
            message: "Category created successfully",
            category
        })

    }catch(err){
        return res.status(400).json({
            success: false,
            message: "Category created failed",
            error: err.message
        })
    }
}

export const updateCategory = async (req, res) => {
    try{
        const { cid } = req.params;
        const data = req.body;

        const category = await Category.findByIdAndUpdate(cid, data, { new: true }); 

        return res.status(200).json({
            success: true,
            message: 'Updated category',
            category
        });
    }
    catch(err){
        return res.status(500).json({
            success: false,
            message: 'Error updating category',
            error: err.message
        });
    }
}

export const deleteCategory = async (req, res) => {
    try {
        const { cid } = req.params;
        const category = await Category.findByIdAndUpdate(cid, { status: false }, { new: true });
        /*const defaultCategory = await Category.findOne({ name: 'default' });

        const company = await Company.find({ category: cid });

        await Promise.all(
            company.map(async (comp) => {
                comp.category = defaultCategory._id;
                return comp.save();
            })
        );*/

        return res.status(200).json({
            success: true,
            message: 'Deleted category',
            category
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Error deleting category',
            error: err.message
        });
    }
}