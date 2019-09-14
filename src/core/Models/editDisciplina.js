const db = require("../../db.js");

function editDisciplina(context,cb){
    let queryValues = [];
    let queryUpdate = `UPDATE disciplinas SET`;
    let queryWhere = ` WHERE id_disciplina = ${context.idDisciplina}`
    if(context.nome){
        queryValues.push(context.nome);
        queryUpdate+= queryValues.length > 0 
        ? ` nome = $${queryValues.length} ` 
        : `, nome = $${queryValues.length} `;
        // queryUpdate+= ` nome = ${queryValues.length}`
    }

    queryUpdate+= ` ${queryWhere} RETURNING
        id_disciplina as "idDisciplina",
        nome`;
    db.query(queryUpdate,queryValues,(err,dataDb)=>{
        if(err){
            cb({error: 'ERROR_ON_EDIT_DISCIPLINA'});
        }else{
            cb({data:dataDb.rows[0]})
        }
    })
}
module.exports = editDisciplina;