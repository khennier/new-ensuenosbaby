import Cart from '../models/cart.model.js';
import Product from '../models/product.model.js';

// Obtener el carrito del usuario
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate('products.product');
    if (!cart) {
      return res.status(404).json({ message: 'Carrito no encontrado' });
    }
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor', error });
  }
};

// Agregar producto al carrito
export const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    let cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      // Si el usuario no tiene carrito, creamos uno nuevo
      cart = new Cart({ user: req.user.id, products: [] });
    }

    // Verificar si el producto ya está en el carrito
    const existingProductIndex = cart.products.findIndex((item) => item.product.toString() === productId);
    if (existingProductIndex > -1) {
      // Si el producto ya está en el carrito, actualizamos la cantidad
      cart.products[existingProductIndex].quantity += quantity;
    } else {
      // Si el producto no está en el carrito, lo agregamos
      cart.products.push({ product: productId, quantity });
    }

    await cart.save();
    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor', error });
  }
};

// Eliminar producto del carrito
export const removeFromCart = async (req, res) => {
  const { productId } = req.params;

  try {
    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      return res.status(404).json({ message: 'Carrito no encontrado' });
    }

    cart.products = cart.products.filter((item) => item.product.toString() !== productId);

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor', error });
  }
};
