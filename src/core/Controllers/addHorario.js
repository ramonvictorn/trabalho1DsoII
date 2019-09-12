const addHorarioModel = require('../Models/addHorario.js');
module.exports = addHorario;
function addHorario(req,res){
    if(!(verifyParams(req.body))){
        res.status(400).send({error:'INVALID_PARAMS'})
        return;
    }
    let context = {
        idDisciplina: req.body.idDisciplina,
        horario: req.body.horario,
        diaDaSemana: req.body.diaDaSemana,
    }

    addHorarioModel(context,(dataRet)=>{
        if(dataRet.err){
           res.status(400).send({error:dataRet.err})
        }else{
            res.status(200).send({data:dataRet.data})
        }
    })
}

function verifyParams(params){
    if(isNaN(params.idDisciplina)) return false;
    if(params.horario == undefined) return false;
    if(isNaN(params.diaDaSemana) || params.diaDaSemana > 5) return false;
    return true;
}