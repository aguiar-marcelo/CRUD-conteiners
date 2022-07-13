show databases;

create database db_conteiner;
use db_conteiner;

 create table conteiner (
 id int not null auto_increment,
 nome char(11) not null unique,
 cliente varchar(100) not null,
 tipo enum ('20','40') not null,
 `status` enum ('Cheio','Vazio') not null,
 categoria enum ('Importação','Exportação') not null,

 primary key(id)
 )default charset = utf8;
 
 create table movimentacao (
	id int not null auto_increment,
    id_conteiner int not null,
    tipo enum ('Embarque', 'Descarga', 'Gate-In','Gate-Out', 'Reposicionamento', 'Pesagem', 'Scanner'),
    inicio datetime,
    fim datetime,

primary key (id),
foreign key (id_conteiner) references conteiner(id)

on delete cascade
on update cascade
 )default charset = utf8;
 
 show tables;

 desc conteiner; 
 desc movimentacao;

select * from conteiner;
select * from movimentacao;

select * from movimentacao where id_conteiner = '4';

update conteiner set cliente='fff', tipo='40' where id='ABCD3333333';

INSERT INTO conteiner (nome, cliente, tipo, status, categoria) VALUES 
('ABCD1234565', 'ExemploCorp', '20', 'vazio', 'importacao');

INSERT INTO movimentacao (id_conteiner, tipo, inicio, fim) VALUES 
('4', 'Descarga', '2022-12-05 11:59:30', '2022-12-06 11:59:30');


DELETE FROM movimentacao where tipo = 'gate-out';

drop table movimentacao;

alter table conteiner
modify nome char(11) not null unique;