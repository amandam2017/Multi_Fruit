# Multiple fruits in a basket

The fruit basket business is booming. And customers now want fruit baskets with more than one fruit in it. 
Baskets now also needs a name to differentiate them from each other.

Create a new table called `fruit_basket_item` that contains:

* 1 type of fruit, 
* a quantity of fruit 
* and the unit price per fruit.

Create a new table called `multi_fruit_basket` it should have an `id` and a `name` column.

The `fruit_basket_item` table should have a `multi_fruit_basket_id` column that should be a foreign key to the `id` column in the `multi_fruit_basket` table.

Create a Factory Functions called `MultiFruitBasket` that should be able to:

* create a new fruit basket for a given fruit type, qty & fruit price,
<!-- below update the fruit basket quantity -->
* add fruits to an existing basket,
* remove fruits from an existing basket - if there are no fruit left in the basket the basket should be removed,
<!-- link for info https://dirask.com/posts/MS-SQL-Server-delete-row-where-column-is-null-10reop -->

if there are no fruit left in the basket the basket should be removed
<!-- DELETE FROM [table_name] WHERE [column_name] = NULL; -->


<!-- * for a given `id` return the basket_name & id as well as a list of all the fruits in the basket -->
* return the total cost of a specific basket:
	* based on basket name
	* and on the basket id

Create `tests` for your function and deploy your tests to Travis.

