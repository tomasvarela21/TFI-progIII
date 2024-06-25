const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/prueba1', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Definir un esquema y modelo para los usuarios
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema, 'usuarios');

// Endpoint para registrar usuarios
app.post('/auth/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'El usuario ya existe' });
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear una nueva instancia del modelo User
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Guardar en la base de datos
    await newUser.save();

    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
});

// Endpoint para autenticar usuarios (login)
app.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Buscar al usuario por email en la base de datos
    const user = await User.findOne({ email });

    // Si el usuario no existe
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Comparar la contraseña proporcionada con la almacenada en la base de datos
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    // Aquí podrías generar un token JWT para manejar la sesión del usuario (opcional)

    res.status(200).json({ message: 'Login exitoso' });
  } catch (error) {
    console.error('Error en el login:', error);
    res.status(500).json({ error: 'Error en el servidor al intentar iniciar sesión' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
