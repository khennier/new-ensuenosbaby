import Order from '../models/order.model.js';
import Cart from '../models/cart.model.js';

export const createOrder = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate('products.product');
    
    if (!cart || cart.products.length === 0) {
      return res.status(400).json({ message: 'El carrito está vacío' });
    }

    const total = cart.products.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

    const newOrder = new Order({
      user: req.user.id,
      products: cart.products,
      total,
    });

    await newOrder.save();

    // Vaciar el carrito después de generar el pedido
    cart.products = [];
    await cart.save();

    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error });
  }
};

export const updateOrderStatus = async (req, res) => {
    const { status } = req.body;
    const { id } = req.params;
  
    try {
      const order = await Order.findById(id);
      if (!order) {
        return res.status(404).json({ message: 'Pedido no encontrado' });
      }
  
      order.status = status;
      await order.save();
  
      res.status(200).json(order);
    } catch (error) {
      res.status(500).json({ message: 'Error en el servidor', error });
    }
  };
  