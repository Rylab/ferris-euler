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
  const limit = args[0] || 1000;

  process.stdout.write(`limit: ${limit}...\r\n`);

  let i = 0;
  let sum = 0;
  while (i < limit) {
    if (i % 3 == 0 || i % 5 == 0) {
      sum += i;
      process.stdout.write(`Sum so far: ${sum}\r`);
    }

    i++;
  }

  return sum;
},

2: (args) => {
  const limit = args[0] || 4000000;

  process.stdout.write(`summing fibonacci terms below limit: ${limit}...\r\n`);

  let sum = 0;
  let terms = [0, 1];

  while (terms[1] < limit) {
    let newTerm = terms[0] + terms[1];

    if (newTerm % 2 === 0) {
      sum += newTerm;
      process.stdout.write(`Sum so far: ${sum}\r`);
    }

    terms[0] = terms[1];
    terms[1] = newTerm;
  }
 
  return sum;
},

3: (args) => {
  const targetFactor = args[0] || 600851475143;

  const isPrime = (n) => {
    if (n <= 3) return n > 1;
    if (n % 2 == 0 || n % 3 == 0) return false;

    let i = 5;
    while (i*i <= n) {
      if (n % i == 0 || n % (i + 2) == 0) return false;
      i += 6;
    }

    return true;
  };

  process.stdout.write(`finding largest prime factor of: ${targetFactor}...`);

  for (let i = Math.floor(targetFactor/2); i > 2; i--) {
    if (targetFactor % i === 0 && isPrime(i)) return i;
  }

  return 1;
},

4: (args) => {
  const min = 100;
  const max = 999;

  const isPalindrome = (num) => {
    let origNum = num;
    let testNum = 0;

    while (num > 0) {
      let digit = num % 10;
      testNum = testNum * 10 + digit;
      num = parseInt(num/10);
    }

    return testNum === origNum;
  };

  let palindrome = 0;
  let triedMax = max;
  while (triedMax > 0) {
    let loopMax = max;
    while (loopMax >= triedMax) {
      let product = loopMax * triedMax;
      if (product > palindrome && isPalindrome(product)) {
        palindrome = product;
        break;
      }
      loopMax--;
    }
    triedMax--;
  }

  return palindrome;
},

5: (args) => {
  const maxDivisible = args[0] || 20;

  let result = maxDivisible;
  while (1) {
    let divisible = false;
    for (let i = maxDivisible; i > 0; i--) {
      if (result % i) {
        divisible = false;
        break;
      } else {
        divisible = true;
      }
    }
    if (divisible) return result;
    result++;
  }
},

6: (args) => {
  const limit = args[0] || 100;
  let squaresSum = 0;
  let sumSquared = 0;

  process.stdout.write(`summing squares up to limit: ${limit}...\r\n`);
  for (let i = 1; i <= limit; i++) {
    squaresSum += i*i;
    sumSquared += i;
  }
  sumSquared = sumSquared * sumSquared;

  return sumSquared - squaresSum;
},

7: (args) => {

},

}; // end Euler solutions

// Run and print specified Euler problem solution if here
if (typeof Euler[problemNumber] === 'function') {
  process.stdout.write(`Solving Euler #${problemNumber}... `);

  const nsToMs = BigInt(1e+6);
  const startTime = process.hrtime.bigint();
  const res = Euler[problemNumber](process.argv.splice(3));
  const endTime = process.hrtime.bigint();
  const runTimeNs = endTime-startTime;
  const runTimeMs = runTimeNs/nsToMs;
  const runTime = runTimeMs ? `${runTimeMs} ms` : `${runTimeNs} nanoseconds`;

  process.stdout.write(`\r\n${res} (${runTime})\r\n`);

  return res;
}

process.stdout.write(`Euler #${problemNumber} hasn't been solved here, yet.\n`);
