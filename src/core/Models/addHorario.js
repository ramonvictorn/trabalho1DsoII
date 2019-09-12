const db = require("../../db.js");
module.exports = addHorario;
function addHorario(context,cb){
    let queryInsert = `INSERT INTO horarios (id_disciplina,horario, dia_da_semana)
        VALUES ($1,$2,$3)
        RETURNING
            id_disciplina as "idDisciplina",
            dia_da_semana as "diaDaSemana", 
            horario ;`;
            
    let queryValues = [
        context.idDisciplina,
        context.horario,
        context.diaDaSemana
    ]

    verificarHorarioDaSemana(context,(dataRet)=>{
        if(dataRet.data < 4){
            db.query(queryInsert,queryValues, (err,data)=>{
                if(err){
                    cb({err:"ERROR_ON_ADD_HORARIO"})
                }else{
                    cb({data:data.rows[0]})
                }
            })
        }else{
            cb({data:'ESSA_DISCIPLINA_JA_POSSUI_4_HORARIOS'})
        }
    })
}

function verificarHorarioDaSemana(context,cb){
    let querySelect = ` SELECT * FROM horarios WHERE id_disciplina = ${context.idDisciplina}`;

    db.query(querySelect,null, (err,data)=>{
        if(err){
            cb({err:"ERROR_ON_ADD_HORARIO"})
        }else{
            cb({data:data.rows.length})
        }
    })
}