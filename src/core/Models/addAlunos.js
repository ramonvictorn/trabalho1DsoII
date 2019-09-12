module.exports = addAlunos;
const db = require("../../db.js");
function addAlunos(context,cb){
    let queryInsert = ``;
    let queryValues = [
        context.nome,
    ];
   
    let queryString = `INSERT INTO alunos 
        (nome) 
    VALUES 
        ($1)
    RETURNING 
        id,
        nome;`

    db.query(queryString, queryValues, (err,res)=>{   
        if(err){
            cb({error:'ERROR_ON_ADD_ALUNOS'})
            return true;
        }else{
            cb({data:res.rows[0]})
        }
        
    })
}
// addAlunos()