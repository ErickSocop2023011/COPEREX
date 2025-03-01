import express from "express";

import { addCompany, generateCompaniesReport, updateCompany } from "../company/company.controller.js";
import { createCompanyValidator, updateCompanyValidator } from "../middlewares/company-validator.js";

const router = express.Router();

/**
 * @swagger
 * /company/registerCompany:
 *   post:
 *     summary: Register a new company
 *     tags: [Company]
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
 *               foundedYear:
 *                 type: number
 *               impactLevel:
 *                 type: string
 *               category:
 *                 type: string
 *               telephone:
 *                 type: string
 *               representative:
 *                 type: string
 *     responses:
 *       201:
 *         description: Company has been registered
 *       500:
 *         description: Error registering the company
 */
router.post("/registerCompany", createCompanyValidator, addCompany)

/**
 * @swagger
 * /company/updateCompany/{cid}:
 *   put:
 *     summary: Update a company by ID
 *     tags: [Company]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: cid
 *         schema:
 *           type: string
 *         required: true
 *         description: Company ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               foundedYear:
 *                 type: number
 *               impactLevel:
 *                 type: string
 *               category:
 *                 type: string
 *               telephone:
 *                 type: string
 *               representative:
 *                 type: string
 *     responses:
 *       200:
 *         description: Company updated
 *       500:
 *         description: Error updating company
 */
router.put("/updateCompany/:cid", updateCompanyValidator, updateCompany)

/**
 * @swagger
 * /company/report:
 *   post:
 *     summary: Generate a report of companies
 *     tags: [Company]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               order:
 *                 type: string
 *               minYear:
 *                 type: number
 *               maxYear:
 *                 type: number
 *               category:
 *                 type: string
 *               impactLevel:
 *                 type: string
 *     responses:
 *       200:
 *         description: Companies filtered successfully, the file is located in the reports folder
 *       500:
 *         description: Error getting companies
 */
router.post("/report", generateCompaniesReport)

export default router;