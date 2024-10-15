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
    const [teams, setTeams] = useState([]); // Estado para armazenar os times
    const [selectedTeams, setSelectedTeams] = useState([]); // Estado para armazenar os times selecionados

    // Função para buscar os times do backend
    const fetchTeams = () => {
        fetch('http://localhost:3002/api/teams') // Altere para a URL correta do seu backend
            .then(response => response.json())
            .then(data => {
                setTeams(data); // Armazena os times no estado
            })
            .catch(error => {
                console.error('Erro ao buscar os times:', error);
            });
    };

    // Chama fetchTeams quando o componente é montado
    useEffect(() => {
        fetchTeams();
    }, []); // O array vazio faz com que o useEffect seja chamado apenas uma vez

    const handleSelectTeams = () => {
        try {
            const [team1, team2] = selectRandomTeams(teams);
            setSelectedTeams([team1, team2]); // Atualiza os times selecionados no estado
        } catch (error) {
            console.error(error.message); // Lida com o erro caso não haja times suficientes
        }
    };

    return (
        <div>
            <h1 className={styles.h1}>Campeonato Iniciado!</h1>
            <p className={styles.p}>Esta é a página do campeonato onde os times participarão.</p>
            
            <button className={styles.button} onClick={handleSelectTeams}>Começar</button>

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

                {selectedTeams.length > 0 && (
                    <div>
                        <h2>Times selecionados:</h2>
                        <p>Time 1: {selectedTeams[0].name}</p>
                        <p>Time 2: {selectedTeams[1].name}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
