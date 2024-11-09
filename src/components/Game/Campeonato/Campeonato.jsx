import styles from './campeonato.module.css';
import React, { useState, useEffect } from 'react';

function selectRandomTeam(teams) {
    const getRandomIndex = (max) => Math.floor(Math.random() * max);
    return teams[getRandomIndex(teams.length)];
}

export function Campeonato() {
    const [pontos, setPontos] = useState([]);
    const [teams, setTeams] = useState([]);
    const [selectedTeams, setSelectedTeams] = useState([]);
    const [winner, setWinner] = useState(null);

    const fetchTeams = () => {
        fetch('http://localhost:3002/api/teams')
            .then(response => response.json())
            .then(data => setTeams(data))
            .catch(error => console.error('Erro ao buscar os times:', error));
    };

    const fetchPoints = () => {
        fetch('http://localhost:3002/api/points')
            .then(response => response.json())
            .then(data => setPontos(data))
            .catch(error => console.error('Erro ao buscar os pontos:', error));
    };

    useEffect(() => {
        fetchTeams();
        fetchPoints();
    }, []);

    const handleSelectTeams = () => {
        if (winner && teams.length > 1) {
            const newChallenger = selectRandomTeam(teams.filter(team => team !== winner));
            setSelectedTeams([winner, newChallenger]);
        } else {
            const [team1, team2] = [selectRandomTeam(teams), selectRandomTeam(teams)];
            setSelectedTeams([team1, team2]);
        }
        setPontos([]);
    };

    const handleAddPoints = (event) => {
        event.preventDefault();
        const teamFaltas = document.querySelector("#exampleInputFaltas").value;

        const newPoints = {
            id: Date.now(),
            faltas: teamFaltas,
        };

        setPontos([...pontos, newPoints]);
        /*sendPointsToBackend(newPoints);*/

        event.target.reset();
    };

    const handleCalculateWinner = () => {
        if (selectedTeams.length === 2 && pontos.length === 2) {
            const [team1, team2] = selectedTeams;
            const faltas1 = parseInt(pontos[0].faltas || 0, 10) * 10;
            const faltas2 = parseInt(pontos[1].faltas || 0, 10) * 10;

            const total1 = 50 - faltas1;
            const total2 = 50 - faltas2;

            setSelectedTeams([{ ...team1, total: total1 }, { ...team2, total: total2 }]);

            const newWinner = total1 >= total2 ? team1 : team2;
            setWinner(newWinner);

            setTeams(teams.filter(team => team !== (total1 >= total2 ? team2 : team1)));
        }
    };

    return (
        <div className={styles.mainContainer}>
            <div className={styles.tableContainer}>
                <h1 className={styles.h1}>Campeonato Iniciado!</h1>
                <p className={styles.p}>Esta é a página do campeonato onde os times participarão.</p>
    
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

                    {winner && (
                <div className={styles.winnerContainer}>
                    <p>O time {winner.name} é o ganhador!</p>
                </div>
                )}
                
                <form role="form" id="form-user-create" onSubmit={handleAddPoints}>
                    <label htmlFor="exampleInputFaltas" className={styles.label}>Faltas</label>
                    <input type="text" id="exampleInputFaltas" name="teamfaltas" className={styles.input} />
                    <button type="submit" className={styles.button}>Adicionar</button>
                    <button type="button" className={styles.button} onClick={handleSelectTeams}>Sortear times</button>
                    <button type="button" className={styles.button} onClick={handleCalculateWinner}>Calcular Vencedor</button>
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
                            <td>50</td>
                            <td>{pontos[index]?.faltas || ''}</td>
                            <td>{team.total || ''}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>


        <div className={styles.footer}>
            <p>Desenvolvido por <a href="https://www.linkedin.com/in/lana-pulla-9b6845284/" target="_blank"> Lana Pulla</a></p>
        </div>
    </div>
);
        
}
