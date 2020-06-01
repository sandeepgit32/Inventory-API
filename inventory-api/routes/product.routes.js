const express = require("express");
const ProductController = require("../controllers/product.controller");

var router = express.Router();

/**
 * @swagger
 * /products:
 *  get:
 *    summary: Retrieve all products
 *    parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Search product based on product name
 *       - in: query
 *         name: u_sell
 *         schema:
 *           type: object
 *           properties:
 *             "lt":
 *               type: number
 *             "gt":
 *               type: number
 *             "lte":
 *               type: number
 *             "gte":
 *               type: number
 *         description: Search product based on sell value of the product.
 *    responses:
 *      '200':
 *          description: A successful response
 *      '500':
 *          description: Internal server error
 */
router.get('/', ProductController.findAll);

/**
 * @swagger
 * /products:
 *  post:
 *      summary: Create a single product
 *      parameters:
 *        - in: body
 *          name: product
 *          required: true
 *          schema:
 *              type: object
 *              properties:
 *                  product_code:
 *                      type: string
 *                  name:
 *                      type: string
 *                  category:
 *                      type: string
 *                  description:
 *                      type: string
 *                  supplier:
 *                      type: string
 *                  u_sell:
 *                      type: number
 *                  u_buy:
 *                      type: number
 *                  u_measure:
 *                      type: string
 *              required:
 *                - content
 *      responses:
 *          '201':
 *              description: Created a new product
 *          '400':
 *              description: Product content can't be empty
 *          '500':
 *              description: Internal server error
 */
router.post('/', ProductController.create);


/**
 * @swagger
 * /products/{productID}:
 *  get:
 *      summary: Retrieve a single product with productID
 *      parameters:
 *        - name: productID
 *          in: path
 *          required: true
 *          description: Enter the productID
 *      responses:
 *          '200':
 *              description: A successful response
 *          '404':
 *              description: Product is not found with specified productID
 *          '500':
 *              description: The specified productID is invalid or Internal server error
 */
router.get('/:productID', ProductController.findOne);


/**
 * @swagger
 * /products/{productID}:
 *  patch:
 *      summary: Update a single product with productID
 *      parameters:
 *        - name: productID
 *          in: path
 *          required: true
 *          description: Enter the productID
 *        - name: productcontent
 *          in: body
 *          required: true
 *          schema:
 *              type: object
 *              properties:
 *                  product_code:
 *                      type: string
 *                  name:
 *                      type: string
 *                  category:
 *                      type: string
 *                  description:
 *                      type: string
 *                  supplier:
 *                      type: string
 *                  u_sell:
 *                      type: number
 *                  u_buy:
 *                      type: number
 *                  u_measure:
 *                      type: string
 *      responses:
 *          '201':
 *              description: Successfully updated
 *          '404':
 *              description: Product is not found with specified productID
 *          '500':
 *              description: The specified productID is invalid or Internal server error
 */
router.patch('/:productID', ProductController.updateInfo);

module.exports = router