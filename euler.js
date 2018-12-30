if (process.argv[2] === '-h' || process.argv[2] === '--help') {
  console.log(`Usage: run local solution to given number Euler Project problem
$ node euler.js 1
Will return sum below (not including) limit of 1000, thus solving Euler Problem #1
`);
  return;
}

// Default to solving problem #1 if no arugments specified
const problemNumber = process.argv[2] || 1;

const Euler = {

1: (args) => {
  const multiples = [3, 5];
  const limit = args[0] || 1000;

  process.stdout.write(`limit: ${limit}...\r\n`);

  let sum = 0;
  for (let i = 0; i < limit; i++) {
    for (let j = 0; j < multiples.length; j++) {
      if (i % multiples[j] === 0) {
        sum += i;
        process.stdout.write(`Sum so far: ${sum}\r`);
        break;
      }
    }
  }

  return sum;
},

2: () => {

  return answer;
},

3: () => {

  return 'answer';
},

}; // end Euler solutions

// Run and print specified Euler problem solution if here
if (typeof Euler[problemNumber] === 'function') {
  process.stdout.write(`Solving Euler #${problemNumber}... `);

  const res = Euler[problemNumber](process.argv.splice(3));
  process.stdout.write("\r\n" + res + "\r\n");
} else {
  process.stdout.write(`Euler #${problemNumber} hasn't been solved here, yet.\n`);
}
