module.exports = getHorarios;
const db = require("../../db.js");
function getHorarios(context,cb){
    let queryWhere = ``;
    let queryInsert = ``;
    let queryValues = [];

    let queryString = `SELECT * FROM horarios WHERE id_horario = ${context.idsHorarios};`

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