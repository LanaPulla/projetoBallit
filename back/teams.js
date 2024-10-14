import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.resolve(__dirname, 'teams.json');

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

    // Verificação para evitar duplicados
    const existingTeam = teams.find(team => team.name === newTeam.name);
    if (existingTeam) {
        return res.status(400).json({ message: 'Time já existe' });
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

// Rota DELETE para excluir um time
router.delete('/:name', (req, res) => { // Mudança feita aqui
    const teamName = req.params.name; // Captura o nome do time da URL
    const teams = readTeamsFromFile();

    // Filtra os times, excluindo o time com o nome especificado
    const updatedTeams = teams.filter(team => team.name !== teamName);

    // Se não houver alterações, retorne um erro
    if (updatedTeams.length === teams.length) {
        return res.status(404).json({ message: 'Time não encontrado' });
    }

    // Salva as alterações no arquivo
    writeTeamsToFile(updatedTeams);
    res.status(200).json({ message: 'Time excluído com sucesso' });
});

export default router;



