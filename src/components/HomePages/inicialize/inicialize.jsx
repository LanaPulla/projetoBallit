import React, { useState } from 'react';
import styles from './inicialize.module.css'; 
   
export function ClickSingUp(setShowForm){
    setShowForm(true);
    console.log("Cadastrar time");
}

export function ClickStart(){

    console.log("Iniciar Campeonato");

}

export function ClickAdmin(){

    console.log("Administrar Campeonato");


}

export function rowsCount(tableBody, event){
    event.preventDefault()
    const lineCount = tableBody.rows.length;
    const click = () =>{
        if ( lineCount < 8 ) {
            console.log("nao pode");
        }; if (lineCount > 16) {
            const myTable= document.getElementById("#myTable");
            myTable.deleteRow(lineCount - 1)
            console.log("NAO")
        }
    }

    click();
}

export function Inicialize(){
    const [showForm, setShowForm] = useState(false);

        const formClick = (event) =>{
            event.preventDefault();

            const form = document.querySelector("#form-user-create");

            const teamName = document.querySelector("#exampleInputTeam").value;
            const teamChant = document.querySelector("#exampleInputTeamChant").value;
            const teamYear = document.querySelector("#exampleInputYear").value;
            
            const tableBody = document.querySelector("#tableClick");

            const insertLine = tableBody.insertRow();
            const colum1 = insertLine.insertCell(0);
            const colum2 = insertLine.insertCell(1);
            const colum3 = insertLine.insertCell(2);

            colum1.textContent = teamName;
            colum2.textContent = teamChant;
            colum3.textContent = teamYear;

            form.reset();
            console.log("Número de linhas na tabela:", tableBody.rows.length);
            rowsCount(tableBody);
        };

        

    return (
        <div className={styles.container}>
            
            <div className={styles.box}>
            <h1 className={styles.inicialize}> 
                Bem-vindo! Escolha uma das opções
            </h1> 
            </div>
            
            <button className={styles.buttons} onClick={() => ClickSingUp(setShowForm)}>
                Cadastrar time
             </button>
       
            <button className={styles.buttons} onClick={ClickStart}>
                Iniciar Campeonato
             </button>
        

            <button className={styles.buttons}  onClick={ClickAdmin}>
                Administrar Campeonato
             </button>

             {showForm && (
                <div className={styles.singUp}>
                   <form role="form" id="form-user-create" onSubmit={formClick}>
                        <label htmlFor="exampleInputTeam">Nome do Time</label>
                        <input type="text" id="exampleInputTeam" name="team" />
                        <label htmlFor="exampleInputTeamChant">Grito de Guerra</label>
                        <input type="text" id="exampleInputTeamChant" name="teamchant" />
                        <label htmlFor="exampleInputYear">Ano de fundação</label>
                        <input type="text" id="exampleInputYear" name="year" />
                        <button type="submit" id ="myButton">Enviar</button>
                    </form>   
                    
                    <div className={styles.tableContainer}>
                    <table id="myTable" className={styles.table}>
                    <thead>
                        <tr>
                            <th className={styles.tab}>Nome do Time</th>
                            <th className={styles.tab}>Grito de Guerra</th>
                            <th className={styles.tab}>Ano de fundação</th>
                        </tr>
                    </thead>
                    <tbody id="tableClick">
                    
                    </tbody>
                </table>   
                </div>
            </div>
    )}

            
        </div>
    
        
        
    )

}
