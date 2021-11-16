module.exports = function MultiFruitBasket(pool){
// * create a new fruit basket for a given fruit type, qty & fruit price,

const newBasket = async (fruitName, qty, price, basketName) => {

    const fruits = await pool.query('SELECT type_of_fruit, basket_name FROM fruit_basket_item WHERE type_of_fruit = $1', [fruitName])
    var idee = await getID(basketName);
    console.log('which id? ' +idee);
    if(fruits.rowCount === 0){
        const count = await pool.query('INSERT INTO fruit_basket_item (type_of_fruit, quantity, price, id) VALUES ($1, $2, $3, $4)', [fruitName, qty, price, idee]);
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

const getID = async (multibasket_id) => {
    var multifruitbasketID = await pool.query('SELECT id FROM multi_fruit_basket WHERE name = $1',[multibasket_id]);
    return multifruitbasketID.rows[0].id;

}

const getTotalFruit = async () => {
    var allFruitsInNewBasket = await pool.query('SELECT type_of_fruit, quantity, price FROM fruit_basket_item')
    return allFruitsInNewBasket.rows;
}
    


    return{
        newBasket,
        addFruitsToExistingBasket,
        getTotalFruit,
        getID,
        getFruitsFromNewBasket,
    }

}