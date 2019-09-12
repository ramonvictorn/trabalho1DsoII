const db = require("../../db.js");
const getHorariosModel = require('./getHorarios.js');
module.exports = addMatricula;
function addMatricula(context,cb){
    let queryInsert = `INSERT INTO matriculas (id_disciplina,id_aluno, id_horarios)
        VALUES ($1,$2,Array[${context.idsHorarios}])
        RETURNING
            id_disciplina as "idDisciplina",
            id_aluno as "idAluno", 
            id_horarios as "idsHorarios" ;`;
            
    let queryValues = [
        context.idDisciplina,
        context.idAluno,
    ]
    getHorariosModel(context,(dataRet)=>{
        //console.log('DO getHorariosModel veio ->  ', dataRet);
        context.horarioPedido = dataRet.data.horario;
        verificarConflitosHorarios(context,(dataRet)=>{
            console.log("foi tudo, DEU CONFLITO ->", dataRet);
            if(dataRet.data == false){
                db.query(queryInsert,queryValues, (err,data)=>{
                    cb({data:data.rows});
                })
            }else{
                cb({data:"nao deu cara"});
            }
        });
    })
}


function verificarConflitosHorarios(context,cb){
    let arrayIds = [];
    let querySelect = `SELECT
        id_horarios as "idHorarios" 
    FROM matriculas WHERE id_aluno = ${context.idAluno};`
   
    db.query(querySelect,null, (err,data)=>{
        if(err){
            //cb({err:"ERROR_ON_VERIFICAR_CONFLITOS_MATRICULA"})
        }else{
            data.rows.forEach(element => {
                element.idHorarios.forEach(elementId => {
                    elementId.forEach(id => {
                        arrayIds.push(id)
                    });
                });
            });
            //console.log('antes do cb IDS HORARIO DESSE ALUNO -> ', arrayIds)
            context.arrayDeIds = arrayIds;
            PegarHorarioById(context,(deuConflito)=>{
                if(deuConflito == true){
                    cb({data:true})
                }else{
                    cb({data:false})
                }
            });
            //cb({data:'oi'});
        }
    })
}



function PegarHorarioById(context,cb){
    let posAtual = 0;
    loop();
    function loop(){
        getHorariosModel({idsHorarios:context.arrayDeIds[posAtual]},(dataRet)=>{
            posAtual++;
            console.log('getHorariosModel veio - > ',dataRet.data.horario);
            if(dataRet.data.horario == context.horarioPedido){
                console.log("DEU CONFILTO");
                cb(true);
                return;
            }
            if(posAtual < context.arrayDeIds.length){
                loop()
            }else{
                console.log('NÃO DEU CONFLITO')
                cb(false);
                return;
            }
        })
    }
}