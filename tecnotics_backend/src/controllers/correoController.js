import { config } from "dotenv";
import mailgun from "mailgun-js";

config();

const mailgunApiKey = process.env.MAILGUN_API_KEY;

const mg = mailgun({ apiKey: mailgunApiKey, domain: "tecnotics.co" });

export const enviarCorreo = (req, res) => {
  const { destinatario, asunto, mensaje } = req.body;

  console.log(req.body);

  const data = {
    from: "Tecnotics <desarrollo@tecnotics.com>",
    to: destinatario,
    subject: asunto,
    text: mensaje,
  };

  mg.messages().send(data, (error, body) => {
    if (error) {
      res.status(500).json({ message: "Error al enviar el correo." });
    } else {
      res.json({ message: "Correo enviado correctamente" });
    }
  });
};
