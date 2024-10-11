import React, { useState } from 'react';
import styles from './inicialize.module.css';
   
export function ClickSingUp(setShowForm){
    setShowForm(true);
    console.log("Cadastrar time");
}

export function ClickStart(){
        const line = document.querySelector("#tableClick");
        const lineCount = line.rows.length;

        if (lineCount < 8 && lineCount % 2 ==0){
            alert("São necessários no mínimo 8 times para iniciar");
        };
        
        if (lineCount > 16 ){
            alert("São necessários no máximo 16 times para iniciar");
        };
        if (lineCount % 2 !== 0){
            alert("A quantidade de times precisa ser par");

        }
}  



export function ClickAdmin(){

    console.log("Administrar Campeonato");

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

            const lineCount = tableBody.rows.length;

                if (lineCount < 16){
                const insertLine = tableBody.insertRow();
                const colum1 = insertLine.insertCell(0);
                const colum2 = insertLine.insertCell(1);
                const colum3 = insertLine.insertCell(2);

                colum1.textContent = teamName;
                colum2.textContent = teamChant;
                colum3.textContent = teamYear;
                } else {
                    alert("São necessários no máximo 16 times para iniciar")
                }
                form.reset();
            /*console.log("Número de linhas na tabela:", tableBody.rows.length);*/
    
            }

           function lineDelete() {
                const line = document.querySelector("#tableClick");
                const lineCount = line.rows.length;
                if (lineCount > 0){
                    line.deleteRow(lineCount - 1);
                }     
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
       
            <button className={styles.buttons} onClick={() => ClickStart()}>
                Iniciar Campeonato
             </button>
        

            <button className={styles.buttons}  onClick={ClickAdmin}>
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
                        <button type="submit" >Adicionar</button>
                        <button type="submit" id ="editButton" onClick={lineDelete}>Excluir</button>
                    </form>   
                    
                    <div className={styles.tableContainer}>
                    <table id="myTable" className={styles.table}>
                    <thead>
                        <tr>
                            <th >Nome do Time</th>
                            <th >Grito de Guerra</th>
                            <th >Ano de fundação</th>
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
