const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor(field = [[]]){
        this.field = field;
        this.startPosition = {
            x: 0,
            y: 0
        };
        this.hatPosition = {
            x: 0,
            y: 0
        };
        this.locationX = 0;
        this.locationY = 0;
    }

    setPosition(offLimit = {x:0, y:0}){
        const position = {
            x:0,
            y:0
        }
        do {
            position.x = Math.floor(Math.random() * this.field[0].length);
            position.y = Math.floor(Math.random() * this.field.length);       
        } while (position.x === offLimit.x && position.y === offLimit.y);
        return position;
    }

    setStartPosition(){
        this.start = this.setPosition();
        this.locationX = this.start.x;
        this.locationY = this.start.y;
        this.field[this.start.y][this.start.x] = pathCharacter;
    }

    setHatPosition(){
        this.hatPosition = this.setPosition(this.startPosition);
        this.field[this.hatPosition.y][this.hatPosition.x] = hat;
    }

    print() {
        this.field.forEach(element => console.log(element.join('')));
    }

    getInput() {
        const input = prompt('Which way? ').toUpperCase();
        switch (input) {
          case 'U':
            this.locationY -= 1;
            break;
          case 'D':
            this.locationY += 1;
            break;
          case 'L':
            this.locationX -= 1;
            break;
          case 'R':
            this.locationX += 1;
            break;
          default:
            console.log('Enter U, D, L or R.');
            this.getInput();
            break;
        }
      }

      isInBounds() {
        return (
          this.locationY >= 0 &&
          this.locationX >= 0 &&
          this.locationY < this.field.length &&
          this.locationX < this.field[0].length
        );
      }

      isHat() {
        return this.field[this.locationY][this.locationX] === hat;
      }
      
      isHole() {
        return this.field[this.locationY][this.locationX] === hole;
      }

      static generateField(fieldH, fieldW, percentage = 0.1) {
        const field = new Array(fieldH).fill(0).map(element => new Array(fieldW));
        for(let y = 0; y < fieldH; y++) {
          for(let x = 0; x < fieldW; x++) {
            const prob = Math.random();
            field[y][x] = prob > percentage ? fieldCharacter : hole
          }
        }
        return field;
      }

      startGameLoop(){
        this.setStartPosition();
        this.setHatPosition();

        let playing = true;

        while(playing){
            this.print();
            this.getInput();
            
            if (!this.isInBounds()) {
                console.log('Out of bounds instruction.');
                playing = false;
                break;
            } else if (this.isHole()) {
                console.log('Sorry, you fell down a hole.');
                playing = false;
                break;
            } else if (this.isHat()) {
                console.log('Congrats, you found your hat!');
                playing = false;
                break;
            }
            this.field[this.locationY][this.locationX] = pathCharacter;

        }
    }
}

const myField = new Field(Field.generateField(10,10,0.2),true);
myField.startGameLoop();