import express from 'express';
import dotenv from 'dotenv';
import connectDB from './src/config/db.js';
import productRoutes from './src/routes/product.routes.js';
import authRoutes from './src/routes/auth.routes.js';  // Importar las rutas de autenticación
import cartRoutes from './src/routes/cart.routes.js';  // Importar las rutas del carrito
import orderRoutes from './src/routes/order.routes.js';


dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);  // Añadir las rutas de autenticación
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

const PORT = process.env.PORT || 8181;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
