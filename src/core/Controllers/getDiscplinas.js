const getDisciplinasModel = require('../Models/getDisciplinas.js');

function getDisciplinas(req,res){
    if(!verifyParams(req)){
        res.status(400).send({error:'INVALID_PARAMS'})
        return;
    }
    let context = {
        nome: req.body.nome,
        id:req.params.id,
    }

    getDisciplinasModel(context, (dataRet)=>{
        res.status(200).send({data:dataRet.data})
    })
}

function verifyParams(params){
    // if(params.body.nome == undefined && params.params.id == undefined) return false;
    return true;
}
module.exports = getDisciplinas;