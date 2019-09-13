const db = require('./db.js')
// alunos
const addAlunosController = require('./core/Controllers/addAlunos.js');
const getAlunoController = require('./core/Controllers/getAluno.js');
const editAlunoController = require('./core/Controllers/editAluno.js');
const deleteAlunosController = require('./core/Controllers/deleteAluno.js');


// disciplinas
const addDisciplinaController = require('./core/Controllers/addDisciplina.js');
const getDisciplinasController = require('./core/Controllers/getDiscplinas.js');
const deleteDisciplinaController = require('./core/Controllers/deleteDisciplina.js');
const editDisciplinaController = require('./core/Controllers/editDisciplina.js');
const getHorariosByDisciplinaController = require('./core/Controllers/getHorariosByDisciplina.js');

// horarios
const addHorariosController = require('./core/Controllers/addHorario.js');


// matriculas
const addMatriculasController = require('./core/Controllers/addMatricula.js');
const getMatriculasDisciplinaController = require("./core/Controllers/getMatriculasDisciplina.js");


//midlewares
const verificarSeMatriculaJaExiste = require("./core/Midlewares/verificarSeMatriculaExiste.js");
function initRoutes(app){
    app.post('/alunos2', (req,res)=>{
        db.query
        res.send(`daaaaa ${ db.query}`);
    })
    app.put('/alunos',editAlunoController);
    app.post('/alunos', addAlunosController);
    app.get('/alunos/:id*?', getAlunoController);
    app.delete('/alunos', deleteAlunosController);

    app.post('/disciplinas', addDisciplinaController);
    app.get('/disciplinas/:id?', getDisciplinasController);
    app.delete('/disciplinas/:id?', deleteDisciplinaController);
    app.put('/disciplinas/', editDisciplinaController);
    app.get('/disciplina/horarios', getHorariosByDisciplinaController);

    app.post('/horarios/',addHorariosController);
    
    app.post("/matriculas/", verificarSeMatriculaJaExiste, addMatriculasController);
    app.post('/matriculas/disciplina' , getMatriculasDisciplinaController)
}
module.exports = initRoutes;