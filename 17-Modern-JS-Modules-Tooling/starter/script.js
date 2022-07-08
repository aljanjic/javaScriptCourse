// import {
//   totalPrice as price,
//   tq,
//   shippingCost,
//   addToCart,
// } from './shoppingCart.js';

// console.log('Importing module');
// console.log(shippingCost);
// addToCart('Bread', 5);
// console.log(price, tq);

// import * as ShopingCart from './shoppingCart.js';
// ShopingCart.addToCart('bread', 5);

// import add, { cart } from './shoppingCart.js';

// add('milk', 14);
// add('bread', 5);
// add('apples', 4);

// console.log(cart);

// const res = await fetch('https://jsonplaceholder.typicode.com/posts');
// const data = await res.json();
// console.log(data);

const getLastPost = async function () {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await res.json();
  //   const { title, body } = data[data.length - 1];
  //   return { title: `${title}`, body: `${body}` };

  return { title: data.at(-1).title, body: data.at(-1).body };
};
const lastPost = getLastPost();

const lastPost2 = await getLastPost();
console.log(lastPost2);
