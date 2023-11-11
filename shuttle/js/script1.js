var editor = ace.edit("userFunction");
editor.setTheme("ace/theme/monokai");
editor.session.setMode("ace/mode/javascript");

window.onload = function() {
  resetFunction();
};

function resetFunction() {
  editor.setValue(`function myFunction() {
  let acceleration = 0;
  let rotation = 0;
  //Your code here
  return [acceleration, rotation];
}`);
}

function runFunction() {
  var userCode = editor.getValue();
    var userFunc;
  
    try {
      userFunc = new Function(`return ${userCode}`)();
    } catch (error) {
      document.getElementById("result").innerHTML = "Compilation Error: " + error.message;
      return;
    }
  
    if (typeof userFunc !== "function") {
      document.getElementById("result").innerHTML = "Error: Input is not a function.";
      return;
    }
  
    var result;
    try {
      result = userFunc();
    } catch (error) {
      document.getElementById("result").innerHTML = "Execution Error: " + error.message;
      return;
    }
  
    if (!Array.isArray(result) || result.length !== 2) {
      document.getElementById("result").innerHTML = "Error: Function must return an array with two numbers.";
      return;
    }
    var a = result[0];
    var b = result[1];
  
    if (typeof a !== 'number' || a < 0 || a > 10) {
      document.getElementById("result").innerHTML = "Error: The first item must be a number between 0 and 10.";
      return;
    }
  
    if (typeof b !== 'number' || ![0, 1, -1].includes(b)) {
      document.getElementById("result").innerHTML = "Error: The second item must be a number that is 0, 1, or -1.";
      return;
    }
    myp5.setValues(result);
    document.getElementById("result").innerHTML = "Function executed successfully. Result: " + result;
  }


  var sketch = function(p) {
    var values = [];
  
    p.setup = function() {
      var canvas = p.createCanvas(400, 400);
      canvas.parent('sketch-holder');
    };
  
    p.draw = function() {
      p.background(220);
      if (values.length == 2) {
        p.ellipse(p.width / 2, p.height / 2, values[0], values[1]);
        p.textSize(32);
        p.text(values[0] + ', ' + values[1], p.width / 2, p.height / 2);
      }
    };
  
    p.setValues = function(v) {
      values = v;
    };
  };
  var myp5 = new p5(sketch);
document.getElementById('userFunction').addEventListener('keydown', function(e) {
  if (e.key == 'Tab') {
    e.preventDefault();
    var start = this.selectionStart;
    var end = this.selectionEnd;

    // Insert 4 spaces at the cursor position
    this.value = this.value.substring(0, start) +
      "    " + this.value.substring(end);

    // Put the cursor back in the right place
    this.selectionStart =
    this.selectionEnd = start + 4;
  }
});
