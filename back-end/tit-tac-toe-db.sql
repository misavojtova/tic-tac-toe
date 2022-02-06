create database tictac;
use tictac;

DROP TABLE IF EXISTS tictac;
CREATE TABLE tictac(
`id`INT primary key auto_increment ,
`box_id` varchar(50) ,
`output` varchar(50));



insert into tictac (`box_id`, `output`) values ( 'zero', '');
insert into tictac ( `box_id`, `output`) values ( 'one', '');
insert into tictac ( `box_id`, `output`) values ('two', '');
insert into tictac ( `box_id`, `output`) values ('three', '');
insert into tictac ( `box_id`, `output`) values ('four', '');
insert into tictac ( `box_id`, `output`) values ('five', '');
insert into tictac ( `box_id`, `output`) values ('six', '');
insert into tictac ( `box_id`, `output`) values ('seven', '');
insert into tictac (`box_id`, `output`) values ('eight', '');


