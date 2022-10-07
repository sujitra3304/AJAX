'use strict';

// PART 1: SHOW A FORTUNE

function showFortune(evt) {
  evt.preventDefault();
  // TODO: get the fortune and show it in the #fortune-text div
  fetch('/fortune')
    .then((response) => response.text())
    .then((responseData) => {
      document.querySelector('#fortune-text').innerHTML = responseData;
    });
}

document.querySelector('#get-fortune-button').addEventListener('click', showFortune);

// PART 2: SHOW WEATHER

function showWeather(evt) {
  evt.preventDefault();

  
  const zipcode = document.querySelector('#zipcode-field').value;
  const queryString = new URLSearchParams({zipcode}).toString();
  const url = `/weather.json?${queryString}`;
  // TODO: request weather with that URL and show the forecast in #weather-info

  fetch(url)
  .then((response) => response.json())
    .then((responseDataJson) => {
      console.log(responseDataJson)
      document.querySelector('#weather-info').innerText = responseDataJson.forecast;
    });
}

document.querySelector('#weather-form').addEventListener('submit', showWeather);

// PART 3: ORDER MELONS

function updateMelons(results) {
  if (results.code === 'OK') {
    document.querySelector('#order-status').classList.remove('order-error');
    document.querySelector('#order-status').innerHTML = `<p>${results.msg}</p>`;
    console.log('print');
  } else {
    document.querySelector('#order-status').classList.add('order-error');
    document.querySelector('#order-status').innerHTML = `<p><b>${results.msg}</b></p>`;
    console.log(document.querySelector('#order-status').classList);
  }
}

function orderMelons(evt) {
  evt.preventDefault();

  // TODO: show the result message after your form
  // TODO: if the result code is ERROR, make it show up in red (see our CSS!)
  // const code = responseDataJson.code
  // const msg = responseDataJson.msg
  evt.preventDefault();
  const formInputs = {
    melon_type: document.querySelector('#melon-type-field').value,
    qty: document.querySelector('#qty-field').value,
  };
  fetch('/order-melons.json', {
    method: 'POST',
    body: JSON.stringify(formInputs),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then(updateMelons);
}

document.querySelector('#order-form').addEventListener('submit', orderMelons);

// Further Study:
function dogImage(evt) {
  evt.preventDefault();
  const url = 'https://dog.ceo/api/breeds/image/random'
  fetch(url)
    .then((response) => response.json())
    .then(responseDataJson => {
      const img = responseDataJson.message
      document.querySelector('#dog-image').innerHTML =  `<img src="${img}"/>`
    })
}


document.querySelector('#get-dog-image').addEventListener('click', dogImage);
