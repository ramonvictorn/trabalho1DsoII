module.exports = getDisciplinas;
const db = require("../../db.js");
function getDisciplinas(context,cb){
    let queryWhere = ``;
    let queryInsert = ``;
    let queryValues = [];

    if(context.nome){
        queryWhere += queryValues.length >= 1 ? ' AND': ' WHERE '
        queryValues.push(context.nome);
        queryWhere += ` nome = $${queryValues.length} `
    }
    if(context.idDisciplina){
        queryWhere += queryValues.length >= 1 ?  'AND': ' WHERE '
        queryValues.push(context.idDisciplina);
        queryWhere += ` id_disciplina = $${queryValues.length}`
    }

    let queryString = `SELECT 
        id_disciplina as "idDisciplina",
        nome 
    FROM disciplinas ${queryWhere};`

    db.query(queryString, queryValues, (err,res)=>{   
        if(err){
            cb({error:'ERROR_ON_GET_DISCIPLINA'})
            return true;
        }else{
            cb({data:res.rows.length == 1 ? res.rows[0] : res.rows})
        }
        
    })
}
// addAlunos()