const db = require("../../db.js");
module.exports = addDisciplina
function addDisciplina(context,cb){
    let queryInsert = `INSERT INTO disciplinas
            (nome) 
        VALUES 
            ('${context.nome}')
        RETURNING
            id_disciplina as "idDisciplina",    
            nome;`;

    db.query(queryInsert,null, (err,data)=>{
        if(err){
            cb({err:"ERROR_ON_ADD_DISCIPLINAS"})
        }else{
            cb({data:data.rows[0]})
        }
    })
}