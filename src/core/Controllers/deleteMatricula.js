const deteleMatriculaModel  = require('../Models/deleteMatricula.js');
module.exports = deteleMatricula;
function deteleMatricula(req,res){
    if(!verifyParams(req.body)){
        res.status(400).send({error:'INVALID_PARAMS'});
        return;
    };

    let context = {
        idAluno : req.body.idAluno,
        idHorario: req.body.idHorario,
    }

    deteleMatriculaModel(context,(dataRet)=>{
        if(dataRet.error){
            res.status(400).send({error:dataRet.error})
        }else{
            res.status(200).send({data:dataRet.data})
        }
    })
}

function verifyParams(params){
    if( isNaN(params.idAluno)) return false;
    if( isNaN(params.idHorario)) return false;
    return true
}