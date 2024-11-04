import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.resolve(__dirname, 'points.json');

// Função para ler os pontos do arquivo
function readPointsFromFile() {
    if (!fs.existsSync(filePath)) {
        return [];
    }
    try {
        const data = fs.readFileSync(filePath);
        const points = JSON.parse(data);
        return points.filter(point => point.faltas); // Filtra entradas vazias
    } catch (error) {
        console.error("Erro ao ler o arquivo JSON:", error);
        return [];
    }
}

// Função para salvar os pontos no arquivo
function writePointsToFile(points) {
    fs.writeFileSync(filePath, JSON.stringify(points, null, 2));
}

router.post('/', (req, res) => {
    try {
        const { faltas } = req.body;

        // Verifica se faltas está presente
        if (!faltas) {
            return res.status(400).json({ message: 'Faltas não podem ser vazias.' });
        }

        const points = readPointsFromFile();

        // Cria um novo ponto com um ID único
        const newPoints = { id: Date.now(), faltas }; 
        points.push(newPoints);
        
        // Salva os pontos atualizados no arquivo
        writePointsToFile(points);

        res.status(201).json({ message: 'Pontos adicionados com sucesso!', point: newPoints });
    } catch (error) {
        console.error("Erro ao adicionar pontos:", error);
        res.status(500).json({ message: 'Erro ao adicionar pontos' });
    }
});

router.delete('/:id', (req, res) => {
    try {
        const pointId = Number(req.params.id); // Converte o ID para número
        console.log(`Tentando excluir ponto com ID: ${pointId}`);
        const points = readPointsFromFile();

        // Verifica se o ponto existe antes de tentar excluir
        const pointExists = points.some(point => point.id === pointId);
        if (!pointExists) {
            return res.status(404).json({ message: 'Ponto não encontrado.' });
        }

        const updatedPoints = points.filter(point => point.id !== pointId);
        writePointsToFile(updatedPoints);

        res.status(200).json({ message: 'Ponto excluído com sucesso' });
    } catch (error) {
        console.error('Erro ao excluir ponto:', error);
        res.status(500).json({ message: 'Erro ao excluir ponto' });
    }
});



router.get('/', (req, res) => {
    const points = readPointsFromFile();
    res.json(points);
});

export default router;
