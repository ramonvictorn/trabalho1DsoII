const editDisciplinaModel = require('../Models/editDisciplina.js');
module.exports = editDisciplina;
function editDisciplina(req,res){
    if(!verifyParam(req.body)){
        res.status(400).send({error:"INVALID_PARAMS"})
    }

    let context ={
        id: req.body.id,
        nome: req.body.nome,
        horarios: req.body.horarios,
    }
    editDisciplinaModel(context,(dataRet)=>{
        if(dataRet.error){
            res.status(400).send({error:dataRet.error})
        }else{
            res.status(200).send({data:dataRet.data})
        }
    })
}

function verifyParam(params){
    if(params.id == undefined ) return false;
    if(params.nome == undefined && params.horarios == undefined) return false;
    return true;
}