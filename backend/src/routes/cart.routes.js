import express from 'express';
import verifyToken from '../middlewares/auth.middleware.js';
import { getCart, addToCart, removeFromCart } from '../controllers/cart.controller.js';

const router = express.Router();

// Proteger las rutas del carrito con JWT
router.get('/', verifyToken, getCart);          // Obtener carrito del usuario
router.post('/add', verifyToken, addToCart);    // Agregar producto al carrito
router.delete('/remove/:productId', verifyToken, removeFromCart);  // Eliminar producto del carrito

export default router;
