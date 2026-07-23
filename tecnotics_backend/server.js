import express from "express";
import morgan from "morgan";
import cors from "cors";
import { config } from "dotenv";
import correoRouter from "./src/routes/correo.js";

config();
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.get("/", (req, res) => {
  res.send("Servidor Express funcionando.");
});

app.use("/correo", correoRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor Express en ejecución en el puerto ${PORT}`);
});
