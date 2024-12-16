const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const checkPalindrome = (data) => {
  for (let i = 0; i < data.length / 2; i++) {
    if (data[i] !== data[data.length - 1 - i]) {
      return false;
    }
  }
  return true;
};

const main = () => {
  rl.question("Input: ", (string) => {
    const data = string.split(" ")[0];
    console.log(checkPalindrome(data));
    rl.close();
  });
};

main();
