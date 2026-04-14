const express = require('express');
const router = express.Router();
const products = require('../Models/Products');
const { registerUser, loginUser } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const authorizeRoles = require("../middleware/roleMiddleware");
const { body, validationResult } = require('express-validator');

const passwordValidator = body('password')
  .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
  .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
  .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter')
  .matches(/[0-9]/).withMessage('Password must contain at least one number')
  .matches(/[@$!%*?&]/).withMessage('Password must contain at least one special character (@$!%*?&)')
  .trim();

const emailValidator = body('email')
  .isEmail().withMessage('Please enter a valid email address')
  .normalizeEmail();

const nameValidator = body('name')
  .isString().withMessage('Name must be a string')
  .notEmpty().withMessage('Name is required')
  .trim()
  .escape();

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

router.post('/api/auth/register', [nameValidator, emailValidator, passwordValidator, validateRequest], registerUser);
router.post('/api/auth/login', loginUser);

const allowedFiles = ["file1.pdf", "file2.jpg"];

router.get('/files/:filename', (req, res) => {
  if (!allowedFiles.includes(req.params.filename)) {
    return res.status(403).json({ message: "Access denied" });
  }

  res.status(200).json({ message: `Access granted to ${req.params.filename}` });
});

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
    body('ProductBarcode')
        .isNumeric().withMessage('Barcode must be a number')
        .toInt()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
debugger
    const { ProductName, ProductPrice, ProductBarcode } = req.body;

    if (typeof ProductName !== 'string' || typeof ProductPrice !== 'number' || typeof ProductBarcode !== 'number') {
        return res.status(400).json({ message: 'Invalid input types.' });
    }

    try {
        const pre = await products.findOne({ ProductBarcode: ProductBarcode })
        console.log(pre);

        if (pre) {
            res.status(422).json("Product is already added.")
        }
        else {
            const addProduct = new products({ ProductName, ProductPrice, ProductBarcode })

            await addProduct.save();
            res.status(201).json(addProduct)
            console.log(addProduct)
        }
    }
    catch (err) {
        console.log(err)
    }
})

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
    body('ProductBarcode')
        .isNumeric().withMessage('Barcode must be a number')
        .toInt()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { ProductName, ProductPrice, ProductBarcode } = req.body;

    if (typeof ProductName !== 'string' || typeof ProductPrice !== 'number' || typeof ProductBarcode !== 'number') {
        return res.status(400).json({ message: 'Invalid input types.' });
    }

    try {
        const updateProducts = await products.findByIdAndUpdate(req.params.id, { ProductName, ProductPrice, ProductBarcode }, { new: true });
        console.log("Data Updated");
        res.status(201).json(updateProducts);
    }
    catch (err) {
        console.log(err);
    }
})

router.delete('/deleteproduct/:id', async (req, res) => {

    try {
        const deleteProduct = await products.findByIdAndDelete(req.params.id);
        console.log("Data Deleted");
        console.log(`User ${req.user.id} deleted product`);
        res.status(201).json(deleteProduct);
    }
    catch (err) {
        console.log(err);
    }
})


module.exports = router;