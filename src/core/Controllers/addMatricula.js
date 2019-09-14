const addMatriculaModel = require('../Models/addMatricula.js');
module.exports = addMatricula;
function addMatricula(req,res){
    if(!(verifyParams(req.body))){
        res.status(400).send({error:'INVALID_PARAMS'})
        return;
    }
    let context = {
        idDisciplina: req.body.idDisciplina,
        idAluno: req.body.idAluno,
        idHorario: req.body.idHorario,
    }

    addMatriculaModel(context,(dataRet)=>{
        if(dataRet.err){
           res.status(400).send({error:dataRet.err})
        }else{
            res.status(200).send({data:dataRet.data})
        }
    })
}

function verifyParams(params){
    //if(isNaN(params.idDisciplina)) return false;
    if(params.idAluno == undefined) return false;
    // if(typeof params.idHorario != "array") return false;
    return true;
}