import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url'; // Importar para definir __filename e __dirname

const router = express.Router();
const __filename = fileURLToPath(import.meta.url); // Define __filename
const __dirname = path.dirname(__filename); // Define __dirname
const filePath = path.resolve(__dirname, 'teams.json'); // Ajuste para o arquivo JSON

// Função para ler os times do arquivo
function readTeamsFromFile() {
    if (!fs.existsSync(filePath)) {
        return [];
    }
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
}

// Função para salvar os times no arquivo
function writeTeamsToFile(teams) {
    fs.writeFileSync(filePath, JSON.stringify(teams, null, 2));
}

// Rota POST para adicionar um novo time
router.post('/', (req, res) => {
    const newTeam = req.body;
    const teams = readTeamsFromFile();

    // Verificação de duplicidade
    const isDuplicate = teams.some(team => team.name === newTeam.name); // Verifica se o nome do time já existe
    if (isDuplicate) {
        return res.status(409).json({ message: 'Time já existe!' }); // Retorna erro 409 se o time já existir
    }

    teams.push(newTeam);
    writeTeamsToFile(teams);

    res.status(201).json({ message: 'Time adicionado com sucesso!' });
});

// Rota GET para listar todos os times
router.get('/', (req, res) => {
    const teams = readTeamsFromFile();
    res.json(teams);
});

export default router;

