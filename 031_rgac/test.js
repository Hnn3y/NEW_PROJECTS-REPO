// test.js
import pkg from './package.json' with { type: 'json' };

console.log("All customers:", pkg.customers);

// Example: loop through each customer
pkg.customers.forEach(c => {
  console.log(`${c.name} - Last serviced on ${c.lastService}`);
});
