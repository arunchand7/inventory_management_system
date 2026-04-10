const express = require('express');
const router = express.Router();
const products = require('../Models/Products');
const { registerUser, loginUser } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const authorizeRoles = require("../middleware/roleMiddleware");
const { body, validationResult } = require('express-validator');

// Authentication routes
router.post('/api/auth/register', registerUser);
router.post('/api/auth/login', loginUser);

//Inserting(Creating) Data:
router.post("/insertproduct", [
    body('ProductName')
        .isString().withMessage('Name must be a string')
        .matches(/^[a-zA-Z0-9 ]+$/).withMessage('Invalid characters in product name')
        .notEmpty().withMessage('Name is required')
        .trim()
        .escape(),
    body('ProductPrice')
        .isNumeric().withMessage('Price must be a number')
        .toFloat(),
    body('ProductQuantity')
        .isInt().withMessage('Quantity must be an integer')
        .toInt(),
    body('ProductBarcode')
        .isNumeric().withMessage('Barcode must be a number')
        .toInt()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
debugger
    const { ProductName, ProductPrice, ProductBarcode, ProductQuantity } = req.body;

    if (typeof ProductName !== 'string' || typeof ProductPrice !== 'number' || typeof ProductBarcode !== 'number' || typeof ProductQuantity !== 'number') {
        return res.status(400).json({ message: 'Invalid input types.' });
    }

    try {
        const pre = await products.findOne({ ProductBarcode: ProductBarcode })
        console.log(pre);

        if (pre) {
            res.status(422).json("Product is already added.")
        }
        else {
            const addProduct = new products({ ProductName, ProductPrice, ProductBarcode, ProductQuantity })

            await addProduct.save();
            res.status(201).json(addProduct)
            console.log(addProduct)
        }
    }
    catch (err) {
        console.log(err)
    }
})

//Getting(Reading) Data:
router.get('/products', async (req, res) => {

    try {
        const getProducts = await products.find({})
        console.log(getProducts);
        res.status(201).json(getProducts);
    }
    catch (err) {
        console.log(err);
    }
})

//Getting(Reading) individual Data:
router.get('/products/:id', async (req, res) => {

    try {
        const getProduct = await products.findById(req.params.id);
        console.log(getProduct);
        res.status(201).json(getProduct);
    }
    catch (err) {
        console.log(err);
    }
})

//Editing(Updating) Data:
router.put('/updateproduct/:id', [
    body('ProductName')
        .isString().withMessage('Name must be a string')
        .matches(/^[a-zA-Z0-9 ]+$/).withMessage('Invalid characters in product name')
        .notEmpty().withMessage('Name is required')
        .trim()
        .escape(),
    body('ProductPrice')
        .isNumeric().withMessage('Price must be a number')
        .toFloat(),
    body('ProductQuantity')
        .isInt().withMessage('Quantity must be an integer')
        .toInt(),
    body('ProductBarcode')
        .isNumeric().withMessage('Barcode must be a number')
        .toInt()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { ProductName, ProductPrice, ProductBarcode, ProductQuantity } = req.body;

    if (typeof ProductName !== 'string' || typeof ProductPrice !== 'number' || typeof ProductBarcode !== 'number' || typeof ProductQuantity !== 'number') {
        return res.status(400).json({ message: 'Invalid input types.' });
    }

    try {
        const updateProducts = await products.findByIdAndUpdate(req.params.id, { ProductName, ProductPrice, ProductBarcode, ProductQuantity }, { new: true });
        console.log("Data Updated");
        res.status(201).json(updateProducts);
    }
    catch (err) {
        console.log(err);
    }
})

//Deleting Data:
router.delete('/deleteproduct/:id', async (req, res) => {

    try {
        const deleteProduct = await products.findByIdAndDelete(req.params.id);
        console.log("Data Deleted");
        res.status(201).json(deleteProduct);
    }
    catch (err) {
        console.log(err);
    }
})


module.exports = router;