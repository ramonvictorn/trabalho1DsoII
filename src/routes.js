const db = require('./db.js')
// alunos
const addAlunosController = require('./Controllers/addAlunos.js');
const getAlunoController = require('./Controllers/getAluno.js');
const editAlunoController = require('./Controllers/editAluno.js');
const deleteAlunosController = require('./Controllers/deleteAluno.js');
function initRoutes(app){
    app.post('/alunos2', (req,res)=>{
        db.query
        res.send(`daaaaa ${ db.query}`);
    })
    app.put('/alunos/:id',editAlunoController);
    app.post('/alunos', addAlunosController);
    app.get('/alunos/:id*?', getAlunoController)
    app.delete('/alunos', deleteAlunosController)
}
module.exports = initRoutes;