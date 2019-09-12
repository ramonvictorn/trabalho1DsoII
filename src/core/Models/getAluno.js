module.exports = getAluno;
const db = require("../../db.js");
function getAluno(context,cb){
    let queryWhere = ``;
    let queryInsert = ``;
    let queryValues = [];

    if(context.nome){
        queryWhere += queryValues.length >= 1 ? ' AND': ' WHERE '
        queryValues.push(context.nome);
        queryWhere += ` nome = $${queryValues.length} `
    }
    if(context.id){
        queryWhere += queryValues.length >= 1 ?  'AND': ' WHERE '
        queryValues.push(context.id);
        queryWhere += ` id = $${queryValues.length}`
    }

    let queryString = `SELECT * FROM alunos ${queryWhere};`

    db.query(queryString, queryValues, (err,res)=>{   
        if(err){
            cb({error:'ERROR_ON_GET_ALUNO'})
            return true;
        }else{
            cb({data:res.rows.length == 1 ? res.rows[0] : res.rows})
        }
        
    })
}
// addAlunos()