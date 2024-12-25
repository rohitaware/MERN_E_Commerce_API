import express from "express";
import { addProduct, deleteProductById, getProductById, getProducts, updateProductById } from "../Controllers/product.js";

const router = express.Router();

// Add Product Route
router.post('/add', addProduct);

//get products
router.get('/all',getProducts)

//get product by id
router.get('/:id',getProductById)

//Update product by id
router.put('/:id',updateProductById)

//Delete product by id
router.delete('/:id',deleteProductById)

export default router;
