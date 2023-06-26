const express = require("express");
const nodemailer = require("nodemailer");

const router = express.Router();

// Configurer Nodemailer

const transporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com",
  secureConnection: true,
  port: 587,

  tls: {
    ciphers: "SSLv3",
  },
  auth: {
    user: process.env.MAIL, // Hotmail email
    pass: process.env.MAIL_PASS, // Hotmail password
  },
});

router.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  const mailOptions = {
    from: process.env.MAIL,
    to: process.env.MAIL,
    subject: `[PORTFOLIO] Nouveau message de ${name}`,
    text: `
      Nom: ${name}
      Email: ${email}
      Message: ${message}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("E-mail envoyé");
    res.status(200).json({
      success: true,
      message: "L'e-mail a été envoyé avec succès.",
    });
  } catch (error) {
    // verify connection configuration
    await transporter.verify();

    console.error(error);
    res.status(500).json({
      success: false,
      error: "Une erreur s'est produite lors de l'envoi de l'e-mail.",
    });
  }
});

module.exports = router;

// const express = require("express");
// const mailgun = require("mailgun-js");

// const router = express.Router();
// const mg = mailgun({
//   apiKey: "ba676f27cefc222805b26fd74e804359-135a8d32-24303809",
//   domain: "sandbox54b5291e7e82432184083ce2c31d7d81.mailgun.org",
// });

// router.post("/", (req, res) => {
//   const { name, email, message } = req.body;

//   const mailData = {
//     from: "mailgun@portfolio.fr",
//     to: "khenichil_youcef@hotmail.fr",
//     subject: `[PORTFOLIO] Nouveau message de ${name}`,
//     text: `
//       Nom: ${name}
//       Email: ${email}
//       Message: ${message}
//     `,
//   };

//   mg.messages().send(mailData, (error, body) => {
//     if (error) {
//       console.error(error);
//       res.status(500).json({
//         success: false,
//         error: "Une erreur s'est produite lors de l'envoi de l'e-mail.",
//       });
//     } else {
//       console.log("E-mail envoyé:", body);
//       res
//         .status(200)
//         .json({ success: true, message: "L'e-mail a été envoyé avec succès." });
//     }
//   });
// });

// module.exports = router;

// const express = require("express");
// const router = express.Router();

// const nodemailer = require("nodemailer");
// const nodemailerMailgun = require("nodemailer-mailgun-transport");

// const auth = {
//   auth: {
//     api_key: "ba676f27cefc222805b26fd74e804359-135a8d32-24303809",
//     domain: "sandbox54b5291e7e82432184083ce2c31d7d81.mailgun.org",
//   },
// };

// let transporter = nodemailer.createTransport(nodemailerMailgun(auth));

// router.post("/", (req, res) => {
//   const { name, email, message } = req.body;

//   const mailOption = {
//     from: "Excited User <mailgun@sandbox-123.mailgun.org>",
//     to: ["khenichil_youcef@hotmail.fr"],
//     subject: ` [PORTFOLIO] Nouveau message de ${name}`,
//     text: ` Nom: ${name}       Email: ${email}       Message: ${message}  `,
//     html: "<h1>Testing some Mailgun awesomeness!</h1>",
//   };

//   transporter.sendMail(mailOption, function (error, data) {
//     if (error) {
//       res.status(500).json({ message: "Erreur : " + error });
//     } else {
//       res.status(200).json({ message: "message envoyé !!" + data });
//     }
//   });
// });

// module.exports = router;
