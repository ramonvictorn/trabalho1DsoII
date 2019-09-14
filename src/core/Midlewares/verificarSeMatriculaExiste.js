const db = require('../../db.js');
module.exports = verificarSeMatriculaExiste;
function verificarSeMatriculaExiste(req,res,next){
    let querySelect = `SELECT * FROM matriculas
        WHERE id_aluno = ${req.body.idAluno} AND id_horario = ${req.body.idHorario}`;

    db.query(querySelect,null, (err,data)=>{
        if(err){
            next();
        }else{
            if(data.rows.length > 0){
                res.send({data:'VOCE JA POSSUI MATRICULA NESTA DISCIPLINA.'})
            }else{
                next();
            }
        }
    })
}