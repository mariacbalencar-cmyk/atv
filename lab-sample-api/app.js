import express from "express";
import amostraRoutes from "./routes/amostraRoutes.js";

const app = express();

app.use(express.json());
app.use("/amostras", amostraRoutes);

const PORTA = 3001;

app.listen(PORTA, () => {
  console.log(`LabSample API executando na porta ${PORTA}`);
});
