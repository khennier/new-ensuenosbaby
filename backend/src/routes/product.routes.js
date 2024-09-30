import express from 'express';
import Product from '../models/product.model.js';
import isAdmin from '../middlewares/admin.middleware.js';
import verifyToken from '../middlewares/auth.middleware.js';  // Asegurar que el usuario esté autenticado

const router = express.Router();

// Obtener todos los productos (accesible para todos, no requiere autenticación)
router.get('/', async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// Crear un producto (solo administrador)
router.post('/', verifyToken, isAdmin, async (req, res) => {
  const { name, description, price, stock, category, image } = req.body;
  const product = new Product({ name, description, price, stock, category, image });
  await product.save();
  res.status(201).json(product);
});

// Actualizar un producto (solo administrador)
router.put('/:id', verifyToken, isAdmin, async (req, res) => {
  const { name, description, price, stock, category, image } = req.body;
  const product = await Product.findByIdAndUpdate(req.params.id, { name, description, price, stock, category, image }, { new: true });
  res.json(product);
});

// Eliminar un producto (solo administrador)
router.delete('/:id', verifyToken, isAdmin, async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.status(204).json({ message: 'Producto eliminado' });
});

export default router;
