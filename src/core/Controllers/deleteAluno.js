const deleteAlunoModel = require('../Models/deleteAluno.js');
module.exports = deleteAlunos;
function deleteAlunos(req,res){
    if(!verifyParams(req.body)){
        res.status(400).send({error:'INVALID_PARAMS'})
    }
    let context = {
        id : req.body.id,
    }
    deleteAlunoModel(context,(dataRet)=>{
        if(dataRet.error){
            res.status(400).send({error:dataRet.error})
        }else{
            res.status(200).send({data:dataRet.data})
        }
    })
}
function verifyParams(params){
    if(params.id == undefined) return false;
    return true;
}