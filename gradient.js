var input1 = document.querySelector('.input1');
var input2 = document.querySelector('.input2');

var gradient = document.querySelector('.gradient');

input1.addEventListener('change', function(){
  gradient.style.setProperty('--color1', input1.value);
})
input2.addEventListener('change', function(){
    gradient.style.setProperty('--color2', input2.value);
  })