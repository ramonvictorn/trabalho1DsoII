const getHorariosByDisciplinaModel = require('../Models/getHorariosByDisciplina.js');
module.exports = getHorariosByDisciplina;
function getHorariosByDisciplina(req,res){
    if(!verifyParams(req)){
        res.status(400).send({error:'INVALID_PARAMS'})
        return;
    }
    let context = {
        idDisciplina: req.body.idDisciplina,
    }

    getHorariosByDisciplinaModel(context, (dataRet)=>{
        res.status(200).send({data:dataRet.data})
    })
}

function verifyParams(params){
    // if(params.body.nome == undefined && params.params.id == undefined) return false;
    return true;
}