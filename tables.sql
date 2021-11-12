create table multi_fruit_basket (
    id serial not null primary key,
    name text not null
);

INSERT INTO multi_fruit_basket(name) VALUES('Punnet');
INSERT INTO multi_fruit_basket(name) VALUES('Breadfruit');
INSERT INTO multi_fruit_basket(name) VALUES('Citron');


create table fruit_basket_item (
    id serial not null primary key,
    type_of_fruit text not null,
    quantity int,
    price decimal (10,2),
    multi_fruit_basket_id int not null,
    foreign key(multi_fruit_basket_id) references multi_fruit_basket(id)
);

-- SELECT multi_fruit_basket.id, fruit_basket_item.type_of_fruit, multi_fruit_basket.name 
-- FROM multi_fruit_basket 
-- INNER JOIN fruit_basket_item ON fruit_basket_item.multi_fruit_basket_id = multi_fruit_basket.id;

SELECT multi_fruit_basket.id, Student.NAME, Student.AGE FROM Student
INNER JOIN StudentCourse
ON Student.ROLL_NO = StudentCourse.ROLL_NO;

-- DB name
-- sudo -u postgres createdb multi_fruit_tests;
