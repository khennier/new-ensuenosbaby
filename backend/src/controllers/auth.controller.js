import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Registro de usuarios
export const register = async (req, res) => {
  const { email, password, direccion, contacto } = req.body;

  try {
    // Verificar si el usuario ya existe
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    // Crear nuevo usuario
    const newUser = new User({ email, password, direccion, contacto });
    await newUser.save();

    // Generar token JWT
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: '1d', // Expira en un día
    });

    res.status(201).json({
      message: 'Usuario registrado con éxito',
      token,
      user: {
        id: newUser._id,
        email: newUser.email,
        direccion: newUser.direccion,
        contacto: newUser.contacto,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error });
  }
};

// Login de usuarios
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Buscar al usuario por su email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Credenciales incorrectas' });
    }

    // Verificar la contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Credenciales incorrectas' });
    }

    // Generar token JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d', // Expira en un día
    });

    res.status(200).json({
      message: 'Inicio de sesión exitoso',
      token,
      user: {
        id: user._id,
        email: user.email,
        direccion: user.direccion,
        contacto: user.contacto,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error });
  }
};
