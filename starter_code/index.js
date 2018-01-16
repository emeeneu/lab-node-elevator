const Elevator = require('./elevator.js');
const Person = require('./person.js');

let elevator = new Elevator();

elevator.start();

let manu = new Person("Manu", 0, 3);
let lidia = new Person("Lidia", 2, 7);
let cova = new Person("Cova", 5, 0);

elevator.call(manu);
elevator.call(lidia);
setTimeout(() => {elevator.call(cova)}, 5000);