import fetch from "node-fetch";

const input = [
  { amount: 15000.0, currency: "IDR" },
  { amount: 3.1, currency: "EUR" },
];
async function convert1(x) {
  const host = "api.frankfurter.app";
  var output = [];

  for (let i = 0; i < x.length; i++) {
    let amount = x[i].amount;
    let currency = x[i].currency;
    await fetch(
      `https://${host}/latest?amount=${amount}&from=${currency}&to=USD`
    )
      .then((resp) => resp.json())
      .then((data) => {
        output.push(data.rates.USD);
      });

    if (i == x.length - 1) {
      console.log(output);
    }
  }
}

convert1(input);
