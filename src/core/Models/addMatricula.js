const db = require("../../db.js");
const getHorariosModel = require('./getHorarios.js');
module.exports = addMatricula;
function addMatricula(context,cb){
    let queryInsert = `INSERT INTO matriculas (id_aluno, id_horario)
        VALUES ($1,$2)
        RETURNING
            id,
            id_aluno as "idAluno", 
            id_horario as "idHorario" ;`;
            
    let queryValues = [
        context.idAluno,
        context.idHorario,
    ]
    getHorariosModel(context,(dataRet)=>{
        console.log('DO getHorariosModel veio ->  ', dataRet);
        context.horarioPedido = dataRet.data.horario;
        verificarConflitosHorarios(context,(dataRet)=>{
            console.log("foi tudo, DEU CONFLITO ->", dataRet);
            if(dataRet.data == false){
                db.query(queryInsert,queryValues, (err,data)=>{
                    cb({data:data.rows});
                })
            }else{
                cb({data:"NÃO FOI POSSIVEL"});
            }
        });
    })
}


function verificarConflitosHorarios(context,cb){
    let arrayIds = [];
    let querySelect = `SELECT
        id_horario as "idHorario" 
    FROM matriculas WHERE id_aluno = ${context.idAluno};`
   
    db.query(querySelect,null, (err,data)=>{
        if(err){
            cb({err:"ERROR_ON_VERIFICAR_CONFLITOS_MATRICULA"})
        }else{
            data.rows.forEach(element => {
                arrayIds.push(element.idHorario)
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
        getHorariosModel({idHorario:context.arrayDeIds[posAtual]},(dataRet)=>{
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


// ver que horario enviado
//depois ve se tem conflito