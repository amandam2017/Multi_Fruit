create table multi_fruit_basket (
    id serial not null primary key,
    basket_name text not null
);

INSERT INTO multi_fruit_basket(basket_name) VALUES('Punnet');
INSERT INTO multi_fruit_basket(basket_name) VALUES('Breadfruit');
INSERT INTO multi_fruit_basket(basket_name) VALUES('Citron');


create table fruit_basket_item (
    id serial not null primary key,
    type_of_fruit text not null,
    quantity int,
    price decimal (10,2),
    multi_fruit_basket_id int not null,
    foreign key (multi_fruit_basket_id) references multi_fruit_basket(id)
);


-- DB name
-- sudo -u postgres createdb multi_fruit_tests;


SELECT basket_name, type_of_fruit, quantity, price FROM multi_fruit_basket m INNER JOIN fruit_basket_item f ON m.id = f.id;