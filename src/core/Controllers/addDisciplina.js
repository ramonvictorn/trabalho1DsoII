const addDisciplinaModel = require('../Models/addDisciplina.js');
module.exports = addDisciplina
function addDisciplina(req,res){
    if(!(verifyParams(req.body))){
        res.status(400).send({error:'INVALID_PARAMS'})
        return;
    }
    let context = {
        nome: req.body.nome,
    }

    addDisciplinaModel(context,(dataRet)=>{
        if(dataRet.err){
           res.status(400).send({error:dataRet.err})
        }else{
            res.status(200).send({data:dataRet.data})
        }
    })
}
function verifyParams(params){
    if(params.nome == undefined || params.nome == null || params.nome.length < 1) return false;
    return true;
}