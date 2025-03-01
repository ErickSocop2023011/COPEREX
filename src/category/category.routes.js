import { addCategoryValidator, updateCategoryValidator, deleteCategoryValidator} from "../middlewares/category-validator.js";
import { addCategory, updateCategory,deleteCategory } from "./category.controller.js";
import { Router } from "express";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const router = Router();

/**
 * @swagger
 * /category/addcategory:
 *   post:
 *     summary: Add a new category
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Category created successfully
 *       400:
 *         description: Category creation failed
 */
router.post("/addcategory", addCategoryValidator, addCategory);

/**
 * @swagger
 * /category/updtcategory/{cid}:
 *   put:
 *     summary: Update a category by ID
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: cid
 *         schema:
 *           type: string
 *         required: true
 *         description: Category ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Category updated successfully
 *       500:
 *         description: Error updating category
 */
router.put("/updtcategory/:cid", updateCategoryValidator, updateCategory);

/**
 * @swagger
 * /category/deletecategory/{cid}:
 *   delete:
 *     summary: Delete a category by ID
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: cid
 *         schema:
 *           type: string
 *         required: true
 *         description: Category ID
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *       500:
 *         description: Error deleting category
 */
router.delete("/deletecategory/:cid", deleteCategoryValidator, deleteCategory);

export default router;