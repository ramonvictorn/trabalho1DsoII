CREATE TABLE disciplina (
    id int SERIAL,
    nome varchar(250) NOT NULL,
    horarios... -- mínimo 1, máximo 4)
)
drop table alunos
select * FROM alunos where id = 1
CREATE TABLE alunos (
    id SERIAL,
    nome varchar(250)
)

CREATE TABLE matriculas (
    id int SERIAL,
    id_disciplina REFERENCES disciplina(id),
    id_aluno REFERENCES alunos(id)
)