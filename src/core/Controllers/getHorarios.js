const getHorariosModel = require('../Models/getHorarios.js');
module.exports = getHorarios;
function getHorarios(req,res){
    let context = {
        idHorario : req.body.idHorario,
        idDisciplina: req.body.idDisciplina,
    };
    getHorariosModel(context,(dataRet)=>{
        if(dataRet.error){
            res.status(400).send({error:dataRet.error})
        }else{
            res.status(200).send({data:dataRet.data})
        }
    })
}