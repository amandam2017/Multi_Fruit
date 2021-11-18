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

        await pool.query('INSERT INTO multi_fruit_basket(basket_name) VALUES($1)', ['Punnet']);
        await pool.query('INSERT INTO multi_fruit_basket(basket_name) VALUES($1)', ['Breadfruit']);
        await pool.query('INSERT INTO multi_fruit_basket(basket_name) VALUES($1)', ['Citon']);

    });

    it('should get added fruits from  new fruit basket', async function () {

        let MultiFruitInstance = MultiFruitBasket(pool);

        await MultiFruitInstance.newBasket('Orange', 1, 4.50);

        console.log('list?'+ JSON.stringify(await MultiFruitInstance.getFruitsFromNewBasket()));

    
        assert.deepEqual( [ {
            price: '4.50',
            quantity: 1,
            type_of_fruit: 'Orange'
        }], await MultiFruitInstance.getFruitsFromNewBasket());
        });

    it('should update the quantity of fruit that already exist in the fruit basket', async function () {

        let MultiFruitInstance = MultiFruitBasket(pool);

        await MultiFruitInstance.newBasket('Mango', 6, 3.00);
        await MultiFruitInstance.addFruitsToExistingBasket('Mango', 10);

        assert.deepEqual( [ {
            price: '3.00',
            quantity: 16,
            type_of_fruit: 'Mango'
        }], await MultiFruitInstance.getFruitsFromNewBasket());

    });

    it('should remove added fruits from a fruit basket', async function () {

        let MultiFruitInstance = MultiFruitBasket(pool);

        await MultiFruitInstance.newBasket('Orange', 1, 4.50);
        // await MultiFruitInstance.removeFromExistingBasket('Orange', 0);

        assert.equal([{type_of_fruit: '', quantity: 0}], MultiFruitBasket.removeFromExistingBasket());

    
        // assert.deepEqual( [ {
        //     price: 0,
        //     quantity: 0,
        //     type_of_fruit: 0
        // }], await MultiFruitInstance.getFruitsFromNewBasket());
        });

    it('should update fruits in a new basket of fruit that already exist in the fruit basket', async function () {

        let MultiFruitInstance = MultiFruitBasket(pool);

        await MultiFruitInstance.newBasket('Peach', 6, 20.00);
        await MultiFruitInstance.addFruitsToExistingBasket('Mango', 10);

        assert.deepEqual( [ {type_of_fruit: 'Mango', quantity: 16, type_of_fruit: 'Mango', quantity: 16, price: 20.00}], await MultiFruitInstance.getFruitsFromNewBasket());

    });

    it('should display fruits that are in a basket named Punnet', async function () {

        let MultiFruitInstance = MultiFruitBasket(pool);

        await MultiFruitInstance.newBasket('Peach', 6, 20.00);
        await MultiFruitInstance.addFruitsToExistingBasket('Mango', 10);

        assert.deepEqual( [ {type_of_fruit: 'Mango', quantity: 16, type_of_fruit: 'Mango', quantity: 16, price: 20.00}], await MultiFruitInstance.getFruitsFromNewBasket());

    });
    
});