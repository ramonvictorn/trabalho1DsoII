const db = require('../../db.js');
module.exports = deteleMatricula
function deteleMatricula(context,cb){
    let query = `DELETE from matriculas
        WHERE id_aluno = $1 AND id_horario = $2
        RETURNING 
        id,
        id_aluno as "idAluno",
        id_horario as "idHorario"`;
    let queryValues = [
        context.idAluno,
        context.idHorario,
    ];

    db.query(query,queryValues,(err,data)=>{
        if(err){
            cb({error:'ERRO_ON_DELETE_MATRICULA'})
        }else{
            cb({data:data.rows})
        }
    })
}