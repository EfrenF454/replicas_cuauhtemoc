const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/contact', async (req, res) => {
  const { nombre, email, mensaje } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      host: "mail.tudominio.com",   // Cambia por el host SMTP de Neubox o tu proveedor
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Formulario Web" <${process.env.MAIL_USER}>`,
      to: process.env.MAIL_USER,
      subject: `Nuevo mensaje de ${nombre}`,
      html: `<p><b>Nombre:</b> ${nombre}</p>
             <p><b>Email:</b> ${email}</p>
             <p><b>Mensaje:</b> ${mensaje}</p>`,
    });

    res.status(200).json({ message: 'Correo enviado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error enviando correo' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
