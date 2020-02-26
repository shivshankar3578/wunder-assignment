const assert = require("assert");
const { CartDiscount, ExclusiveDiscount, Cart, Product, Promo } = require("./assignment");

/**
 * some products
 */
const p1 = new Product(001, "Curry Sauce", 5)
const p2 = new Product(002, "Pizza", 10)
const p3 = new Product(003, "Men’s T-Shirt", 25)

/**
 * some Promos
 */
const f1 = new CartDiscount(10, 30, 0.1); // 10% off on 10 < cart subtotal =< 30
const f2 = new CartDiscount(30, 50, 0.2); // 20% off on 30 < cart subtotal =< 50
const f3 = new CartDiscount(50, Infinity, 10, 1); // flat 10$ off on cart subtotal > 50
const r1 = new ExclusiveDiscount(p3.id, 2, 20); // buy 2 get each in $20
const r2 = new ExclusiveDiscount(p2.id, 2, 5); //  buy 2 get each in $5

describe("wunder assignment", function () {

  it("case:1", function () {
    const co = new Cart(new Promo(f1, r1))
      .scan(p3)
      .scan(p1)
      .scan(p3)
      .scan(p2);
    /**
     * item price 25, 5, 25, 10
     * user price 20+5+20+10 
     * subtotal 55
     */
    assert.equal(co.payable(), 55);

  });



  it("case:2", function () {
    const co = new Cart(new Promo(f1, f2, f3, r1))
      .scan(p3)
      .scan(p1)
      .scan(p3)
      .scan(p2);
    /** 
     * item price 25, 5, 25, 10
     * user price 20+5+20+10 
     * NOTE flat 10 off
     * subtotal 55-10 = 45
     */
    assert.equal(co.payable(), 45);

  });

  it("case:3", function () {
    const co = new Cart(new Promo(f1, r1, f2, f3))
      .scan(p3)
      .scan(p1)
      .scan(p3)
      .scan(p2)
      .scan(p2);
    /** 
     * item price 25, 5, 25, 10, 10
     * user price 20+5+20+10+10 
     * NOTE flat 10 off
     * subtotal 65-10 = 55
     */
    assert.equal(co.payable(), 55);

  });


  it("case:4", function () {
    const co = new Cart(new Promo(f1, f2, f3, r1, r2))
      .scan(p3)
      .scan(p1)
      .scan(p2)
    /** 
     * item price 25, 5, 10
     * user price 25+5+10
     * subtotal 40-8 = 32
     */
    assert.equal(co.payable(), 32);

  });

  it("case:5 Not eligible", function () {
    const co = new Cart(new Promo(f1, r1))
      .scan(p1)
    assert.equal(co.payable(), 5);

  });


  it("case:6 No discount", function () {
    const co = new Cart(new Promo())
      .scan(p3)
      .scan(p2)
      .scan(p1)
    assert.equal(co.payable(), 40);

  });

});
