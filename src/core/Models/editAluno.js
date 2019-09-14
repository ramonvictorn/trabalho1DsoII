const db = require("../../db.js");

function editAluno(context,cb){
    let queryValues = [context.nome, context.idAluno];
    let queryUpdate = `UPDATE alunos
        SET nome = $1 
        WHERE id_aluno = $2 
        RETURNING 
        id_aluno as "idAluno",
        nome`;

    db.query(queryUpdate,queryValues,(err,dataDb)=>{
        if(err){
            cb({error: 'ERROR_ON_EDIT_ALUNO'});
        }else{
            cb({data:dataDb.rows[0]})
        }
    })
}
module.exports = editAluno;