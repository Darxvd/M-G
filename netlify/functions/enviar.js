const nodemailer = require("nodemailer");

exports.handler = async (event) => {
  try {
    const data = JSON.parse(event.body);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "Nueva cotización",
      html: `
        <h3>Nuevo formulario</h3>
        <p><b>Nombre:</b> ${data.nombre}</p>
        <p><b>DNI:</b> ${data.dni}</p>
        <p><b>Teléfono:</b> ${data.telefono}</p>
        <p><b>Correo:</b> ${data.correo}</p>
        <p><b>Servicio:</b> ${data.servicio}</p>
        <p><b>Archivo:</b> <a href="${data.archivo}">Ver PDF</a></p>
      `
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true })
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: error.toString()
    };
  }
};