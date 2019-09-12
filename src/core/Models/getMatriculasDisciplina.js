module.exports = getMatriculas;
const db = require("../../db.js");
function getMatriculas(context,cb){
    let queryWhere = ``;
    let queryInsert = ``;
    let queryValues = [];

    if(context.idAluno){
        queryWhere += queryValues.length >= 1 ? ' AND': ' WHERE '
        queryValues.push(context.idAluno);
        queryWhere += ` id_aluno = $${queryValues.length} `
    }
    if(context.idDisciplina){
        queryWhere += queryValues.length >= 1 ?  'AND': ' WHERE '
        queryValues.push(context.idDisciplina);
        queryWhere += ` id_disciplina = $${queryValues.length}`
    }

    let queryString = `SELECT * FROM matriculas ${queryWhere};`

    db.query(queryString, queryValues, (err,res)=>{   
        if(err){
            cb({error:'ERROR_ON_GET_MATRICULAS'})
            return true;
        }else{
            cb({data:res.rows.length == 1 ? res.rows[0] : res.rows})
        }
    })
}