if (process.argv[2] === '-h' || process.argv[2] === '--help') {
  console.log(`Usage: run local solution to given number Euler Project problem
$ node euler.js 1
Will return sum below (not including) limit of 1000, thus solving Euler Problem #1
`);
  return;
}

// Default to solving problem #1 if no arugments specified
const problemNumber = process.argv[2] || 1;

// Enable realtime status outputs. MUCH slower for many algprithms
const statusOutput = true;

const Euler = {

1: (args) => {
  const limit = args[0] || 1000;

  process.stdout.write(`limit: ${limit}...\r\n`);

  let i = 0;
  let sum = 0;

  while (i < limit) {
    if (i % 3 == 0 || i % 5 == 0) {
      sum += i;
      if (statusOutput) process.stdout.write(`Sum so far: ${sum}\r`);
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
      if (statusOutput) process.stdout.write(`Sum so far: ${sum}\r`);
    }

    terms[0] = terms[1];
    terms[1] = newTerm;
  }

  return sum;
},

3: (args) => {
  const targetFactor = args[0] || 600851475143;

  const isPrime = (n) => {
    if (statusOutput) process.stdout.write(`Confirming factors of ${n}                \r`);

    if (n <= 3) return n > 1;
    if (n % 2 == 0 || n % 3 == 0) return false;

    let i = 5;
    while (i*i <= n) {
      if (statusOutput) process.stdout.write(`Checking factor ${n} against ${i}        \n`);

      if (n % i == 0 || n % (i + 2) == 0) return false;
      i += 6;
    }

    return true;
  };

  process.stdout.write(`finding largest prime factor of: ${targetFactor}...\r\n`);

  let result = 0;

  for (let i = Math.floor(targetFactor/2); i > 2; i--) {
    if (targetFactor % i === 0 && isPrime(i)) {
      result = i;
      break;
    }
    if (statusOutput) process.stdout.write(`Checking ${i}                                             \r`);
  }

  return result;
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

  process.stdout.write(`finding largest palindrome product between ${min} - ${max}\r\n`);

  let palindrome = 0;
  let triedMax = max;

  while (triedMax > 0) {
    let loopMax = max;
    while (loopMax >= triedMax) {
      let product = loopMax * triedMax;
      if (statusOutput) process.stdout.write(`${loopMax} * ${triedMax} = ${product}\r`);

      if (product > palindrome && isPalindrome(product)) {
        palindrome = product;

        if (statusOutput) process.stdout.write(`New max found: ${palindrome}\r\n`);

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

  process.stdout.write(`looking for purely divisible up to: ${maxDivisible}...\r\n`);

  let testNum = maxDivisible;

  while (testNum) {
    let divisible = false;
    if (statusOutput) process.stdout.write(`Checking ${testNum}\r`);

    for (let i = maxDivisible; i > 0; i--) {
        divisible = testNum % i ? false : true;
        if (!divisible) break;
    }

    if (divisible) return testNum;

    testNum++;
  }
},

6: (args) => {
  const limit = args[0] || 100;

  process.stdout.write(`summing squares up to limit: ${limit}...\r\n`);

  let squaresSum = 0;
  let sumSquared = 0;

  for (let i = 1; i <= limit; i++) {
    squaresSum += i*i;
    sumSquared += i;
    if (statusOutput) process.stdout.write(`Squares Sum: ${squaresSum}\r`);
  }
  sumSquared = sumSquared * sumSquared;
  if (statusOutput) process.stdout.write(`\nSum Squared: ${sumSquared}\r`);

  return sumSquared - squaresSum;
},

7: (args) => {

},

15: (args) => {
  const gridSize = args[0] || 20;

  process.stdout.write(`finding paths in grid size ${gridSize}...\r\n`);

  let numPaths = 0;

  let canGoDown, canGoRight = gridSize > 0;

  for (let x = 0; x < gridSize; x++) {
    let canGoRight = x < gridSize;

    if (!canGoRight) numPaths++;
    if (canGoDown) numPaths++;

    for (let y = 0; y < gridSize; y++) {
      let canGoDown = y < gridSize;

      if (!canGoDown) numPaths++;
      if (canGoRight) numPaths++;
    }
  }

  return numPaths;
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

  process.stdout.write(`\n\n${res} (${runTime})\r\n`);

  return res;
}

process.stdout.write(`Euler #${problemNumber} hasn't been solved here, yet.\n`);
