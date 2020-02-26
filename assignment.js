/**
 * Basic product 
 */
class Product {
  /** create a new product
   * @param {Number} id 
   * @param {String} name 
   * @param {Number} price 
   */
  constructor(id, name, price) {
    this.id = id
    this.name = name
    this.price = price
  }
}

/**
 * cart item extend product
 */
class CartItem extends Product {
  /**
   * create a new cart item
   * @param {Product} product 
   * @param {Number} quantity 
   */
  constructor(product, quantity) {
    super(product.id, product.name, product.price)
    this.quantity = quantity
    this.amount = this.price
  }
}

/**
 * Rule processor
 */
class Promo {
  /**
   * create new promo session 
   * @param  {CartDiscount|ExclusiveDiscount} rules 
   */
  constructor(...rules) {
    this.cartRules = []
    this.exclusiveRules = []
    rules.forEach(rule => {
      if (rule instanceof CartDiscount) this.cartRules.push(rule)
      else this.exclusiveRules.push(rule)
    })
  }
  /**
   * apply exclusive rules for a item
   * @param {CartItem} item 
   * @returns {Number}
   */
  exclusiveDiscount(item) {
    let maxDiscount = 0
    this.exclusiveRules.forEach(rule => {
      if (rule.discount(item) > maxDiscount) {
        maxDiscount = rule.discount(item)
      }
    })
    return maxDiscount
  }

  /**
   * apply cart rules for a sub total
   * @param {Number} subTotal
   * @returns {Number}
   */
  cartDiscount(subTotal) {
    let maxDiscount = 0
    this.cartRules.forEach(rule => {
      if (rule.discount(subTotal) > maxDiscount) {
        maxDiscount = rule.discount(subTotal)
      }
    })
    return maxDiscount
  }
}

/**
 * Cart
 */
class Cart {
  /**
   * create a cart
   * @param {Promo} promo 
   */
  constructor(promo) {
    this.promo = promo
    this.items = {}
    this.total = 0
  }

  /**
   * scan item
   * @param {Product} product 
   * @returns {this}
   */
  scan(product) {
    let item = this.items[product.id]
    if (item) {
      item.quantity += 1
    } else {
      item = new CartItem(product, 1)
      this.items[item.id] = item
    }
    item.amount = item.price - this.promo.exclusiveDiscount(item)
    this.total = this.subTotal()
    return this
  }

  /**
   * cart sub total before cart discount
   * @returns {number}
   */
  subTotal() {
    return Object.values(this.items).reduce((acc, curr) => acc + curr.amount * curr.quantity, 0)
  }
  /**
   * apply cart discount
   * @returns {Number} - final payable amount
   */
  payable() {
    return this.total - this.promo.cartDiscount(this.total)
  }

}


/**
 * Rule discount on cart sub total
 */
class CartDiscount {

  /**
   * flat discount will be called at the end of all other discounts
   * in case of multiple flat discount higher severity flat discount will be applicable 
   * @param {Number} min - min amount
   * @param {Number} max - max amount
   * @param {Number} discount - amount or fraction ration 
   * @param {Boolean} flat - enable discount as amount
   * @example
    |  Min |  Max  | discount | code                            |  comment |
    |------|-------|----------|---------------------------------|----------|
    | 10$  |  30$  |  10%     |  new CartDiscount(10, 30, 0.1); |          |
    | 30$  | 50$   |  20%     |  new CartDiscount(30, 50, 0.2); |          |
    | 50$  | any   |  8$      |  new CartDiscount(10, 20, 8, 1);|          | 
   * 
   */
  constructor(min, max, off, flat) {
    this.min = min
    this.max = max
    this.off = off
    this.flat = flat
  }
  /**
   * calculate discount on cart sub total
   * @param {Cart.total} subTotal 
   * @returns {Number} - discount
   */
  discount(subTotal) {
    if (this.min < subTotal && subTotal <= this.max) {
      return this.flat ? this.off : subTotal * this.off
    }
    return 0
  }
}

/**
 * discount per item
 */
class ExclusiveDiscount {
  /**
   * discount applicable when ordering certain item quantity
   * @param {Number} pid 
   * @param {Number} quantity 
   * @param {Number} price 
   */
  constructor(pid, quantity, price) {
    this.pid = pid
    this.quantity = quantity
    this.price = price
  }

  /**
   * calculate discount per items 
   * @param {CartItem} item 
   * @returns {Number} - discount
   */
  discount(item) {
    if (item.id == this.pid && item.quantity >= this.quantity) {
      return (item.amount - this.price)
    }
    return 0
  }
}

module.exports = {
  CartDiscount,
  ExclusiveDiscount,
  Cart,
  Product,
  Promo
}