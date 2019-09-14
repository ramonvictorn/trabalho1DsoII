DROP SCHEMA public CASCADE;
CREATE SCHEMA public;

GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO public;

------------------------------------------
CREATE TABLE disciplinas (
    id_disciplina SERIAL PRIMARY KEY,
    nome varchar(250) NOT NULL
);

CREATE TABLE horarios (
	id_horario SERIAL primary key,
    id_disciplina integer not Null,
    horario TIME,
    dia_da_semana int,
    foreign key(id_disciplina) references disciplinas(id_disciplina)
);

CREATE TABLE alunos (
    id_aluno SERIAL PRIMARY KEY,
    nome varchar(250)
);

CREATE TABLE matriculas (
    id SERIAL PRIMARY KEY,
    id_disciplina integer,
    id_aluno integer,
    id_horario integer,
    foreign key(id_disciplina) references disciplinas(id_disciplina),
    foreign key(id_aluno) references alunos(id_aluno),
    foreign key(id_horario) references horarios(id_horario)
);


