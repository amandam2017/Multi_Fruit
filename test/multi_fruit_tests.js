let assert = require("assert");
let MultiFruitBasket = require("../multi-fruit");
const pg = require("pg");
const Pool = pg.Pool;

const connectionString = process.env.DATABASE_URL || 'postgresql://codex:pg123@localhost:5432/multi_fruit_tests';

const pool = new Pool({
    connectionString
});

describe('The multi_fruit_basket', function () {
    beforeEach(async function () {
        // clean the tables before each test run
        await pool.query('delete from fruit_basket_item');

        // await pool.query('INSERT INTO multi_fruit_basket(basket_name) VALUES($1)', ['Punnet']);
        // await pool.query('INSERT INTO multi_fruit_basket(basket_name) VALUES($1)', ['Breadfruit']);
        // await pool.query('INSERT INTO multi_fruit_basket(basket_name) VALUES($1)', ['Citron']);

    });

    it('should get added fruits from  new fruit basket', async function () {

        let MultiFruitInstance = MultiFruitBasket(pool);

        await MultiFruitInstance.newBasket('Cranberries', 1, 4.50, 'Punnet');


        // console.log('list?'+ JSON.stringify(await MultiFruitInstance.getFruitsFromNewBasket()));

    
        assert.deepEqual( [ {
            price: '4.50',
            quantity: 1,
            type_of_fruit: 'Cranberries'
        }], await MultiFruitInstance.getFruitsFromNewBasket());
    });


    it('should update the quantity of fruit that already exist in the fruit basket', async function () {

        let MultiFruitInstance = MultiFruitBasket(pool);

        await MultiFruitInstance.newBasket('grapefruit', 6, 3.00, 'Citron');
        await MultiFruitInstance.addFruitsToExistingBasket('grapefruit', 10);

        assert.deepEqual( [ {
            price: '3.00',
            quantity: 16,
            type_of_fruit: 'grapefruit'
        }], await MultiFruitInstance.getFruitsFromNewBasket());

    });

    it('should get total of a specific basket', async function(){
        let MultiFruitInstance = MultiFruitBasket(pool);

        await MultiFruitInstance.newBasket('Cranberries', 10, 2.00, 'Punnet');
        await MultiFruitInstance.newBasket('blood orange', 10, 2.00, 'Citron');
        var x = await MultiFruitInstance.getID('Punnet')
        assert.deepEqual( [ {
         
            sum:'20.00'
           
        }], await MultiFruitInstance.eachBasketTotalCost(x));


    })

    it('should remove added fruits from a fruit basket', async function () {

        let MultiFruitInstance = MultiFruitBasket(pool);

        await MultiFruitInstance.newBasket('Strawberries', 3, 4.50, 'Punnet');
        await MultiFruitInstance.removeFromExistingBasket('Strawberries');
        
        // console.log('is this removing?'+ await MultiFruitInstance.removeFromExistingBasket('Strawberries'));


        assert.deepEqual(
            [
                {
                price: "4.50",
                quantity: 2,
                type_of_fruit: "Strawberries"
                }
              ]
            , await MultiFruitInstance.getFruitsFromNewBasket());

    });

    it('should remove a basket if there are no fruits in a basket', async function () {

        let MultiFruitInstance = MultiFruitBasket(pool);

        await MultiFruitInstance.newBasket('Strawberries', 3, 4.50, 'Punnet');
        await MultiFruitInstance.removeFromExistingBasket('Strawberries');
        await MultiFruitInstance.removeFromExistingBasket('Strawberries');
        await MultiFruitInstance.removeFromExistingBasket('Strawberries');

        
        // console.log('is this removing?'+ await MultiFruitInstance.removeFromExistingBasket('Strawberries'));


        assert.deepEqual(null, await MultiFruitInstance.removeAnEmptyBasket().length);

    });

    it('should get the total cost of fruits in the basket', async function () {

        let MultiFruitInstance = MultiFruitBasket(pool);

        await MultiFruitInstance.newBasket('Cranberries', 10, 2.00, 'Punnet');
        await MultiFruitInstance.newBasket('blood orange', 10, 2.00, 'Citron');

       var x= await pool.query('SELECT * FROM fruit_basket_item')
    
        assert.deepEqual( [
            {
              basket_name: 'Punnet',
              multi_fruit_basket_id: 1,
              price: '2.00',
              quantity: 10,
              type_of_fruit: 'Cranberries'
            },
            {
              basket_name: 'Citron',
              multi_fruit_basket_id: 3,
              price: '2.00',
              quantity: 10,
              type_of_fruit: 'blood orange'
            }
          ]
          , await MultiFruitInstance.joinedTables());
    });
    
});