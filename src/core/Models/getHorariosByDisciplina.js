const db = require("../../db.js");
module.exports = getHorariosByDisciplina;
function getHorariosByDisciplina(context,cb){
    let queryWhere = ``;
    let queryInsert = ``;
    let queryValues = [];

    let queryString = `SELECT 
            d.nome,
            h.horario,
            h.dia_da_semana as "diaDaSemana"
        FROM 
            disciplinas as d
            INNER JOIN horarios as h
            ON 
                d.id = h.id_disciplina
            AND 
                d.id = ${context.idDisciplina};`

    db.query(queryString, queryValues, (err,res)=>{   
        if(err){
            cb({error:'ERROR_ON_GET_HORARIO'})
            return true;
        }else{
            cb({data:res.rows.length == 1 ? res.rows[0] : res.rows})
        }
        
    })
}
// addAlunos()