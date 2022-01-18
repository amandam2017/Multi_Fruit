module.exports = function MultiFruitBasket(pool){
// * create a new fruit basket for a given fruit type, qty & fruit price,

const newBasket = async (fruitName, qty, price, basketName) => {

    const fruits = await pool.query('SELECT type_of_fruit FROM fruit_basket_item WHERE type_of_fruit = $1', [fruitName])
    var idee = await getID(basketName);
    //  console.log('which id????? ' +idee);
   if(fruits.rowCount === 0){
        const count = await pool.query('INSERT INTO fruit_basket_item (type_of_fruit, quantity, price, multi_fruit_basket_id) VALUES ($1, $2, $3, $4)', [fruitName, qty, price, idee]);
    }
}

// * add fruits to an existing basket--- here we will update to the existing number of fruits in a basket,
const addFruitsToExistingBasket = async (fruitName, quantity) => {
    var addOnExistingBskt = await pool.query('UPDATE fruit_basket_item SET quantity = quantity+$2 WHERE type_of_fruit = $1', [fruitName, quantity]);
}

const getFruitsFromNewBasket = async () => {
    let fruitsFromNewBasket = await pool.query('SELECT type_of_fruit, quantity, price FROM fruit_basket_item');
    return fruitsFromNewBasket.rows;
}

const getID = async (basketName) => {
    var multifruitbasketID = await pool.query('SELECT id FROM multi_fruit_basket WHERE basket_name = $1',[basketName]);
    console.log('which id? ' + multifruitbasketID.rows[0].id);
//I have used [0].id to get into an object
    return multifruitbasketID.rows[0].id;

}
// remove fruits from an existing basket
const removeFromExistingBasket = async (fruitType) => {   
    const removeBasket = await pool.query('UPDATE fruit_basket_item SET quantity = quantity-1 WHERE type_of_fruit = $1', [fruitType]);
}

const removeAnEmptyBasket = async (fruitType) => {
    //first I want to select from the basket if there is something
    const fruits = await pool.query('SELECT * FROM fruit_basket_item');

    if(fruitType.rowCount === 0){
        const removeBasket = await pool.query('DELETE FROM multi_fruit_basket');
    }
}

//get the fruits from a specific basket
const fruitsFromBasket = async (ID) => {
    let fruits = await pool.query('SELECT basket_name, type_of_fruit FROM fruit_basket_item WHERE multi_fruit_basket_id = $1');
    return fruits.rows;
}

// for a given `id` return the basket_name & id as well as a list of all the fruits in the basket
const returnPerBasket = async (basketName,basketID) => {
    await joinedTables();
    var  basketTotalCost = await pool.query('SELECT basket_name, id FROM fruit_basket_item');
    return basketTotalCost.rows;
}


// return the total cost of a specific basket
const eachBasketTotalCost = async (basketID) => {
    var  basketTotalCost = await pool.query('SELECT sum(price * quantity) FROM fruit_basket_item WHERE multi_fruit_basket_id = $1', [basketID]);
    return basketTotalCost.rows;
}

//join tables
const joinedTables = async () => {
    var joiningTables = await pool.query('SELECT basket_name, type_of_fruit, quantity, price, multi_fruit_basket_id FROM multi_fruit_basket m INNER JOIN fruit_basket_item f ON m.id = f.multi_fruit_basket_id');
  return joiningTables.rows;
}


return{
    newBasket,
    addFruitsToExistingBasket,
    getID,
    getFruitsFromNewBasket,
    removeFromExistingBasket,
    removeAnEmptyBasket,
    eachBasketTotalCost,
    fruitsFromBasket,
    joinedTables,
    returnPerBasket,
}

}