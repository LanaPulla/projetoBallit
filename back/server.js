import express from 'express';
import cors from 'cors';
import teamsRouter from './teams.js';  // Como os arquivos estão todos no mesmo diretório, você importa diretamente

const app = express();
const PORT = 3002;

app.use(cors());
app.use(express.json());
app.use(cors());

app.use('/api/teams', teamsRouter);  // Rota para lidar com os times

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
