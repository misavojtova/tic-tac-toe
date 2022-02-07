create database tictac;
n
DROP TABLE IF EXISTS tictac;
use tictac;
CREATE TABLE tictac(
`id`INT primary key auto_increment ,
`box_id` varchar(50) ,
`input` varchar(50));
select * from tictac;


insert into tictac (`box_id`, `input`) values ( 'zero', '');
insert into tictac ( `box_id`, `input`) values ( 'one', '');
insert into tictac ( `box_id`, `input`) values ('two', '');
insert into tictac ( `box_id`, `input`) values ('three', '');
insert into tictac ( `box_id`, `input`) values ('four', '');
insert into tictac ( `box_id`, `input`) values ('five', '');
insert into tictac ( `box_id`, `input`) values ('six', '');
insert into tictac ( `box_id`, `input`) values ('seven', '');
insert into tictac (`box_id`, `input`) values ('eight', '');


