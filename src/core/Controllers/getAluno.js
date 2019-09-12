const getAlunoModel = require('../Models/getAluno.js');

function getAluno(req,res){
    if(!verifyParams(req)){
        res.status(400).send({error:'INVALID_PARAMS'})
        return;
    }
    let context = {
        nome: req.body.nome,
        id:req.params.id,
    }

    getAlunoModel(context, (dataRet)=>{
        res.status(200).send({data:dataRet.data})
    })
}

function verifyParams(params){
    // if(params.body.nome == undefined && params.params.id == undefined) return false;
    return true;
}
module.exports = getAluno;