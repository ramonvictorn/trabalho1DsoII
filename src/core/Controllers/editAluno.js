const editAlunoModel = require('../Models/editAluno.js');
module.exports = editAluno;
function editAluno(req,res){
    if(!verifyParam(req)){
        res.status(400).send({error:"INVALID_PARAMS"})
    }

    let context ={
        id: req.params.id,
        nome: req.body.nome,
    }
    editAlunoModel(context,(dataRet)=>{
        if(dataRet.error){
            res.status(400).send({error:dataRet.error})
        }else{
            res.status(200).send({data:dataRet.data})
        }
    })
}

function verifyParam(params){
    if(params.params.id == undefined ) return false;
    if(params.body.nome == undefined) return false;
    return true;
}