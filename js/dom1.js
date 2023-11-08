for (let i = 5; i <= 8; i++) { 
  if (i === 7) {
      continue; 
    }
  const value = document.getElementsByClassName('block' + i)[0].innerText;
  console.log(value);
}

function updateValues() {

  const surnameEl = document.querySelector('.block4');
  const nameEl = document.querySelector('.block5'); 
  const birthYearEl = document.querySelector('.block8');

  const randomSurname = generateRandomString(8);
  const randomName = generateRandomString(6);
  const randomBirthYear = generateRandomString(4);

  surnameEl.innerText = randomSurname;
  nameEl.innerText = randomName;
  birthYearEl.innerText = randomBirthYear;

  document.title = "Изменяем кириллицу на латиницу по клику";

}

function generateRandomString(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}
