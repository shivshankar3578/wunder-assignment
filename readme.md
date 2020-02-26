## Classes

<dl>
<dt><a href="#Product">Product</a></dt>
<dd><p>Basic product</p>
</dd>
<dt><a href="#CartItem">CartItem</a></dt>
<dd><p>cart item extend product</p>
</dd>
<dt><a href="#Promo">Promo</a></dt>
<dd><p>Rule processor</p>
</dd>
<dt><a href="#Cart">Cart</a></dt>
<dd><p>Cart</p>
</dd>
<dt><a href="#CartDiscount">CartDiscount</a></dt>
<dd><p>Rule discount on cart sub total</p>
</dd>
<dt><a href="#ExclusiveDiscount">ExclusiveDiscount</a></dt>
<dd><p>discount per item</p>
</dd>
</dl>

<a name="Product"></a>

## Product
Basic product

**Kind**: global class  
<a name="new_Product_new"></a>

### new Product(id, name, price)
create a new product


| Param | Type |
| --- | --- |
| id | <code>Number</code> | 
| name | <code>String</code> | 
| price | <code>Number</code> | 

<a name="CartItem"></a>

## CartItem
cart item extend product

**Kind**: global class  
<a name="new_CartItem_new"></a>

### new CartItem(product, quantity)
create a new cart item


| Param | Type |
| --- | --- |
| product | [<code>Product</code>](#Product) | 
| quantity | <code>Number</code> | 

<a name="Promo"></a>

## Promo
Rule processor

**Kind**: global class  

* [Promo](#Promo)
    * [new Promo(...rules)](#new_Promo_new)
    * [.exclusiveDiscount(item)](#Promo+exclusiveDiscount) ⇒ <code>Number</code>
    * [.cartDiscount(subTotal)](#Promo+cartDiscount) ⇒ <code>Number</code>

<a name="new_Promo_new"></a>

### new Promo(...rules)
create new promo session


| Param | Type |
| --- | --- |
| ...rules | [<code>CartDiscount</code>](#CartDiscount) \| [<code>ExclusiveDiscount</code>](#ExclusiveDiscount) | 

<a name="Promo+exclusiveDiscount"></a>

### promo.exclusiveDiscount(item) ⇒ <code>Number</code>
apply exclusive rules for a item

**Kind**: instance method of [<code>Promo</code>](#Promo)  

| Param | Type |
| --- | --- |
| item | [<code>CartItem</code>](#CartItem) | 

<a name="Promo+cartDiscount"></a>

### promo.cartDiscount(subTotal) ⇒ <code>Number</code>
apply cart rules for a sub total

**Kind**: instance method of [<code>Promo</code>](#Promo)  

| Param | Type |
| --- | --- |
| subTotal | <code>Number</code> | 

<a name="Cart"></a>

## Cart
Cart

**Kind**: global class  

* [Cart](#Cart)
    * [new Cart(promo)](#new_Cart_new)
    * [.scan(product)](#Cart+scan) ⇒ <code>this</code>
    * [.subTotal()](#Cart+subTotal) ⇒ <code>number</code>
    * [.payable()](#Cart+payable) ⇒ <code>Number</code>

<a name="new_Cart_new"></a>

### new Cart(promo)
create a cart


| Param | Type |
| --- | --- |
| promo | [<code>Promo</code>](#Promo) | 

<a name="Cart+scan"></a>

### cart.scan(product) ⇒ <code>this</code>
scan item

**Kind**: instance method of [<code>Cart</code>](#Cart)  

| Param | Type |
| --- | --- |
| product | [<code>Product</code>](#Product) | 

<a name="Cart+subTotal"></a>

### cart.subTotal() ⇒ <code>number</code>
cart sub total before cart discount

**Kind**: instance method of [<code>Cart</code>](#Cart)  
<a name="Cart+payable"></a>

### cart.payable() ⇒ <code>Number</code>
apply cart discount

**Kind**: instance method of [<code>Cart</code>](#Cart)  
**Returns**: <code>Number</code> - - final payable amount  
<a name="CartDiscount"></a>

## CartDiscount
Rule discount on cart sub total

**Kind**: global class  

* [CartDiscount](#CartDiscount)
    * [new CartDiscount(min, max, discount, flat)](#new_CartDiscount_new)
    * [.discount(subTotal)](#CartDiscount+discount) ⇒ <code>Number</code>

<a name="new_CartDiscount_new"></a>

### new CartDiscount(min, max, discount, flat)
flat discount will be called at the end of all other discounts
in case of multiple flat discount higher severity flat discount will be applicable


| Param | Type | Description |
| --- | --- | --- |
| min | <code>Number</code> | min amount |
| max | <code>Number</code> | max amount |
| discount | <code>Number</code> | amount or fraction ration |
| flat | <code>Boolean</code> | enable discount as amount |

**Example**  
```
    |  Min |  Max  | discount | code                            |  comment |
    |------|-------|----------|---------------------------------|----------|
    | 10$  |  30$  |  10%     |  new CartDiscount(10, 30, 0.1); |          |
    | 30$  | 50$   |  20%     |  new CartDiscount(30, 50, 0.2); |          |
    | 50$  | any   |  8$      |  new CartDiscount(10, 20, 8, 1);|          | 
```
<a name="CartDiscount+discount"></a>

### cartDiscount.discount(subTotal) ⇒ <code>Number</code>
calculate discount on cart sub total

**Kind**: instance method of [<code>CartDiscount</code>](#CartDiscount)  
**Returns**: <code>Number</code> - - discount  

| Param | Type |
| --- | --- |
| subTotal | <code>Cart.total</code> | 

<a name="ExclusiveDiscount"></a>

## ExclusiveDiscount
discount per item

**Kind**: global class  

* [ExclusiveDiscount](#ExclusiveDiscount)
    * [new ExclusiveDiscount(pid, quantity, price)](#new_ExclusiveDiscount_new)
    * [.discount(item)](#ExclusiveDiscount+discount) ⇒ <code>Number</code>

<a name="new_ExclusiveDiscount_new"></a>

### new ExclusiveDiscount(pid, quantity, price)
discount applicable when ordering certain item quantity


| Param | Type |
| --- | --- |
| pid | <code>Number</code> | 
| quantity | <code>Number</code> | 
| price | <code>Number</code> | 

<a name="ExclusiveDiscount+discount"></a>

### exclusiveDiscount.discount(item) ⇒ <code>Number</code>
calculate discount per items

**Kind**: instance method of [<code>ExclusiveDiscount</code>](#ExclusiveDiscount)  
**Returns**: <code>Number</code> - - discount  

| Param | Type |
| --- | --- |
| item | [<code>CartItem</code>](#CartItem) | 

