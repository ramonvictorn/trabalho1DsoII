const getMatriculasDisciplinaModel = require('../Models/getMatriculasDisciplina.js');

function getMatriculasDisciplina(req,res){
    if(!verifyParams(req)){
        res.status(400).send({error:'INVALID_PARAMS'})
        return;
    }
    let context = {
        idAluno: req.body.idAluno,
        idDisciplina:req.body.idDisciplina,
    }

    getMatriculasDisciplinaModel(context, (dataRet)=>{
        res.status(200).send({data:dataRet.data})
    })
}

function verifyParams(params){
    // if(params.body.nome == undefined && params.params.id == undefined) return false;
    return true;
}
module.exports = getMatriculasDisciplina;