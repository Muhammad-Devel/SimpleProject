const numbers = document.querySelectorAll("button[data-action=demical");
const operators = document.querySelectorAll("button[data-action=operation");
const display = document.querySelector(".calc__display--content");
let targetValue = "";
let action = false;
let evalArr = [];

for (let i = 0; i < operators.length; i++) {
  operators[i].addEventListener("click", (btn) => {
    const element = btn.target.value;

    if (element == "=" || element == "C" || element == "+/-") {
      calc();
    } else {
      if (action) {
        if (evalArr[2] != null) {
          evalArr[0] = eval(evalArr.join(""));
          display.innerHTML = evalArr[0];

          evalArr[2] = null;
          action = false;
          console.log(evalArr[0]);
        }
      }

      targetValue = "";
      evalArr[1] = element;
      action = true;
    }

    function calc() {
      let result;
      switch (element) {
        case "C":
          display.innerHTML = "0";
          targetValue = "";
          evalArr = [];
          action = false;
          break;
        case "=":
          if (evalArr[1] == "%") {
            evalArr[1] = "*";
            result = eval(evalArr.join("")) / 100;
            display.innerHTML = result;
          } else {
            result = eval(evalArr.join(""));
            display.innerHTML = result;
          }
          evalArr[0] = result;
          evalArr[1] = null;
          evalArr[2] = null;
          action = true;
          break;
        // case "%":
        //   evalArr[1] = "*";
        //   let percent = eval(evalArr.join("")) / 100;
        //   display.innerHTML = percent;
        //   evalArr[0] = percent;
        //   evalArr[1] = null;
        //   evalArr[2] = null;
        //   action = true;
        //   break;
        case "+/-":
          let minus = eval(evalArr.join("")) * -1;
          display.innerHTML = minus;
          console.log(minus);
          evalArr[0] = minus;
          evalArr[1] = null;
          evalArr[2] = null;
          action = true;
          break;
        default:
          break;
      }
    }
  });
}
for (let i = 0; i < numbers.length; i++) {
  numbers[i].addEventListener("click", (e) => {
    if (e.target.value != ".") {
      targetValue += e.target.value;
    } else if (e.target.value == "." && targetValue.includes(".")) {
      targetValue += "";
    } else if (
      display.innerHTML == "0" &&
      e.target.value == "." &&
      evalArr[0] == null
    ) {
      targetValue += "0" + e.target.value;
    } else {
      targetValue += e.target.value;
    }
    display.innerHTML = targetValue;
    if (action) {
      evalArr[2] = targetValue;
    } else {
      evalArr[0] = targetValue;
    }
    console.log(evalArr);
  });
}
