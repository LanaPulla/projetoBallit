import express from 'express';
import cors from 'cors';
import teamsRouter from './teams.js';  // Importa o router de times

const app = express();
const PORT = 3002;

app.use(cors());
app.use(express.json());

// Rota para lidar com os times
app.use('/api/teams', teamsRouter);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
