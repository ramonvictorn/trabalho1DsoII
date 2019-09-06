const addAlunosModel = require('../Models/addAlunos.js');

function addAlunos(req,res){
    if(!verifyParams(req.body)){
        res.status(400).send({error:'INVALID_PARAMS'})
        return;
    }
    let context = {
        nome: req.body.nome
    }

    addAlunosModel(context, (dataRet)=>{
        res.status(200).send({data:dataRet.data})
    })
}

function verifyParams(params){
    if(params.nome == undefined || params.nome.length == 0) return false;
    return true;
}
module.exports = addAlunos;