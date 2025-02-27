import express from 'express';
import { updateUser, updatePassword, deleteUser, updateMe, deleteMe } from './user.controller.js';
import {  updatePasswordValidator, updateUserValidator, deleteUserValidator  } from "../middlewares/user-validator.js"
import router from '../auth/auth.routes.js';

/**
 * @swagger
 * /user/updatePassword:
 *   patch:
 *     summary: Update user password
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password updated successfully
 *       401:
 *         description: Unauthorized
 *     roles:
 *       - admin
 */
router.patch('/updatePassword', updatePasswordValidator, updatePassword)

/**
 * @swagger
 * /user/updateMe:
 *   put:
 *     summary: Update current user information
 *     tags: [User]
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
 *               surname:
 *                 type: string
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: User information updated successfully
 *       401:
 *         description: Unauthorized
 *     roles:
 *       - admin
 */
router.put('/updateMe', updateUserValidator, updateMe)

/**
 * @swagger
 * /user/updateUser/{uid}:
 *   put:
 *     summary: Update user information by ID
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uid
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               surname:
 *                 type: string
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: User information updated successfully
 *       401:
 *         description: Unauthorized
 *     roles:
 *       - admin
 */
router.put('/updateUser/:uid', updateUserValidator, updateUser)

/**
 * @swagger
 * /user/deleteMe:
 *   delete:
 *     summary: Delete current user
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       401:
 *         description: Unauthorized
 *     roles:
 *       - admin
 */
router.delete('/deleteMe', deleteUserValidator, deleteMe )

/**
 * @swagger
 * /user/deleteUser/{uid}:
 *   delete:
 *     summary: Delete user by ID
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uid
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       401:
 *         description: Unauthorized
 *     roles:
 *       - admin
 */
router.delete('/deleteUser/:uid',deleteUserValidator, deleteUser)

export default router;