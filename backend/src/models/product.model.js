import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  category: String,
  image: String, // Puedes agregar un campo de imagen si lo necesitas
});

const Product = mongoose.model('Product', productSchema);
export default Product;
