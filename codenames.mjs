import fs from 'fs';

const shuffle = (ary) => {
  for (let i = ary.length - 1; i > 0; --i) {
    const j = Math.floor(Math.random() * i);
    const tmp = ary[i];
    ary[i] = ary[j];
    ary[j] = tmp;
  }
  return ary;
};

const keys = {
  red: [ 'black', 'beige', 'beige', 'beige', 'beige', 'beige', 'beige', 'beige', 'red', 'red', 'red', 'red', 'red', 'red', 'red', 'red', 'red', 'blue',  'blue',  'blue',  'blue',  'blue',  'blue',  'blue',  'blue' ],
  blue: [ 'black', 'beige', 'beige', 'beige', 'beige', 'beige', 'beige', 'beige', 'red', 'red', 'red', 'red', 'red', 'red', 'red', 'red', 'blue', 'blue',  'blue',  'blue',  'blue',  'blue',  'blue',  'blue',  'blue' ],
};

const dictionnary = fs.readFileSync('words.txt').toString().split('\n');

export const newGame = () => {
  const words = shuffle(dictionnary).slice(0, 25);
  const firstTeam = Math.random() < 0.5 ? 'red' : 'blue';
  const key = shuffle(keys[firstTeam]);
  const agentBoard = words.map(word => ({ word, team: '' }));
  const spymasterBoard = words.map((word, idx) => ({ word, team: key[idx] }));
  return { firstTeam, key, agentBoard, spymasterBoard };
};
