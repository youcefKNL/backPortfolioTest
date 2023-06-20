const express = require("express");
const nodemailer = require("nodemailer");

const router = express.Router();

// Configurer Nodemailer
const transporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com",
  secureConnection: false,
  port: 587,
  tls: {
    ciphers: "SSLv3",
  },
  auth: {
    user: process.env.MAIL,
    pass: process.env.MAIL_PASS,
  },
});

router.post("/", (req, res) => {
  const { name, email, message } = req.body;

  const mailOptions = {
    from: process.env.MAIL,
    to: process.env.MAIL, // Adresse e-mail de destination
    subject: `[PORTFOLIO] Nouveau message de ${name}`,
    text: `
      Nom: ${name} 
      Email: ${email}
      Message: ${message}
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error: "Une erreur s'est produite lors de l'envoi de l'e-mail.",
      });
    } else {
      console.log("E-mail envoyé:", info.response);
      res
        .status(200)
        .json({ success: true, message: "L'e-mail a été envoyé avec succès." });
    }
  });
});

module.exports = router;
