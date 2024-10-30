import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.resolve(__dirname, 'points.json');

// Função para ler os pontos do arquivo
function readpointsFromFile() {
    if (!fs.existsSync(filePath)) {
        return [];
    }
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
}

// Função para salvar os pontos no arquivo
function writePointsToFile(points) {
    fs.writeFileSync(filePath, JSON.stringify(points, null, 2));
}

// Rota POST para adicionar novos pontos
router.post('/', (req, res) => {
    const { pontos, faltas } = req.body;
    const points = readpointsFromFile();

    const newPoints = { pontos, faltas };
    points.push(newPoints);

    writePointsToFile(points);
    res.status(201).json({ message: 'Pontos adicionados com sucesso!' });
});

// Rota DELETE para excluir pontos
router.delete('/:pontos', (req, res) => {
    const teamPontos = req.params.pontos;
    const points = readpointsFromFile();

    // Filtra os pontos, excluindo o ponto com o nome especificado
    const updatedPontos = points.filter(points => points.pontos !== teamPontos);

    // Salva as alterações no arquivo
    writePointsToFile(updatedPontos);
    res.status(200).json({ message: 'Time excluído com sucesso' });
});

// Rota GET para listar todos os pontos
router.get('/', (req, res) => {
    const points = readpointsFromFile();
    res.json(points);
});

export default router;
