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

    });

    it('should get fruits from  new fruit basket', async function () {

        let MultiFruitInstance = MultiFruitBasket(pool);

        await MultiFruitInstance.newBasket('Orange', 1, 4.50);

        // console.log('list?'+ JSON.stringify(await MultiFruitInstance.getFruitsFromBasketOne()))

    
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

    it('should update fruits in a new basket of fruit that already exist in the fruit basket', async function () {

        let MultiFruitInstance = MultiFruitBasket(pool);

        await MultiFruitInstance.newBasket('Apple', 6, 20.00);
        await MultiFruitInstance.addFruitsToExistingBasket('Mango', 10);

        assert.deepEqual( [ {type_of_fruit: 'Mango', quantity: 16, type_of_fruit: 'Mango', quantity: 16, price: 20.00}], await MultiFruitInstance.getFruitsFromNewBasket());

    });

    // it('should show the total price for a given fruit basket', async function () {

    //     let MultiFruitInstance = MultiFruitBasket(pool);

    //     await MultiFruitInstance.newBasket('Apple', 1, 3.00);

    //     assert.deepEqual( [ {price: 3.00}], await MultiFruitInstance.getPriceFromBasket('Apple'));

    // });

    // it('should show the total fruit for a given fruit basket', async function () {

    //     let MultiFruitInstance = MultiFruitBasket(pool);

    //     await MultiFruitInstance.newBasket('Kiwi', 1, 8.00);
    //     await MultiFruitInstance.addFruitsToExistingBasket('Kiwi', 10);
    
    //     assert.deepEqual( [ {"quantity": 11,}], await MultiFruitInstance.getTotalFruit('Kiwi'));

    // });
    
});