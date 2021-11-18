module.exports = function MultiFruitBasket(pool){
// * create a new fruit basket for a given fruit type, qty & fruit price,

const newBasket = async (fruitName, qty, price, basketName) => {

    const fruits = await pool.query('SELECT type_of_fruit FROM fruit_basket_item WHERE type_of_fruit = $1', [fruitName])
    var idee = await getID(basketName);
     console.log('which id????? ' +idee);
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
    var multifruitbasketID = await pool.query('SELECT id FROM multi_fruit_basket WHERE basket_name = $1',['Punnet']);
    // console.log('which id? ' + multifruitbasketID.rows[0].id);
//I have used [0].id to get into an object
    return multifruitbasketID.rows[0].id;

}

// remove fruits from an existing basket
const removeFromExistingBasket = async (fruitName, fruitNameID) => {
    const removeFromBasket = await pool.query('DELETE FROM Customers WHERE CustomerName= $2', [fruitNameID]);
}

return{
    newBasket,
    addFruitsToExistingBasket,
    getID,
    getFruitsFromNewBasket,
    removeFromExistingBasket,
}

}