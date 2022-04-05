const select1 = document.getElementById("currency-one");
const select2 = document.getElementById("currency-two");
const amountEl_one = document.getElementById("amount-one");
const amountEl_two = document.getElementById("amount-two");
const rateEl = document.getElementById("rate");
const swap = document.getElementById("swap");
const rateDate = document.getElementById("rate-date");

fetch("data.json")
  .then((res) => res.json())
  .then((data) => {
    const currencyList = data
      .map(
        (item) => `<option value=${item.currrency}>${item.currrency}</option>`
      )
      .join("\n");
    select1.innerHTML = currencyList;
  });

fetch("data2.json")
  .then((res) => res.json())
  .then((data) => {
    const currencyList = data
      .map(
        (item) => `<option value=${item.currrency}>${item.currrency}</option>`
      )
      .join("\n");
    select2.innerHTML = currencyList;
  });

function calculate() {
  const currency_one = select1.value || "USD";
  const currency_two = select2.value || "EUR";

  fetch(
    `https://v6.exchangerate-api.com/v6/d313916a3744bfde6af65fbe/latest/${currency_one}`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const rate = data.conversion_rates[currency_two];
      rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;
      amountEl_two.value = (amountEl_one.value * rate).toFixed(2);

      let date = data.time_last_update_utc
      rateDate.innerText = date
      
    });
}

select1.addEventListener("change", calculate);
amountEl_one.addEventListener("input", calculate);
select2.addEventListener("change", calculate);
amountEl_two.addEventListener("input", calculate);
swap.addEventListener("click", () => {
  let temp = select1.value;
  select1.value = select2.value;
  select2.value = temp;
  calculate();
});

calculate();
