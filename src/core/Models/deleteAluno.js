const db = require("../../db.js");
module.exports = deleteAluno;
function deleteAluno(context,cb){
    let queryValues = [];
    let queryDelete = `DELETE FROM alunos `;

    if(context.id){
        queryDelete += queryValues.length > 1 ? `AND` : ' WHERE';
        queryValues.push(context.id);
        queryDelete += ` id = $${queryValues.length}`;
    }
    queryDelete+= ` RETURNING id,nome `
    db.query(queryDelete,queryValues,(err,dataFromDb)=>{
        if(err){
            cb({error:'ERROR_ON_DELETE_ALUNO'})
        }else{
            cb({data:dataFromDb.rows[0]})
        }
    })
}