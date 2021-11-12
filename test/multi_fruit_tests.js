let assert = require("assert");
let FruitBasket = require("../fruit-basket");
const pg = require("pg");
const Pool = pg.Pool;

const connectionString = process.env.DATABASE_URL || 'postgresql://codex:pg123@localhost:5432/fruit_basket_tests';

const pool = new Pool({
    connectionString
});

describe('The fruit_basket', function () {
    beforeEach(async function () {
        // clean the tables before each test run
        await pool.query('delete from fruit_basket_item');

    });
});