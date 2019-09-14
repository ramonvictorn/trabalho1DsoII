module.exports = getHorarios;
const db = require("../../db.js");
function getHorarios(context,cb){
    let queryWhere = ``;
    let queryInsert = ``;
    let queryValues = [];

    let queryString = `SELECT 
        id_horario as "idHorario",
        id_disciplina as "idDisciplina",
        horario,
        dia_da_semana as "diaDaSemana"
        FROM horarios`
    
        if(context.idHorario){
            queryString += queryValues.length >= 1 ?  'AND': ' WHERE '
            queryValues.push(context.idHorario);
            queryString += ` id_horario = $${queryValues.length}`
        }
        if(context.idDisciplina){
            queryString += queryValues.length >= 1 ?  'AND': ' WHERE '
            queryValues.push(context.idDisciplina);
            queryString += ` id_disciplina = $${queryValues.length}`
        }

    db.query(queryString, queryValues, (err,res)=>{   
        if(err){
            cb({error:'ERROR_ON_GET_HORARIO'})
            return true;
        }else{
            cb({data:res.rows.length == 1 ? res.rows[0] : res.rows})
        }
        
    })
}