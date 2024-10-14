import React, { useState, useEffect } from 'react';
import styles from './inicialize.module.css';

export function ClickSingUp(setShowForm) {
    setShowForm(true);
    console.log("Cadastrar time");
}

export function ClickStart() {
    const line = document.querySelector("#tableClick");
    const lineCount = line.rows.length;

    if (lineCount < 8 && lineCount % 2 === 0) {
        alert("São necessários no mínimo 8 times para iniciar");
    }

    if (lineCount > 16) {
        alert("São necessários no máximo 16 times para iniciar");
    }

    if (lineCount % 2 !== 0) {
        alert("A quantidade de times precisa ser par");
    }
}

export function ClickAdmin() {
    console.log("Administrar Campeonato");
}

export function Inicialize() {
    const [showForm, setShowForm] = useState(false);
    const [teams, setTeams] = useState([]); // Guarda os times em um array de objetos

    // Função para buscar os times do backend
    const fetchTeams = () => {
        fetch('http://localhost:3002/api/teams')
            .then(response => response.json())
            .then(data => {
                setTeams(data); // Atualiza o estado com os times do backend
            })
            .catch((error) => {
                console.error('Error fetching teams:', error);
            });
    };

    // Chama a função fetchTeams ao montar o componente
    useEffect(() => {
        fetchTeams();
    }, []); // O array vazio garante que a função só seja chamada uma vez

    const formClick = (event) => {
        event.preventDefault();

        const teamName = document.querySelector("#exampleInputTeam").value;
        const teamChant = document.querySelector("#exampleInputTeamChant").value;
        const teamYear = document.querySelector("#exampleInputYear").value;

        // Verificação de duplicidade
        const isDuplicate = teams.some(team => team.name === teamName);
        if (isDuplicate) {
            alert("Time já existe!"); // Exibe mensagem de erro
            return; // Impede a adição do time
        }

        if (teams.length < 16) {
            const newTeam = {
                name: teamName,
                chant: teamChant,
                year: teamYear
            };

            // Atualiza o estado dos times
            setTeams([...teams, newTeam]);

            // Envia o time recém-adicionado para o backend
            sendTeamToBackend(newTeam);
            console.log(newTeam);
        } else {
            alert("São necessários no máximo 16 times para iniciar");
        }
        event.target.reset();
    };

    const sendTeamToBackend = (team) => {
        fetch('http://localhost:3002/api/teams', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(team), // Envia apenas o time recém-adicionado
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    function lineDelete() {
        const lineCount = teams.length;
        if (lineCount > 0) {
            // Remove o último time do array de times
            const updatedTeams = teams.slice(0, -1);
            setTeams(updatedTeams);
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.box}>
                <h1 className={styles.inicialize}>Bem-vindo! Escolha uma das opções</h1>
            </div>

            <button className={styles.buttons} onClick={() => ClickSingUp(setShowForm)}>
                Cadastrar time
            </button>

            <button className={styles.buttons} onClick={() => ClickStart()}>
                Iniciar Campeonato
            </button>

            <button className={styles.buttons} onClick={ClickAdmin}>
                Administrar Campeonato
            </button>

            {showForm && (
                <div className={styles.singUp}>
                    <form role="form" id="form-user-create" onSubmit={formClick}>
                        <label htmlFor="exampleInputTeam">Nome do Time</label>
                        <input type="text" required id="exampleInputTeam" name="team" />
                        <label htmlFor="exampleInputTeamChant">Grito de Guerra</label>
                        <input type="text" required id="exampleInputTeamChant" name="teamchant" />
                        <label htmlFor="exampleInputYear">Ano de fundação</label>
                        <input type="text" required id="exampleInputYear" name="year" />
                        <button type="submit">Adicionar</button>
                        <button type="button" onClick={lineDelete}>Excluir</button>
                    </form>

                    <div className={styles.tableContainer}>
                        <table id="myTable" className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Nome do Time</th>
                                    <th>Grito de Guerra</th>
                                    <th>Ano de fundação</th>
                                </tr>
                            </thead>
                            <tbody id="tableClick">
                                {teams.map((team, index) => (
                                    <tr key={index}>
                                        <td>{team.name}</td>
                                        <td>{team.chant}</td>
                                        <td>{team.year}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}

