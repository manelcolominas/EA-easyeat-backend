import express from 'express';
import controller from '../controllers/user';
import { Schemas, ValidateJoi } from '../middleware/joi';

const router = express.Router();

/**
 * @openapi
 * tags:
 *   - name: Users
 *     description: CRUD endpoints for users
 *
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: MongoDB ObjectId
 *           example: "65f1c2a1b2c3d4e5f6789012"
 *         name:
 *           type: string
 *           example: "Judit"
 *         email:
 *           type: string
 *           example: "judit@gmail.com"
 *         password:
 *           type: string
 *           example: "password123"
 *         organization:
 *           type: string
 *           description: The organization's ObjectId
 *           example: "65f1c2a1b2c3d4e5f6789013"
 *     UserCreateUpdate:
 *       type: object
 *       required:
 *         - name
 *         - organization
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           example: "Judit"
 *         email:
 *           type: string
 *           example: "judit@gmail.com"
 *         password:
 *           type: string
 *           example: "password123"
 *         organization:
 *           type: string
 *           description: The organization's ObjectId (24 hex)
 *           example: "65f1c2a1b2c3d4e5f6789013"
 */

/**
 * @openapi
 * /users:
 *   post:
 *     summary: Creates a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserCreateUpdate'
 *     responses:
 *       201:
 *         description: Created
 *       422:
 *         description: Validation failed (Joi)
 */
router.post('/', ValidateJoi(Schemas.user.create), controller.createUser);

/**
 * @openapi
 * /users/{userId}:
 *   get:
 *     summary: Gets a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The user's ObjectId
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Not found
 */
router.get('/:userId', controller.readUser);

/**
 * @openapi
 * /users:
 *   get:
 *     summary: Lists all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: OK
 */
router.get('/', controller.readAll);

/**
 * @openapi
 * /users/{userId}:
 *   put:
 *     summary: Updates a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The user's ObjectId
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserCreateUpdate'
 *     responses:
 *       201:
 *         description: Updated
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation failed (Joi)
 */
router.put('/:userId', ValidateJoi(Schemas.user.update), controller.updateUser);

/**
 * @openapi
 * /users/{userId}:
 *   delete:
 *     summary: Deletes a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The user's ObjectId
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Not found
 */
router.delete('/:userId', controller.deleteUser);

export default router;
