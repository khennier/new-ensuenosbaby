import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Acceso denegado. Token no proporcionado' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Almacenar los datos del usuario en la solicitud
    next(); // Continuar al siguiente middleware o controlador
  } catch (error) {
    res.status(401).json({ message: 'Token no válido' });
  }
};

export default verifyToken;
