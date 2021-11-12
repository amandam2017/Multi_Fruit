module.exports = function MultiFruitBasket(pool){
// * create a new fruit basket for a given fruit type, qty & fruit price,

const PunnetBasket = async (name,qty,price) => {

    const count = await pool.qquery('INSERT INTO fruit_basket_item (type_of_fruit, quantity, price) VALUES ($1, $2, $3)', [name, qty, price]);
}

// * add fruits to an existing basket,
const addFruitsToExistingBasket = async (name) => {
    var addOnExistingBskt = await pool.query('SELECT type_of_fruit from fruit_basket_item WHERE type_of_fruit = $1', [name]);

}
    


    return{
        PunnetBasket,
        addFruitsToExistingBasket,

    }

}