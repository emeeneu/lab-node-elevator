class Elevator {
  constructor(){
    this.floor = 0;
    this.MAXFLOOR = 10;
    this.requests = [];
    this.direction = 'up';
    this.waitingList = [];
    this.passengers = [];
  }

  start() { 
    this.interval = setInterval(() => {this.update()}, 1000);
  }

  stop() { 
    clearInterval(this.interval);
  }

  update() { 
    this.log();
    if (this.requests.length !== 0) {
      this._passengersEnter();
      this._passengersLeave();
      this.requests = this.requests.sort((a, b) => a - b);
      if (this.requests.includes(this.floor)) {
        this.requests.splice(this.requests.indexOf(this.floor), 1);
      }
      if (this.direction === 'up' && (Math.max.apply(null, this.requests)) > this.floor) {
        this.floorUp();
      }
      if (this.direction === 'down' && (Math.min.apply(null, this.requests)) < this.floor) {
        this.floorDown();
      }
      this._checkDirection();
    }
  }

  _checkDirection() {
    if ((this.direction === 'up' && this.floor > (Math.max.apply(null, this.requests))) ||
      (this.direction === 'down' && this.floor < (Math.min.apply(null, this.requests)))) {
      if(this.direction === 'up'){
        this.direction = 'down';
      } else {
        this.direction = 'up';
      }
    }
  }

  _passengersEnter() {
    this.waitingList.forEach((person, index) => {
      if (person.originFloor === this.floor) {
        this.passengers.push(person);
        this.requests.push(person.destinationFloor);
        this.waitingList.splice(index, 1);
        console.log(`${person.name} has enter the elevator`);
      }
    })
  }

  _passengersLeave() {
    this.passengers.forEach((passenger, index) => {
      if (passenger.destinationFloor === this.floor) {
        this.passengers.splice(index, 1);
        console.log(`${passenger.name} has left the elevator`);
      }
    })
  }
  
  floorUp() {
    if (this.floor < this.MAXFLOOR) {
      this.floor++;
    }
  }

  floorDown() {
    if (this.floor >= 0) {
      this.floor--;
    }
  }
  
  call(person) {
    this.waitingList.push(person);
    this.requests.push(person.originFloor);
    this.requests.sort((a, b) => a - b);
  }

  log() { 
    console.log(`Direction: ${this.direction} | Floor: ${this.floor}`);
  }
}

module.exports = Elevator;
