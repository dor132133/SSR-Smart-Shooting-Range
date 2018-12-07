


var Warrior = require('./classes/Warrior');


var w1 = new Warrior('Dor','BY', 26, 'UDI')
var w2 = new Warrior('Dor','BY', 26, 'UDI')
var w3 = new Warrior(w2)
console.log(w1)
console.log(w2)
console.log(w3)

//warrior1.details();