//3 payment with paper money
//inputMoney
//paperMoneys = [1000, 2000, 5000, 10000, 20000, 50000, 100000]
//loop paperMoney
//conditional if inputMoney - paperMoney = + then returning looping else push papermoney
//reasign inputMoney with inputMoney - paperMoney

const paperMoneys = [1000, 2000, 5000, 10000, 20000, 50000, 100000];

let inputMoney = 55500;
let maxPaper = 4;

let output = [];
let loop = true;

while (loop) {
  if (inputMoney <= 0 || !loop) {
    break;
  } else {
    for (let i = paperMoneys.length - 1; i >= 0; i--) {
      if (inputMoney >= paperMoneys[i]) {
        if (output.length !== maxPaper) {
          output.push(paperMoneys[i]);
          inputMoney = inputMoney - paperMoneys[i];
        }
      } else {
        loop = false;
      }
    }
  }
}

console.log(output);
console.log(`sisa: ${inputMoney}`);
