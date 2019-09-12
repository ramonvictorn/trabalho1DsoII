const deleteDisciplinaModel = require('../Models/deleteDisciplina.js');
module.exports = deleteDisciplina;
function deleteDisciplina(req,res){
    if(!verifyParams(req)){
        res.status(400).send({error:'INVALID_PARAMS'});
        return;
    }
    let context = {
        id : req.params.id,
    }
    deleteDisciplinaModel(context,(dataRet)=>{
        if(dataRet.error){
            res.status(400).send({error:dataRet.error})
            return;
        }else{
            res.status(200).send({data:dataRet.data})
            return;
        }
    })
}
function verifyParams(params){
    if(params.params.id == undefined) return false;
    return true;
}