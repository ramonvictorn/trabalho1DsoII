const db = require("../../db.js");

function editDisciplina(context,cb){
    let queryValues = [];
    let queryUpdate = `UPDATE disciplinas SET`;
    let queryWhere = ` WHERE id = ${context.id}`
    if(context.nome){
        queryValues.push(context.nome);
        queryUpdate+= queryValues.length > 0 
        ? ` nome = $${queryValues.length} ` 
        : `, nome = $${queryValues.length} `;
        // queryUpdate+= ` nome = ${queryValues.length}`
    }

    if(context.horario){
        // queryValues.push(context.horario);
        // queryUpdate+= queryValues.length > 0 ? ` AND ` : ` WHERE `;
        // queryUpdate+= ` horario = ${queryValues.length}`
    }

    queryUpdate+= ` ${queryWhere} RETURNING
        id,
        nome,
        horarios`;
    db.query(queryUpdate,queryValues,(err,dataDb)=>{
        if(err){
            cb({error: 'ERROR_ON_EDIT_DISCIPLINA'});
        }else{
            cb({data:dataDb.rows[0]})
        }
    })
}
module.exports = editDisciplina;