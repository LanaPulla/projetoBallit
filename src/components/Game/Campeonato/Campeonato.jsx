import styles from './campeonato.module.css';
import React, { useState, useEffect } from 'react';

// Função para selecionar dois times aleatoriamente
function selectRandomTeams(teams) {
    if (teams.length < 2) {
        throw new Error("Não há times suficientes para selecionar.");
    }

    const getRandomIndex = (max) => Math.floor(Math.random() * max);

    let index1 = getRandomIndex(teams.length);
    let index2;
    do {
        index2 = getRandomIndex(teams.length);
    } while (index1 === index2);

    return [teams[index1], teams[index2]];
}

export function Campeonato() {
    const [pontos, setPontos] = useState([]);
    const [teams, setTeams] = useState([]);
    const [selectedTeams, setSelectedTeams] = useState([]);

    // Função para buscar os times do backend
    const fetchTeams = () => {
        fetch('http://localhost:3002/api/teams')
            .then(response => response.json())
            .then(data => setTeams(data))
            .catch(error => console.error('Erro ao buscar os times:', error));
    };

    // Função para buscar os pontos do backend
    const fetchPoints = () => {
        fetch('http://localhost:3002/api/points')
            .then(response => response.json())
            .then(data => setPontos(data)) // Atualiza o estado com os pontos salvos
            .catch(error => console.error('Erro ao buscar os pontos:', error));
    };

    // Chama fetchTeams e fetchPoints quando o componente é montado
    useEffect(() => {
        fetchTeams();
        fetchPoints();
    }, []);

    // Seleciona times aleatoriamente, limpa pontos e faltas, e atualiza o estado
    const handleSelectTeams = () => {
        try {
            const [team1, team2] = selectRandomTeams(teams);
            setSelectedTeams([team1, team2]);
            setPontos([]); // Limpa os pontos e faltas ao sortear novos times
        } catch (error) {
            console.error(error.message);
        }
    };

    // Função para enviar pontos e faltas ao backend
    const sendPointsToBackend = (teamPoints) => {
        fetch('http://localhost:3002/api/points', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(teamPoints),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Sucesso:', data);
            })
            .catch((error) => {
                console.error('Erro:', error);
            });
    };

    // Função ao clicar para adicionar pontos e faltas
    const handleAddPoints = (event) => {
        event.preventDefault();

        const teamPontos = document.querySelector("#exampleInputPontos").value;
        const teamFaltas = document.querySelector("#exampleInputFaltas").value;

        const newPoints = {
            pontos: teamPontos,
            faltas: teamFaltas,
        };

        // Atualiza o estado dos pontos
        setPontos([...pontos, newPoints]);

        // Envia os pontos recém-adicionados para o backend
        sendPointsToBackend(newPoints);

        // Limpa o formulário após o envio
        event.target.reset();
    };

    const handleDelete = (points) => {
        fetch(`http://localhost:3002/api/points/${points.pontos}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Falha ao excluir o time.');
            }
            return response.json();
        })
        .then(data => {
            console.log('Sucesso:', data);
            // Atualiza o estado dos pontos após a exclusão
            setPontos(pontos.filter(item => item.pontos !== points.pontos));
        })
        .catch((error) => {
            console.error('Erro:', error);
        });
    };


    return (
        <div>
            <h1 className={styles.h1}>Campeonato Iniciado!</h1>
            <p className={styles.p}>Esta é a página do campeonato onde os times participarão.</p>

            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Nome do Time</th>
                            <th>Grito de Guerra</th>
                            <th>Ano de Fundação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teams.map((team, index) => (
                            <tr key={index}>
                                <td>{team.name}</td>
                                <td>{team.chant}</td>
                                <td>{team.year}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <form role="form" id="form-user-create" onSubmit={handleAddPoints}>
                    <label htmlFor="teamSelect">Pontos</label>
                    <input type="text" id="exampleInputPontos" name="teampontos" />
                    <label htmlFor="exampleInputFaltas">Faltas</label>
                    <input type="text" id="exampleInputFaltas" name="teamfaltas" />
                    <button type="submit" className={styles.button}>Adicionar</button>
                    <button type="button" className={styles.button} onClick={handleSelectTeams}>Sortear times</button>
                </form>

                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Time</th>
                            <th>Pontos</th>
                            <th>Faltas</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {selectedTeams.map((team, index) => (
                            <tr key={index}>
                                <td>{team.name}</td>
                                <td>{pontos[index]?.pontos || ''}</td>
                                <td>{pontos[index]?.faltas || ''}</td>
                                <td></td>
                                <td>
                                    <button className={styles.button} onClick={() => handleDelete(pontos[index])}>Excluir</button>
                            </td>

                               
                            </tr>
                             
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
