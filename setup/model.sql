create database olcha;

create extension pgcrypto;

create table categories(
    category_id serial primary key not null,
    category_name character varying(50) not null
);

insert into categories(category_name) values
('maishiy texnika'),
('kompyuterla'),
('telefonla');

create table products(
    product_id serial primary key not null,
    category_id int references categories(category_id),
    product_name character varying(50),
    product_price decimal(10,2),
    product_short_desc character varying(200),
    product_long_desc text,
    picture character varying(50) not null
);

insert into products(category_id,product_name,product_price,product_short_desc,product_long_desc,picture)values
(1,'holodilnik',500000,'bu zor holodilnik','bu artelda ishlab chiqarilgan econom holodilnik','/images/holodilnik.jpg'),
(1,'gaz plitasi',500000,'bu zor gaz plitasi','bu artelda ishlab chiqarilgan econom gaz plitasi','/images/holodilnik.jpg'),
(1,'dimohod',500000,'bu zor dimohod','bu artelda ishlab chiqarilgan econom dimohod','/images/dimohod.jpg'),
(3,'Redmi Poco x3',2500000,'bu zor telefon','bu artelda ishlab chiqarilgan econom telefon','/images/redmi.jpg'),
(2,'HP',3000000,'bu zor noutbook','bu amerikada ishlab chiqarilgan econom noutbook','/images/hp.jpg'),
(2,'asus nitro',500000,'bu zor noutbook','bu artelda ishlab chiqarilgan game noutbook','/images/nitro.jpg');


create table users(
    user_id serial primary key not null,
    user_name varchar(20),
    password char(250) not null,
    user_contact varchar(12) not null,
    email character varying(100) not null check (email ~* '^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$'),
    role boolean default false
);

insert into users(user_name,password,user_contact,email,role) values
('Samandar',crypt('0415',gen_salt('bf')),'998998181818','samandar@gmail.com',false),
('admin',crypt('admin',gen_salt('bf')),'998998181818','admin@gmail.com',true),
('Abdujabbor',crypt('2409',gen_salt('bf')),'998998181818','Abdujabbor@gmail.com',false),
('li',crypt('0415',gen_salt('bf')),'998998181818','lisdas@gmail.com',false),
('hotam',crypt('0415',gen_salt('bf')),'998998181818','haaaaa@gmail.com',false);

create table orders(
    order_id serial primary key not null,
    user_id int references users(user_id),
    product_id int[],
    total_price decimal(10,2),
    is_paid boolean default false
);

insert into orders(user_id,product_id,total_price,is_paid)values
(1,Array[1,3],3000000,true),
(3,Array[1,3],3000000,false),
(4,Array[1,3],3000000,false);

create table statistic(
    total_money_in_a_month varchar(12),
    total_money_in_a_month_unpaid varchar(12),
    the_most_sold_products varchar(12),
    the_least_sold_products varchar(12)
);

