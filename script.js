const API_KEY = "YOUR_API_KEY_HERE"; // 🔁 Replace with your actual API key
const apiURL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`;

let rates = {};

async function loadCurrencies() {
  try {
    const res = await fetch(apiURL);
    const data = await res.json();
    rates = data.conversion_rates;

    const currencyList = Object.keys(rates);
    const options = currencyList.map(code => `<option value="\${code}">\${code}</option>`).join('');
    document.getElementById("fromCurrency").innerHTML = options;
    document.getElementById("toCurrency").innerHTML = options;

    document.getElementById("fromCurrency").value = "USD";
    document.getElementById("toCurrency").value = "INR";
  } catch (error) {
    alert("Failed to load currency data. Check your API key or connection.");
  }
}

function convertCurrency() {
  const amount = parseFloat(document.getElementById("amount").value);
  const from = document.getElementById("fromCurrency").value;
  const to = document.getElementById("toCurrency").value;

  if (!amount || isNaN(amount)) {
    alert("Please enter a valid amount.");
    return;
  }

  const inUSD = amount / rates[from];
  const converted = inUSD * rates[to];

  document.getElementById("result").innerText =
    `\${amount} \${from} = \${converted.toFixed(2)} \${to}`;
}

loadCurrencies();
