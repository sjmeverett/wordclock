import * as moment from 'moment';
import * as chalk from 'chalk';

export const letters = [
//         0    1    2    3    4    5    6    7    8
/* 0 */  ['T', 'W', 'E', 'N', 'T', 'Y', 'T', 'E', 'N'],
/* 1 */  ['H', 'A', 'L', 'F', 'I', 'V', 'E', 'D', 'T'],
/* 2 */  ['Q', 'U', 'A', 'R', 'T', 'E', 'R', 'B', 'O'],
/* 3 */  ['P', 'A', 'S', 'T', 'Z', 'F', 'O', 'U', 'R'],
/* 4 */  ['T', 'W', 'E', 'L', 'V', 'E', 'T', 'W', 'O'],
/* 5 */  ['F', 'I', 'V', 'E', 'L', 'E', 'V', 'E', 'N'],
/* 6 */  ['T', 'S', 'E', 'V', 'E', 'N', 'I', 'N', 'E'],
/* 7 */  ['E', 'I', 'G', 'H', 'T', 'H', 'R', 'E', 'E'],
/* 8 */  ['N', 'X', 'J', `O`, 'C', 'L', 'O', 'C', 'K']
];

const oclock: CoordList = [[8,3], [8,4], [8,5], [8,6], [8,7], [8,8]];
const past: CoordList = [[3,0], [3,1], [3,2], [3,3]];
const to: CoordList = [[1,8], [2,8]];
const five: CoordList = [[1,3], [1,4], [1,5], [1,6]];
const ten: CoordList = [[0,6], [0,7], [0,8]];
const quarter: CoordList = [[2,0], [2,1], [2,2], [2,3], [2,4], [2,5], [2,6]];
const twenty: CoordList = [[0,0], [0,1], [0,2], [0,3], [0,4], [0,5]];
const half: CoordList = [[1,0], [1,1], [1,2], [1,3]];

export const minutes: CoordList[] = [
/*  0 */ oclock,
/*  5 */ [].concat(five, past),
/* 10 */ [].concat(ten, past),
/* 15 */ [].concat(quarter, past),
/* 20 */ [].concat(twenty, past),
/* 25 */ [].concat(twenty, five, past),
/* 30 */ [].concat(half, past),
/* 35 */ [].concat(twenty, five, to),
/* 40 */ [].concat(twenty, to),
/* 45 */ [].concat(quarter, to),
/* 50 */ [].concat(ten, to),
/* 55 */ [].concat(five, to),
];

export const hours: CoordList[] = [
/* 12 */ [[4,0], [4,1], [4,2], [4,3], [4,4], [4,5]],
/*  1 */ [[4,8], [5,8], [6,8]],
/*  2 */ [[4,6], [4,7], [4,8]],
/*  3 */ [[7,4], [7,5], [7,6], [7,7], [7,8]],
/*  4 */ [[3,5], [3,6], [3,7], [3,8]],
/*  5 */ [[5,0], [5,1], [5,2], [5,3]],
/*  6 */ [[6,1], [7,1], [8,1]],
/*  7 */ [[6,1], [6,2], [6,3], [6,4], [6,5]],
/*  8 */ [[7,0], [7,1], [7,2], [7,3], [7,4]],
/*  9 */ [[6,5], [6,6], [6,7], [6,8]],
/* 10 */ [[6,0], [7,0], [8,0]],
/* 11 */ [[5,3], [5,4], [5,5], [5,6], [5,7], [5,8]]
];

const msInMinute = 60000;
const minutesInDay = 1440;

export interface Letter {
  letter: string,
  illuminated: boolean
};

export type Coord = [number, number];
export type CoordList = Coord[];
export type Face = Letter[][];


export default class WordClock {
  get face() {
    let face: Face = letters.map(
      (row) => row.map(
        (letter) => ({letter, illuminated: false})
      )
    );

    this.illuminated.forEach(
      ([row, col]) => {
        face[row][col].illuminated = true;
      }
    );

    return face;
  }

  get illuminated(): CoordList {
    let now = moment();
    let minute = Math.round(now.minute() / 5) % 12;
    let hour = now.hour() % 12 + (minute > 6 ? 1 : 0);
    return [].concat(hours[hour], minutes[minute]);
  }
};

let clock = new WordClock();
let face = clock.face;
let bg = chalk.bgBlack;
let dull = chalk.dim.grey;
let bright = chalk.white;
let empty = ' ' + letters[0].map(() => ' ').join(' ') + ' ';

console.log(bg(empty));

face.forEach((row) => {
  console.log(bg(' ' + row.map(
    ({letter, illuminated}) => (illuminated ? bright : dull)(letter)
  ).join(' ') + ' '));
});

console.log(bg(empty));