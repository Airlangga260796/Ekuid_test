//1 mean & median

//make inputs
//loop inputs
//store array for each part and overall
//check if value of index+1> index
//push if true
//loop overallArray to find mean and median

// output = [
//   { mean: 11, median: 6 },
//   { mean: 11, median: 6 },
// ];

let inputs = [2, 13, 15, 14, 15, 14, 15];

let newArray = [];
let smallArray = [];

for (let i = 0; i < inputs.length; i++) {
  smallArray.push(inputs[i]);
  if (inputs[i] > inputs[i + 1] || i == inputs.length - 1) {
    newArray.push(smallArray);
    smallArray = [];
  }
}

console.log(newArray);
