const form = document.querySelector('form');
const seachInput = document.querySelector('input');
const message1 = document.querySelector('#message-1');
const message2 = document.querySelector('#message-2');
form.addEventListener('submit', e => {
  e.preventDefault();
  message1.textContent = 'Loading...';
  fetch('/weather?address=' + seachInput.value).then(
    res => {
      res.json().then(data => {
        if (data.message) {
            message1.textContent = data.message;
        }
        else {
            message1.textContent = data.placeName;
            message2.textContent = data.summary + ' Temperature is = ' + data.temperature +' and rain possiblity = ' + data.rainProbability ;
        }
      });
    }
  );
});
