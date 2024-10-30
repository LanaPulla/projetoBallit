import express from 'express';
import cors from 'cors';
import teamsRouter from './teams.js';  // Corrija a importação para onde você definiu o router de times
import pointsRouter from './points.js';  // Corrija a importação para onde você definiu o router de pontos

const app = express();
const PORT = 3002;

app.use(cors());
app.use(express.json());

// Rota para lidar com os times
app.use('/api/teams', teamsRouter);
app.use('/api/points', pointsRouter);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});



