const editAlunoModel = require('../Models/editAluno.js');
module.exports = editAluno;
function editAluno(req,res){
    if(!verifyParam(req.body)){
        res.status(400).send({error:"INVALID_PARAMS"})
    }

    let context ={
        idAluno: req.body.idAluno,
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
    if(params.idAluno == undefined ) return false;
    if(params.nome == undefined) return false;
    return true;
}