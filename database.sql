CREATE TABLE disciplinas (
    id SERIAL PRIMARY KEY,
    nome varchar(250) NOT NULL
);

CREATE TABLE horarios (
	id_horario SERIAL primary key,
    id_disciplina integer not Null,
    horario TIME,
    dia_da_semana int,
    foreign key(id_disciplina) references disciplinas(id)
);

CREATE TABLE alunos (
    id SERIAL PRIMARY KEY,
    nome varchar(250)
);

CREATE TABLE matriculas (
    id SERIAL PRIMARY KEY,
    id_disciplina integer,
    id_aluno integer,
    id_horarios int[],
    foreign key(id_disciplina) references disciplinas(id),
    foreign key(id_aluno) references alunos(id)
);