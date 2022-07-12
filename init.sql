
create table if not exists account (
	user_id varchar(50) primary key,
	password varchar(60) not null,
	created timestamp not null
);


create table if not exists memo (
	id serial primary key,
	title varchar(50),
	content text,
	user_id varchar(50)
);


create table if not exists reply (
	reply_id serial primary key,
	memo_id int,
	comment varchar(100),
	user_id varchar(50)
);