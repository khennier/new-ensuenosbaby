import express from 'express';
import verifyToken from '../middlewares/auth.middleware.js';
import { createOrder } from '../controllers/order.controller.js';
import { getOrders, updateOrderStatus } from '../controllers/order.controller.js';
import isAdmin from '../middlewares/admin.middleware.js';


const router = express.Router();

// Crear un pedido (solo para usuarios autenticados)
router.post('/create', verifyToken, createOrder);

// Obtener todos los pedidos (solo admin)
router.get('/', verifyToken, isAdmin, getOrders);

// Actualizar el estado de un pedido (solo admin)
router.put('/:id', verifyToken, isAdmin, updateOrderStatus);

export default router;
